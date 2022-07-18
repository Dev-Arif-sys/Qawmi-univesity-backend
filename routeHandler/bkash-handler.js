const express = require('express');

// Created Require Files..
const controller = require('../controllers/Bkash-Payment');

const router = express.Router();

/**
 * /api/bkash-payment
 * http://localhost:3000/api/bkash-payment
 */


router.post('/create-payment', controller.createPayment);
router.post('/execute-payment', controller.executePayment);
router.get('/query-payment/:paymentID', controller.queryPayment);


// Export All router..
module.exports = router;