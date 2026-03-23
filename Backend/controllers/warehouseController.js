const Warehouse = require('../model/warehouse');

exports.getAllWarehouses = (req, res) => {
    Warehouse.getAll((err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
};

exports.getWarehouseById = (req, res) => {
    const { id_warehouse } = req.params;
    Warehouse.getById(id_warehouse, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
};

exports.createWarehouse = (req, res) => {
    const warehouseData = req.body;
    Warehouse.create(warehouseData, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send("Warehouse added successfully");
    });
};

exports.updateWarehouse = (req, res) => {
    const { id_warehouse } = req.params;
    const warehouseData = req.body;
    Warehouse.update(id_warehouse, warehouseData, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send("Warehouse updated successfully");
    });
};

exports.deleteWarehouse = (req, res) => {
    const { id_warehouse } = req.params;
    Warehouse.delete(id_warehouse, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send("Warehouse deleted successfully");
    });
};

// New function to search by book name (approximate match)
exports.searchWarehouseByName = (req, res) => {
    const { searchTerm } = req.params; // Get search term from URL params
    Warehouse.searchByName(searchTerm, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
};
