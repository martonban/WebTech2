const express = require("express");
const multer = require("multer");

const Product = require('../models/product');

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if(isValid){
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (rq, file, cb) => {
     const name = file.originalname.toLowerCase().split(' ').join('-');
     const ext = MIME_TYPE_MAP[file.mimetype];
     cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

router.post("", multer({storage: storage}).single("image"), (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  const product = new Product({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename
  });
  product.save().then(result => {
    res.status(201).json({
      message: 'Product added succesfully',
      product: {
        ...result,
        id: result._id
      }
    });
  });
});


router.put(
  "/:id",
  multer({storage: storage}).single("image"),
  (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file){
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename
  }
  const product = new Product({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath
  });
  console.log(product);
  Product.updateOne({_id: req.params.id}, product).then(result => {
    res.status(200).json({message: 'Update Succesful!'});
  });
  }
);


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
