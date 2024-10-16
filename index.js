const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3000;

app.use(express.static('static'));

let taxRate = 5;
let discountPercentage = 10;
let loyaltRate = 2;
//que 1//
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let result = newItemPrice + cartTotal;
  res.send(result.toString());
});
//que 2//
function getDiscount(cartTotal, isMember) {
  let discountPercentage = 10;
  let finalDiscount = cartTotal - (cartTotal * discountPercentage) / 100;
  return finalDiscount.toString();
}
app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';
  res.send(getDiscount(cartTotal, isMember));
});

//que 3//

function getTax(cartTotal) {
  let taxRate = 5;
  let taxAmount = cartTotal * (taxRate / 100);

  return taxAmount.toString();
}
app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(getTax(cartTotal));
});

//que 4//
function getDeliverytime(shippingMethod, distance) {
  let deliverydays;
  if (shippingMethod === 'express') {
    deliverydays = distance / 100;
  } else if (shippingMethod === 'standard') {
    deliverydays = distance / 50;
  } else {
    return 'take time';
  }
  return deliverydays.toString();
}
app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  res.send(getDeliverytime(shippingMethod, distance));
});

//que 5//

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let result = weight * distance * 0.1;
  res.send(result.toString());
});

//que 6//
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyalAmount = purchaseAmount * 2;
  res.send(loyalAmount.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
