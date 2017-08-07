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

  var page = Page.build({
    title: req.body.title,
    content: req.body.content
  });
  page.save()
  .then(anotherTask => {
    res.redirect('/wiki/'+page.urlTitle);
  })
  .catch(err);
  
  
});

router.get('/add', function(req, res, next) {
  //res.send('got to GET /wiki/add');
  res.render('addpage');
});

router.get('/:urlTitle', function(req, res, next) {
  // res.send(req.params.urlTitle);
  Page.findOne({
  where: {urlTitle: req.params.urlTitle},
  // attributes: ['id', ['name', 'title']]
}).then(page => {
  // console.log("GET URL TITLE");
  // console.log(page);
  // res.json(page);
  res.render('wikipage', {page});
  // project will be the first entry of the Projects table with the title 'aProject' || null
  // project.title will contain the name of the project
}).catch(next);
});

module.exports = router;
