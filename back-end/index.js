require('dotenv/config');

const userController = require('./controllers/userController')

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.post('/login', userController.userLogin);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => { console.log(`Listening on ${PORT}`); });
