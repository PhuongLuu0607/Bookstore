const express = require('express');
const router = express.Router();
const billController = require('../controllers/detailCustomerOrderController');

router.get('/api/get-detail-customer-order/:id_customer_order',billController.getBillById)
router.get('/api/top5products', billController.getTop5Products);
router.get('/api/orderDetailsByCustomer/:id_customer', billController.getDetailsByCustomerId);
module.exports = router;