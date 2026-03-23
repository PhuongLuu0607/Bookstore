const db = require('../config/config');

const Customer = {
    // Get all customers
    getAll: (callback) => {
        const sqlGet = "SELECT * FROM customer";
        db.query(sqlGet, (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },

    // Get customer by ID
    getById: (id_customer, callback) => {
        const sqlGet = "SELECT * FROM customer WHERE id_customer = ?";
        db.query(sqlGet, [id_customer], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },

    // Create new customer
    create: (customerData, callback) => {
        const { customer_name, email, phone, address, dateofbirth } = customerData;
        const sqlInsert = "INSERT INTO customer (customer_name, email, phone, address, dateofbirth) VALUES (?, ?, ?, ?, ?)";
        db.query(sqlInsert, [customer_name, email, phone, address, dateofbirth], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },

    // Update existing customer
    update: (id_customer, customerData, callback) => {
        const { customer_name, email, phone, address, dateofbirth } = customerData;
        console.log(dateofbirth)
        const sqlUpdate = "UPDATE customer SET customer_name = ?, email = ?, phone = ?, address = ?, dateofbirth = ? WHERE id_customer = ?";
        db.query(sqlUpdate, [customer_name, email, phone, address, dateofbirth, id_customer], (error, result) => {
            if (error) {
                console.log(error)
                return callback(error);
            }
            callback(null, result);
        });
    },

    // Delete customer by ID
    delete: (id_customer, callback) => {
        const sqlDelete = "DELETE FROM customer WHERE id_customer = ?";
        db.query(sqlDelete, [id_customer], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },

    // Search customers by name (partial match)
    searchByName: (searchTerm, callback) => {
        const sqlSearch = "SELECT * FROM customer WHERE customer_name LIKE ?";
        const formattedSearchTerm = `%${searchTerm}%`;
        db.query(sqlSearch, [formattedSearchTerm], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    }
};

module.exports = Customer;
