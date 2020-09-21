require('dotenv/config');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { PORT = 3001 } = process.env;
app.listen(PORT, () => { console.log(`Listening on ${PORT}`); });
