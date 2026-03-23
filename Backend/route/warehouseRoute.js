const express = require('express');
const router = express.Router();
const warehouseController = require('../controllers/warehouseController');

router.get('/api/getallwarehouse', warehouseController.getAllWarehouses);
router.get('/api/getwarehouse/:id_warehouse', warehouseController.getWarehouseById);
router.post('/api/createwarehouse', warehouseController.createWarehouse);
router.put('/api/updatewarehouse/:id_warehouse', warehouseController.updateWarehouse);
router.delete('/api/deletewarehouse/:id_warehouse', warehouseController.deleteWarehouse);
router.get('/api/searchwarehouse/:searchTerm', warehouseController.searchWarehouseByName);
module.exports = router;