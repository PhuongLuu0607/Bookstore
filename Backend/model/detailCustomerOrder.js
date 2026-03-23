const db = require('../config/config');

const BillCT = {

    // Lấy chi tiết đơn hàng theo id_customer_order
    getById: (id_customer_order, callback) => {
        const sqlGet = "SELECT * FROM detail_order_customer WHERE id_customer_order = ?";
        db.query(sqlGet, [id_customer_order], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },

    // Top 5 sản phẩm bán chạy
    getTop5ProductsDetails: (callback) => {
        const sql = `
            SELECT p.*, doc.id_product, SUM(doc.quantity) AS total_quantity
            FROM detail_order_customer doc
            INNER JOIN product p ON doc.id_product = p.id_product
            GROUP BY doc.id_product, p.id_product
            ORDER BY total_quantity DESC
            LIMIT 5
        `;

        db.query(sql, (error, results) => {
            if (error) {
                return callback(error, null);
            }
            callback(null, results);
        });
    },

    // Lấy danh sách đơn hàng theo id_customer
    getDetailsByCustomerId :(id_customer, callback) => {
        const sqlGetOrders = `
            SELECT id_customer_order, customer_name, phone, address, status, is_review
            FROM customer_order
            WHERE id_customer = ?
        `;
    
        db.query(sqlGetOrders, [id_customer], (error, orders) => {
            if (error) {
                return callback(error);
            }
    
            if (orders.length === 0) {
                return callback(null, []); // Không có đơn hàng nào cho khách hàng này
            }
    
            const orderDetailsPromises = orders.map(order => {
                const sqlGetOrderDetails = `
                    SELECT *
                    FROM detail_order_customer
                    WHERE id_customer_order = ?
                `;
    
                return new Promise((resolve, reject) => {
                    db.query(sqlGetOrderDetails, [order.id_customer_order], (error, orderDetails) => {
                        if (error) {
                            return reject(error);
                        }
    
                        resolve({
                            status: order.status,
                            id_customer_order: order.id_customer_order,
                            customer_name: order.customer_name,
                            phone: order.phone,
                            address: order.address,
                            is_review:order.is_review,
                            orderDetails: orderDetails
                        });
                    });
                });
            });
    
            Promise.all(orderDetailsPromises)
                .then(results => callback(null, results))
                .catch(error => callback(error));
        });
    }

};

module.exports = BillCT;
