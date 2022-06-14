const express = require('express');
const app = express('./backend/app');

app.use((req, res, next) => {
  console.log("First middleware");
  next();
});


app.use((req, res, next) => {
  res.send("Hello from express");
});

module.exports = app;
