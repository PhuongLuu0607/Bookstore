const db = require('../config/config');

const Category = {
    getAll: (callback) => {
        const sqlGet = "SELECT * FROM category";
        db.query(sqlGet, (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },
    getById: (id_category, callback) => {
        const sqlGet = "SELECT * FROM category WHERE id_category = ?";
        db.query(sqlGet, [id_category], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },
    create: (categoryData, callback) => {
        const { category_name } = categoryData;
        const sqlInsert = "INSERT INTO category (category_name) VALUES (?)";
        db.query(sqlInsert, [category_name], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },
    update: (id_category, categoryData, callback) => {
        const { category_name } = categoryData;
        const sqlUpdate = "UPDATE category SET category_name = ? WHERE id_category = ?";
        db.query(sqlUpdate, [category_name, id_category], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },
    delete: (id_category, callback) => {
        const sqlDelete = "DELETE FROM category WHERE id_category = ?";
        db.query(sqlDelete, [id_category], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },
    // Function to search by category name (approximate match)
    searchByName: (searchTerm, callback) => {
        const sqlSearch = "SELECT * FROM category WHERE category_name LIKE ?";
        const formattedSearchTerm = `%${searchTerm}%`;
        db.query(sqlSearch, [formattedSearchTerm], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    }
};

module.exports = Category;
