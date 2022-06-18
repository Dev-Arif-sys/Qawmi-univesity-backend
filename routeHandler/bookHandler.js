const express = require('express');
const { default: mongoose } = require('mongoose');
const { createbook, getAllbook } = require('../controllers/bookController');
const router = express.Router();

router.route('/').post(createbook).get(getAllbook);

module.exports = router;
