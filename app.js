const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/', function (req, res) {
    res.send('Hello POST!');
});

app.listen(PORT, () => console.log('Example app listening on port ' + PORT + '!'));
