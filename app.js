const express = require('express'),
      bodyParser = require('body-parser'),
      request = require('request'),
      cheerio = require('cheerio');

const app = express();
const PORT = process.env.PORT || 3000; // Heroku automatically sets PORT as an environment variable
const HOROSCOPE_SIGNS = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];

// Slack sends x-www-form-urlencoded requests
app.use(bodyParser.urlencoded({extended: true}));


/**
 * Handle incoming POST requests for a horoscope.
 * We expect any such request to contain a body field 'text',
 * which is a string containing the name of a star sign.
 * We scrape cafeastrology.com for the horoscope.
 */
app.post('/', function (req, res) {
    // Parse the horoscope sign from the request,
    // and return early if an invalid sign was entered.
    var sign = req.body.text.toLowerCase();
    if (HOROSCOPE_SIGNS.indexOf(sign) == -1) {
        res.send('Invalid sign ' + sign + '! Did you misspell "Sagittarius"?');
    }
    else {
        var url = 'https://cafeastrology.com/' .concat(sign, 'dailyhoroscope.html')
        request(url, function(error, response, html) {
            if(!error) {
                var $ = cheerio.load(html);
                console.log(html);
                var horoscopeText = $('img').filter(function(i, el) {
                    console.log('Hello!');
                    return (el.attr('width') === 110);
                }).parent().text();
                if (horoscopeText) {
                    res.send(horoscopeText);
                } else { res.send("Failed to retrieve horoscope text."); }
            }
            else {
                res.send('Failed to read from cafeastrology.com. Maybe their site is down?');
            }
        });
    }
});

// If anyone actually goes to the endpoint URL,
// give them something to look at.
app.get('/', function (req, res) {
    res.send('Hello World!');
});

// Start the server
app.listen(PORT, () => console.log('Example app listening on port ' + PORT + '!'));
