const express = require('express');
const router = express.Router();
var models = require('../models');
var Page = models.Page; 
var User = models.User; 


router.get('/', function(req, res, next) {
  //res.send('got to GET /wiki/');
  res.redirect('/');
});

router.post('/', function(req, res, next) {

  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`

  var page = Page.build({
    title: req.body.title,
    content: req.body.content
  });

  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.
  page.save();
  // -> after save -> res.redirect('/');
  res.json(req.body);
});

router.get('/add', function(req, res, next) {
  //res.send('got to GET /wiki/add');
  res.render('addpage');
});

module.exports = router;
