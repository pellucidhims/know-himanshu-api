const express = require('express');

const adminController = require('../controllers/admin.controller');
const router = express.Router();

// Unprotected Routes
// router.post('/register', adminController.registerAdmin);
router.post('/login', adminController.loginAdmin);

// Protected Routes

module.exports = router;