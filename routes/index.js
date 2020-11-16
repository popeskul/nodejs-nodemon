const express = require('express');
const model = require('../mock/model');
const router = express.Router();

router.get('/', function (req, res, next) {
  const indexPage = req.query.page || 1;

  res.render('index', {
    activePage: indexPage,
    pages: model
  });
});

module.exports = router;
