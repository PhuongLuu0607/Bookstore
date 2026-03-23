const db = require('../config/config');

const Bill = {

    getAll: (callback) => {
        const sqlGet = "SELECT * FROM customer_order";
        db.query(sqlGet, (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },

    getById: (id_customer_order, callback) => {
        const sqlGet = "SELECT * FROM customer_order WHERE id_customer_order = ?";
        db.query(sqlGet, [id_customer_order], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },

    update: (id_customer_order, billData, callback) => {
        const { status, id_staff, payment_type, payment_status } = billData;

        const sqlUpdate = `
            UPDATE customer_order 
            SET status = ?, id_staff = ?, payment_type = ?, payment_status = ? 
            WHERE id_customer_order = ?
        `;
        db.query(sqlUpdate, [status, id_staff, payment_type, payment_status, id_customer_order], (error, result) => {
            if (error) {
                return callback(error);
            }

            // Nếu trạng thái là 4 (đã giao thành công) thì trừ tồn kho
            if (parseInt(status) === 4) {
                const sqlGetDetails = `
                    SELECT id_product, quantity 
                    FROM detail_order_customer 
                    WHERE id_customer_order = ?
                `;
                db.query(sqlGetDetails, [id_customer_order], (error, details) => {
                    if (error) {
                        return callback(error);
                    }

                    let queries = details.map(item => {
                        return new Promise((resolve, reject) => {
                            const sqlUpdateStock = `
                                UPDATE product 
                                SET quantity = quantity - ? 
                                WHERE id_product = ?
                            `;
                            db.query(sqlUpdateStock, [item.quantity, item.id_product], (err, res) => {
                                if (err) reject(err);
                                else resolve(res);
                            });
                        });
                    });

                    Promise.all(queries)
                        .then(results => callback(null, result))
                        .catch(err => callback(err));
                });
            } else {
                callback(null, result);
            }
        });
    },

    delete: (id_customer_order, callback) => {
        const sqlDelete = "DELETE FROM customer_order WHERE id_customer_order = ?";
        db.query(sqlDelete, [id_customer_order], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },

    // Tìm kiếm gần đúng theo tên khách
    searchByName: (searchTerm, callback) => {
        const sqlSearch = "SELECT * FROM customer_order WHERE customer_name LIKE ?";
        const formattedSearchTerm = `%${searchTerm}%`;
        db.query(sqlSearch, [formattedSearchTerm], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },

    getByOrderDate: (order_date, callback) => {
        const sqlGetByOrderDate = "SELECT * FROM customer_order WHERE order_date = ?";
        db.query(sqlGetByOrderDate, [order_date], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },

    getByStatus: (status, callback) => {
        const sqlGetByStatus = "SELECT * FROM customer_order WHERE status = ?";
        db.query(sqlGetByStatus, [status], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },

};

module.exports = Bill;
