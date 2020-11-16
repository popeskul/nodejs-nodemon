const express = require('express');
const axios = require('axios');
const { from, throwError, forkJoin } = require('rxjs');
const { catchError } = require('rxjs/operators');

const router = express.Router();

router.get('/', function (req, res, next) {
  res.render('dogs', { image: '' });
});

router.get('/random', function (req, res, next) {
  const result = from(axios('https://dog.ceo/api/breeds/image/random'));
  result.pipe(catchError((error) => throwError('Bad url', error.config.url)));
  result.subscribe(
    (image) => res.render('dogs', { image: image.data.message }),
    (error) => res.render('error', { error })
  );
});

router.get('/breed/:breedId/:subBreedId?', function (req, res, next) {
  const results = forkJoin({
    breed: axios(
      `https://dog.ceo/api/breed/${req.params.breedId}/images/random`
    ),
    breedList: axios('https://dog.ceo/api/breeds/list/all')
  });
  results.pipe(catchError((error) => throwError('Bad url', error.config.url)));
  results.subscribe(
    ({ breed, breedList }) => {
      const list = [];
      for (const key in breedList.data.message) {
        if (breedList.data.message[key].length) {
          breedList.data.message[key].forEach((el) => {
            list.push({ name: `${el} ${key}`, value: `${key}/${el}` });
          });
        } else {
          list.push({ name: key, value: key });
        }
      }
      res.render('dogs-breed', {
        image: breed.data.message,
        list
      });
    },
    (error) => res.render('error', { error })
  );
});

module.exports = router;
