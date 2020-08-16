const express = require('express');

const visitorController = require('../controllers/visitor.controller');
// const authUtil = require('../utils/authUtil');
// const customMiddleware = require('../middleware/middleware');

// const { passport } = authUtil;
// const googleAuth = passport.authenticate('google', { session: false });
// const fbAuth = passport.authenticate('facebook', { session: false });
// const jwtAuth = passport.authenticate('jwt', { session: false });

const router = express.Router();

// Unprotected Routes
router.post('/postMessage', visitorController.postMessage);
router.get('/getMessages', visitorController.getVisitor);
// router.post('/login/fb', fbAuth);
// router.post('/login/fb/callback', visitorController.loginFbCallBack);

// Protected Routes

module.exports = router;