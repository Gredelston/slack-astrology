const express = require('express'),
      bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded());

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/', function (req, res) {
    console.log(req.body);
    res.send('Hello, ' + req.body.text + '!');
});

app.listen(PORT, () => console.log('Example app listening on port ' + PORT + '!'));
