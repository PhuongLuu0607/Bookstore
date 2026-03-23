const db = require('../config/config');

const Warehouse = {
    getAll: (callback) => {
        const sqlGet = "SELECT * FROM warehouse";
        db.query(sqlGet, (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },

    getById: (id_warehouse, callback) => {
        const sqlGet = "SELECT * FROM warehouse WHERE id_warehouse = ?";
        db.query(sqlGet, id_warehouse, (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },

    create: (warehouseData, callback) => {
        const { book_name, quantity, entry_date } = warehouseData;
        const sqlInsert = `
            INSERT INTO warehouse (book_name, quantity, entry_date) 
            VALUES (?, ?, ?)
        `;
        db.query(sqlInsert, [book_name, quantity, entry_date], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },

    update: (id_warehouse, warehouseData, callback) => {
        const { book_name, quantity, entry_date } = warehouseData;
        const sqlUpdate = `
            UPDATE warehouse 
            SET book_name = ?, quantity = ?, entry_date = ?
            WHERE id_warehouse = ?
        `;
        db.query(sqlUpdate, [book_name, quantity, entry_date, id_warehouse], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },

    delete: (id_warehouse, callback) => {
        const sqlDelete = "DELETE FROM warehouse WHERE id_warehouse = ?";
        db.query(sqlDelete, id_warehouse, (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },

    // Search by book name (approximate match)
    searchByName: (searchTerm, callback) => {
        const sqlSearch = "SELECT * FROM warehouse WHERE book_name LIKE ?";
        const formattedSearchTerm = `%${searchTerm}%`;
        db.query(sqlSearch, [formattedSearchTerm], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    }
};

module.exports = Warehouse;
