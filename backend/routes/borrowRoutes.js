const express = require('express');
const router = express.Router();
const controller = require('../controllers/borrowController');

router.post('/', controller.borrowBook);

module.exports = router;
