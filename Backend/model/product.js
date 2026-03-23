const db = require('../config/config');

const Product = {
    getAll: ({ page, pageSize }, callback) => {
        const sqlGet = page
            ? `CALL GetProductsByPage(${page}, ${pageSize});`
            : "SELECT * FROM product";

        db.query(sqlGet, (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },

    getById: (id_product, callback) => {
        const sqlGet = "SELECT * FROM product WHERE id_product = ?";
        db.query(sqlGet, [id_product], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },

    getByCategoryId: (id_category, callback) => {
        const sqlGet = "SELECT * FROM product WHERE id_category = ?";
        db.query(sqlGet, [id_category], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },

    create: (productData, callback) => {
        const {
            book_name,
            price,
            product_picture,
            id_category,
            description,
            quantity,
            picture_hover1,
            picture_hover2,
            tag,
            notify,
            isbn,
            publisher,
            id_authors,
        } = productData;

        const sqlInsert = `
            INSERT INTO product (
                book_name, price, product_picture, id_category, description,
                quantity, picture_hover1, picture_hover2, tag, notify,
                isbn, publisher, id_authors
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            book_name,
            price,
            product_picture,
            id_category,
            description,
            quantity,
            picture_hover1,
            picture_hover2,
            tag,
            notify,
            isbn,
            publisher,
            id_authors,
        ];

        db.query(sqlInsert, values, (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },

    update: (id_product, productData, callback) => {
        const {
            book_name,
            price,
            product_picture,
            picture_hover1,
            picture_hover2,
            id_category,
            description,
            quantity,
            tag,
            notify,
            isbn,
            publisher,
            id_authors,
        } = productData;

        const sqlUpdate = `
            UPDATE product SET
                book_name = ?,
                price = ?,
                product_picture = ?,
                picture_hover1 = ?,
                picture_hover2 = ?,
                id_category = ?,
                description = ?,
                quantity = ?,
                tag = ?,
                notify = ?,
                isbn = ?,
                publisher = ?,
                id_authors = ?
            WHERE id_product = ?
        `;

        const values = [
            book_name,
            price,
            product_picture,
            picture_hover1,
            picture_hover2,
            id_category,
            description,
            quantity,
            tag,
            notify,
            isbn,
            publisher,
            id_authors,
            id_product,
        ];

        db.query(sqlUpdate, values, (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },

    delete: (id_product, callback) => {
        const sqlDelete = "DELETE FROM product WHERE id_product = ?";
        db.query(sqlDelete, [id_product], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },

    searchByName: (searchTerm, callback) => {
        const sqlSearch = "SELECT * FROM product WHERE book_name LIKE ?";
        const formattedSearchTerm = `%${searchTerm}%`;
        db.query(sqlSearch, [formattedSearchTerm], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },

    searchByPriceAndCategory: (minPrice, maxPrice, id_category, callback) => {
        let sqlSearch = "SELECT * FROM product WHERE price BETWEEN ? AND ?";
        let queryParams = [minPrice, maxPrice];

        if (id_category && !isNaN(id_category)) {
            sqlSearch += " AND id_category = ?";
            queryParams.push(id_category);
        }

        db.query(sqlSearch, queryParams, (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    }
};

module.exports = Product;
