require('dotenv/config');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const userController = require('./controllers/userController');
const auth = require('./services/auth');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

app.post('/login', userController.userLogin);

app.put('/users/:email', auth, userController.userUpdate);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => { console.log(`Listening on ${PORT}`); });
