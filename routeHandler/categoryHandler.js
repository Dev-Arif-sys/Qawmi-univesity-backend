const express = require('express');
const { default: mongoose } = require('mongoose');
const { createCategory, getAllCategory } = require('../controllers/categoryController');
const router = express.Router();

router.route('/').post(createCategory).get(getAllCategory);

module.exports = router;