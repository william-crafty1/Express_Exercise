const express = require('express');
const cartItems = express.Router();

let cart = [
    {id: 1, product: 'Donut', price: 2, quantity: 5,},
    {id: 2, product: 'Game', price: 50, quantity: 3,},
    {id: 3, product: 'Bike', price: 10, quantity: 1,},
    {id: 4, product: 'Game', price: 300, quantity: 2,},
    {id: 5, product: 'Steak', price: 1, quantity: 1,},
    {id: 6, product: 'Candy', price: 4, quantity: 6,},
    {id: 7, product: 'Steak', price: 500, quantity: 10,},
    {id: 8, product: 'Phone', price: 100, quantity: 99,},
]

cartItems.get('/', (req, res) => {
    let newCartItems = cart
    if(req.query.maxPrice){
        newCartItems = newCartItems.filter(c => c.price <= req.query.maxPrice)
    }
    if (req.query.prefix){
        newCartItems = newCartItems.filter(c => c.product.startsWith(req.query.prefix))
    }
    if (req.query.pageSize){
        console.log(req.query.pageSize);
        newCartItems = newCartItems.slice(0, req.query.pageSize);
    }

    res.send(newCartItems);

})

cartItems.get('/:id', (req, res) => {
    const item = cart.find(c => c.id == req.params.id);
    console.log(item);
    if(item){
        console.log("found item")
        res.send(item);
    }
    else{
        res.send("No object found with that id!");
    }
})

cartItems.post('/', (req, res) => {
    req.body = {};
    const lastElementIndex = cart.length - 1;
    const newId = cart[lastElementIndex].id + 1;
    const newItem = { id: newId, product: req.body.product, price: req.body.price, quantity: req.body.quantity }
    cart.push(newItem);
    console.log(cart)
    res.send('Added a new item to the cart!')
});

cartItems.put('/:id', (req, res) => {
    const item = cart.find(item => item.id == req.params.id);
    const itemIndex = cart.indexOf(item);
    cart[itemIndex] = {id: item.id, product: req.body.product, price: req.body.price, quantity: req.body.quantity}
    res.send(`successfully updated cart item with id ${req.params.id}`)
})

cartItems.delete('/:id', (req, res) => {
    const item = cart.find(item => item.id == req.params.id);
    const itemIndex = cart.indexOf(item);
    console.log(itemIndex);
    cart.splice(itemIndex, 1);
    console.log(cart);
})

module.exports = cartItems;