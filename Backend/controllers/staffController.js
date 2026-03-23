const Employee = require('../model/staff');

exports.getAllEmployees = (req, res) => {
    Employee.getAll((err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
};

exports.getEmployeeById = (req, res) => {
    const { id_staff } = req.params;
    Employee.getById(id_staff, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
};

exports.createEmployee = (req, res) => {
    const employeeData = req.body;
    Employee.create(employeeData, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send("Employee added successfully");
    });
};

exports.updateEmployee = (req, res) => {
    const { id_staff } = req.params;
    const employeeData = req.body;
    Employee.update(id_staff, employeeData, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send("Employee updated successfully");
    });
};

exports.deleteEmployee = (req, res) => {
    const { id_staff } = req.params;
    Employee.delete(id_staff, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send("Employee deleted successfully");
    });
};

// Hàm mới để tìm kiếm gần đúng theo tên nhân viên
exports.searchEmployeeByName = (req, res) => {
    const { searchTerm } = req.params;
    Employee.searchByName(searchTerm, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
};
