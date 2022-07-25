const express = require('express');
const { default: mongoose } = require('mongoose');
const {
  createbook,
  getAllbook,
  getSingleBook,
  getSingleBookDelete,
} = require('../controllers/bookController');
const router = express.Router();

router.route('/').post(createbook).get(getAllbook);
router.route('/:id').get(getSingleBook);
router.route('/:id').get(getSingleBookDelete);
module.exports = router;
