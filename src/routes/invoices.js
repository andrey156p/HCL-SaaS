const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Usually requires SuperAdmin role
// router.use(authMiddleware);

router.post('/generate', invoiceController.generateInvoice);

module.exports = router;
