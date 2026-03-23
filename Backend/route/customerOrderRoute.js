const express = require('express');
const router = express.Router();
const billController = require('../controllers/customerOrderController');

router.get('/api/getall-customer-order', billController.getAllBill);
router.delete('/api/delete-customer-order/:id_customer_order', billController.deleteBill);
router.get('/api/get-customer-order/:id_customer_order', billController.getBillById);
router.get('/api/search-customer-order/:searchTerm', billController.searchBillByName);
router.put('/api/update-customer-order/:id_customer_order', billController.updateBill);
router.get('/api/get-customer-order/order-date/:order_date', billController.getBillByOrderDate);
router.get('/api/get-customer-order/status/:status', billController.getBillByStatus);
module.exports = router;