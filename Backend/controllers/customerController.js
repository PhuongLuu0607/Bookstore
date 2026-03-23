const Customer = require('../model/customer');

// Get all customers
exports.getAllCustomers = (req, res) => {
    Customer.getAll((err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
};

// Get customer by ID
exports.getCustomerById = (req, res) => {
    const { id_customer } = req.params; // use the correct column name
    Customer.getById(id_customer, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
};

// Create a new customer
exports.createCustomer = (req, res) => {
    const customerData = req.body;
    Customer.create(customerData, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send("Customer has been added successfully.");
    });
};

// Update a customer by ID
exports.updateCustomer = (req, res) => {
    const { id_customer } = req.params;
    const customerData = req.body;
    Customer.update(id_customer, customerData, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send("Customer has been updated successfully.");
    });
};

// Delete a customer by ID
exports.deleteCustomer = (req, res) => {
    const { id_customer } = req.params;
    Customer.delete(id_customer, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send("Customer has been deleted successfully.");
    });
};

// Search customers by name (partial match)
exports.searchCustomerByName = (req, res) => {
    const { searchTerm } = req.params; // Get search term from URL params
    Customer.searchByName(searchTerm, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
};
