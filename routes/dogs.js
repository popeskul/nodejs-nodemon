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

router.get('/breed/:breedId', function (req, res, next) {
  axios
    .get(`https://dog.ceo/api/breed/${req.params.breedId}/images/random`)
    .then((image) => {
      res.render('dogs', { image: image.data.message });
    })
    .catch((err) => {
      const errorMessage = err.response.data.message;
      res.send(`Breed ${req.params.breedId} - "${errorMessage}"`);
    });
});

module.exports = router;
