var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:id?', function (req, res, next) {
  console.log(req.params);

  res.render('../views/cars_index.ejs', {
    number: req.params.id
  });
});

module.exports = router;
