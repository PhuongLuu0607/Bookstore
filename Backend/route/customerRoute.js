const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/api/getallcustomer', customerController.getAllCustomers);
router.get('/api/getcustomer/:id_customer', customerController.getCustomerById);
router.post('/api/createcustomer', customerController.createCustomer);
router.put('/api/updatecustomer/:id_customer', customerController.updateCustomer);
router.delete('/api/deletecustomer/:id_customer', customerController.deleteCustomer);
router.get('/api/searchcustomer/:searchTerm', customerController.searchCustomerByName);
module.exports = router;
