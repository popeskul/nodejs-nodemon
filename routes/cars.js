var express = require('express');
var router = express.Router();

router.get('/:id?', function (req, res, next) {
  res.render('cars_index', {
    number: req.params.id1
  });
});

module.exports = router;
