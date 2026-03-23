// const db = require('../config/config');

// const Order = {
//     addOrder: (orderData, callback) => {
//         const { id_customer, order_date, total_price, status, customer_name, address, note, phone, payment_type, payment_status, detail_order_customer } = orderData;
        
//         const insertOrderQuery = `
//             INSERT INTO customer_order (id_customer, order_date, total_price, status, customer_name, address, note, phone, payment_type, payment_status)
//             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//         `;

//         db.getConnection((err, connection) => {
//             if (err) {
//                 return callback(err);
//             }

//             connection.beginTransaction((err) => {
//                 if (err) {
//                     connection.release();
//                     return callback(err);
//                 }

//                 connection.query(
//                     insertOrderQuery,
//                     [id_customer, order_date, total_price, status, customer_name, address, note, phone, payment_type, payment_status],
//                     (err, result) => {
//                         if (err) {
//                             return connection.rollback(() => {
//                                 connection.release();
//                                 callback(err);
//                             });
//                         }

//                         const id_customer_order = result.insertId;

//                         console.log("")
//                         const insertOrderDetailsQuery = `
//                             INSERT INTO detail_order_customer (id_customer_order, id_product, book_name, quantity, price, product_picture)
//                             VALUES ?
//                         `;

//                         const orderDetailsValues = detail_order_customer?.map((item) => [
//                             id_customer_order,
//                             item.id_product,
//                             item.book_name,
//                             item.quantity,
//                             item.price,
//                             item.product_picture
//                         ]);

//                         connection.query(insertOrderDetailsQuery, [orderDetailsValues], (err) => {
//                             if (err) {
//                                 return connection.rollback(() => {
//                                     connection.release();
//                                     callback(err);
//                                 });
//                             }

//                             connection.commit((err) => {
//                                 if (err) {
//                                     return connection.rollback(() => {
//                                         connection.release();
//                                         callback(err);
//                                     });
//                                 }

//                                 connection.release();
//                                 callback(null, "Order added successfully");
//                             });
//                         });
//                     }
//                 );
//             });
//         });
//     }
// };

// module.exports = Order;

const db = require('../config/config');

const Order = {
  addOrder: (orderData, callback) => {
    // KHÔNG dùng id_customer từ client nữa
    const {
      order_date,
      total_price,
      status,
      customer_name,
      address,
      note,
      phone,
      payment_type,
      payment_status,
      detail_order_customer,
      email // nếu client có gửi thì dùng, không có thì để null
    } = orderData;

    const insertOrderQuery = `
      INSERT INTO customer_order (id_customer, order_date, total_price, status, customer_name, address, note, phone, payment_type, payment_status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.getConnection((err, connection) => {
      if (err) {
        return callback(err);
      }

      // 1. TÌM customer THEO SỐ ĐIỆN THOẠI
      const findCustomerQuery = `
        SELECT id_customer
        FROM customer
        WHERE phone = ?
        LIMIT 1
      `;

      connection.query(findCustomerQuery, [phone], (err, rows) => {
        if (err) {
          connection.release();
          return callback(err);
        }

        // Hàm phụ: khi đã có idCustomer thì làm tiếp transaction
        const proceedWithCustomerId = (idCustomer) => {
          connection.beginTransaction((err) => {
            if (err) {
              connection.release();
              return callback(err);
            }

            // 2. INSERT vào customer_order với idCustomer chuẩn trong DB
            connection.query(
              insertOrderQuery,
              [
                idCustomer,
                order_date,
                total_price,
                status,
                customer_name,
                address,
                note,
                phone,
                payment_type,
                payment_status,
              ],
              (err, result) => {
                if (err) {
                  return connection.rollback(() => {
                    connection.release();
                    callback(err);
                  });
                }

                const id_customer_order = result.insertId;

                const insertOrderDetailsQuery = `
                  INSERT INTO detail_order_customer (id_customer_order, id_product, book_name, quantity, price, product_picture)
                  VALUES ?
                `;

                const orderDetailsValues = detail_order_customer?.map((item) => [
                  id_customer_order,
                  item.id_product,
                  item.book_name,
                  item.quantity,
                  item.price,
                  item.product_picture,
                ]);

                connection.query(insertOrderDetailsQuery, [orderDetailsValues], (err) => {
                  if (err) {
                    return connection.rollback(() => {
                      connection.release();
                      callback(err);
                    });
                  }

                  connection.commit((err) => {
                    if (err) {
                      return connection.rollback(() => {
                        connection.release();
                        callback(err);
                      });
                    }

                    connection.release();
                    callback(null, "Order added successfully");
                  });
                });
              }
            );
          });
        };

        if (rows && rows.length > 0) {
          // ↪ ĐÃ TỒN TẠI customer với số phone này
          const idCustomer = rows[0].id_customer;
          proceedWithCustomerId(idCustomer);
        } else {
          // ↪ CHƯA CÓ customer → TẠO MỚI
          const insertCustomerQuery = `
            INSERT INTO customer (customer_name, email, address, phone)
            VALUES (?, ?, ?, ?)
          `;

          const safeEmail = email || null;

          connection.query(
            insertCustomerQuery,
            [customer_name, safeEmail, address, phone],
            (err, resultCustomer) => {
              if (err) {
                connection.release();
                return callback(err);
              }

              const newCustomerId = resultCustomer.insertId;
              proceedWithCustomerId(newCustomerId);
            }
          );
        }
      });
    });
  },
};

module.exports = Order;

