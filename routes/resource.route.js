const express = require('express');
const resourceController = require('../controllers/resource.controller');

const router = express.Router();

// Unprotected Routes
router.get('/', resourceController.getResourcesByType);

// Protected Routes

module.exports = router;