require('dotenv/config');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const path = require('path');
const userController = require('./controllers/userController');
const productController = require('./controllers/productController');
const saleController = require('./controllers/saleController');
const orderController = require('./controllers/orderController');
const auth = require('./services/auth');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.post('/login', userController.userLogin);
app.post('/register', userController.userRegister);
app.post('/orders', auth, saleController.registerNewSale);

app.put('/users/:email', auth, userController.userUpdate);

app.get('/products', auth, productController.listAllProducts);
app.get('/orders', auth, orderController.listAllOrders);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => { console.log(`Listening on ${PORT}`); });
