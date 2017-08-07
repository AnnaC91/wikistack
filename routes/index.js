const wikiRouter = require('./wiki');
const userRouter = require('./user');
const express = require('express');
const router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function (req, res) {
    // res.send('main page');
    Page.findAll()
        .then(function (foundPages) {
            console.log("PAGES GET");
            res.render('index', {pages: foundPages});
        });
})
router.use('/wiki/', wikiRouter);
//router.use('/users/', userRouter);

module.exports = router;