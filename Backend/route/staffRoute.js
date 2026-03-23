const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/staffController');

router.get('/api/getallstaff', employeeController.getAllEmployees);
router.get('/api/getstaff/:id_staff', employeeController.getEmployeeById);
router.post('/api/createstaff', employeeController.createEmployee);
router.put('/api/updatestaff/:id_staff', employeeController.updateEmployee);
router.delete('/api/deletestaff/:id_staff', employeeController.deleteEmployee);
router.get('/api/searchstaff/:searchTerm', employeeController.searchEmployeeByName);
module.exports = router;
