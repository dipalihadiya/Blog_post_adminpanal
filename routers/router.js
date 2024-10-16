const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const signUp = require('../controllers/signUpController');
const logIn = require('../controllers/loginController');
const passport = require('../config/passportConfig');
const isAuth = require('../auth/isAuth');
const blog = require('../controllers/blog');
const upload = require('../config/multerConfig');
const authContoller = require('../controllers/authController')
const commentController = require('../controllers/commentController');
const topic = require('../controllers/topic');

router.get('/' ,isAuth, controller.defaultController);
router.get('/signUp',signUp.signUpform)
router.get('/profile',isAuth,controller.profileController)
router.post('/signUpController',signUp.signUpController)
router.get('/logIn' ,logIn.logIn)
router.get('/logout',isAuth,logIn.logout);
router.post('/logInController', passport.authenticate('local', { failureRedirect: '/logIn' }),logIn.logInController);
router.post('/addBlogController',upload.single('blog_img'),blog.addBlogController);
router.get('/addBlog' ,isAuth,blog.addBlog);
router.get('/viewBlog',isAuth,blog.viewBlog);
router.get('/editBlog/:id', blog.editController);
router.post('/updateBlog/:id', upload.single('blog_img'), blog.updateController);
router.get('/deleteBlog/:id', blog.deleteController);
router.get('/allBlog',isAuth,blog.allBlog);
router.get('/change-password' , authContoller.changePassword)
router.post('/changePassController',isAuth , authContoller.changePasscontroler)
router.get('/forget-password' , authContoller.forgotPassword)
router.post('/forgetPasswordController',authContoller.forgotPasswordController)
// router.post('/ConfirmOTP/:id' , authContoller.ConfirmOTP);

// OTP and Reset Password routes
router.get('/otp/:id', authContoller.otp);
router.post('/confirmOTP/:id', authContoller.confirmOTP);
router.get('/confirmOTP/:id', authContoller.confirmOTP);
router.post('/resetPasswordController/:id', authContoller.resetPasswordController);


// Topic routes
router.get('/addTopics',isAuth,topic.addTopics);
router.post('/addTopicController',isAuth,topic.addTopicsController)
router.get('/deleteTopics/:id',isAuth,topic.deletTopics);
router.get('/subTopic',isAuth,topic.subTopic);
router.post('/subTopicContoller',isAuth,topic.subTopicContoller);
router.get('/viewTopics',isAuth,topic.viewTopics);
router.get('/deleteTopicAndSubTopics/:id',isAuth,topic.deleteTopicAndSubTopics);
//comment routes
router.post('/addComment/:id',isAuth,commentController.addComment);
router.get('/deletComment/:id',isAuth,commentController.deletComment);

module.exports = router;