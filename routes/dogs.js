const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.render('dogs', { image: '' });
});

router.get('/random', function (req, res, next) {
  axios.get('https://dog.ceo/api/breeds/image/random').then((image) => {
    res.render('dogs', { image: image.data.message });
  });
});

module.exports = router;
