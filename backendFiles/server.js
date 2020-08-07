const express = require('express');
const port = 3000;
const app = express();
const cart = require('./routes/cartItems');
const cors = require('cors');

app.use(cors());

app.use(express.json());
app.use('/cart-items', cart);

app.listen(port, () => console.log(`I love you ${port}`))