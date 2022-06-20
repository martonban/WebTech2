const express = require("express");
const Product = require('../models/product');

const router = express.Router();

router.post('', (req, res, next) => {
  const product = new Product({
    title: req.body.title,
    content: req.body.content
  });
  product.save().then(result => {
    res.status(201).json({
      message: 'Product added succesfully',
      productId: result._id
    });
  });
});


router.put("/:id", (req, res, next) => {
  const product = new Product({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Product.updateOne({_id: req.params.id}, product).then(result => {
    res.status(200).json({message: 'Update Succesful!'});
  });
});


router.get('', (req, res, next) => {
  Product.find()
  .then(documents => {
    res.status(200).json({
      message: 'Product fetched succesfully!',
      product: documents
    });
  });
});

router.get("/:id", (req, res, next) => {
  Product.findById(req.params.id).then(product => {
    if(product){
      res.status(200).json(product);
    }else{
      res.status(404).json({message: 'Product not found!'});
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Product.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: 'Product Deleted'});
  });
});

module.exports = router;
