const express = require('express');
const app = express();

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

app.use('/api/product', (req, res, next) => {
  const products = [
    {id: 'rbjeigjo',
    title:'Test001',
    content: 'This is coming from the server'
    },
    {id: 'dbjsrow',
    title:'Test002',
    content: 'This is coming from the server second time'
    }
  ];
  res.status(200).json({
    message: 'Product fetched succesfully!',
    product: products
  });
});

module.exports = app;
