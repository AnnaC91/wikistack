const express = require('express');
const router = express.Router();


router.get('/', function(req, res, next) {
  //res.send('got to GET /wiki/');
  res.redirect('/');
});

router.post('/', function(req, res, next) {
  res.send('got to POST /wiki/');
});

router.get('/add', function(req, res, next) {
  //res.send('got to GET /wiki/add');
  res.render('addpage');
});

module.exports = router;
