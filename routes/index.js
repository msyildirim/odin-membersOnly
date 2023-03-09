var express = require('express');
var router = express.Router();
var authControllers = require('../controllers/authController');
let postController = require('../controllers/postController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Express',
    user: req.user
   });
});

//GET Sign up
router.get('/signup', authControllers.signup_get);

//POST Sign-up
router.post('/signup', authControllers.signup_post);

//POST Login
router.post('/login', authControllers.login_post);

//GET post form
router.get('/newpost', postController.create_get );

//POST post form
router.post('/newpost', postController.create_post);

//GET post detail
router.get('/post/:id', postController.post_detail_get)

module.exports = router;
