const db = require('../config/config');

const ProductReview = {

    // 📝 Tạo mới một review
    create: (reviewData, callback) => {
    const { 
        id_product, 
        book_name, 
        id_customer, 
        id_customer_order, 
        rating, 
        comment, 
        customer_name, 
        status 
    } = reviewData;

    const sqlInsert = `
        INSERT INTO product_review 
        (id_product, book_name, id_customer, id_customer_order, rating, comment, customer_name, created_at, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), ?)
    `;

    db.query(
        sqlInsert,
        [id_product, book_name, id_customer, id_customer_order, rating, comment, customer_name, status || 1],
        (error, result) => {
            if (error) return callback(error);

            // ✅ Sau khi insert thành công, update status của đơn hàng thành 5
            const sqlUpdateOrder = `
                UPDATE customer_order
                SET status = 5
                WHERE id_customer_order = ?
            `;
            db.query(sqlUpdateOrder, [id_customer_order], (updateError, updateResult) => {
                if (updateError) return callback(updateError);
                callback(null, { reviewResult: result, orderUpdate: updateResult });
            });
        }
    );
},

    // 📦 Lấy tất cả review của 1 sản phẩm
    getByProductId: (id_product, callback) => {
        const sqlSelect = `
            SELECT * FROM product_review
            WHERE id_product = ?
            ORDER BY created_at DESC
        `;
        db.query(sqlSelect, [id_product], (error, result) => {
            if (error) return callback(error);
            callback(null, result);
        });
    },

};

module.exports = ProductReview;
