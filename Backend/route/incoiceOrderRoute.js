const express = require('express');
const router = express.Router();
const invoiceOrderController = require('../controllers/invoiceOrderController');

router.get('/api/getall-invoiceorder', invoiceOrderController.getAllInvoiceOrders);
router.get('/api/getinvoiceorder/:id_invoiceorder',invoiceOrderController.getInvoiceOrderById)
router.post('/api/create-invoiceorder', invoiceOrderController.createInvoiceOrder);
module.exports = router;