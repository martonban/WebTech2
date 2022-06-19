const express = require('express');
const bodyParser =  require('body-parser');
const mongoose = require('mongoose');


// Server start:
// npm run start:server

const Product = require('./models/product');

const app = express();

mongoose.connect("mongodb+srv://martonban:Jelszo123@cluster0.f52vjwd.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
  console.log('Connected to database!');
})
.catch(() => {
  console.log('Connection failed');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
  "Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post('/api/product', (req, res, next) => {
  const product = new Product({
    title: req.body.title,
    content: req.body.content
  });
  product.save();
  res.status(201).json({
    message: 'Product added succesfully'
  });
});


app.get('/api/product', (req, res, next) => {
  Product.find()
  .then(documents => {
    res.status(200).json({
      message: 'Product fetched succesfully!',
      product: documents
    });
  });
});

app.delete("/api/product/:id", (req, res, next) => {
  Product.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: 'Product Deleted'});
  });
});

module.exports = app;
