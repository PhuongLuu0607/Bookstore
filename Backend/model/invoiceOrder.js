const db = require('../config/config');

const InvoiceOrder = {

    // Get all invoice orders
    getAll: (callback) => {
        const sqlGet = "SELECT * FROM invoice_order";
        db.query(sqlGet, (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },

    // Get invoice order by ID
    getById: (id_invoiceorder, callback) => {
        const sqlGet = "SELECT * FROM detail_invoice_order WHERE id_invoiceorder = ?";
        db.query(sqlGet, [id_invoiceorder], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },

    // Create a new invoice order
    create: (invoiceOrderData, callback) => {
        const { entry_date, total_price, name_supplier, phone, id_staff, email, address } = invoiceOrderData;
        const sqlInsert = `
            INSERT INTO invoice_order (entry_date, total_price, name_supplier, phone, id_staff, email, address) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        db.query(sqlInsert, [entry_date, total_price, name_supplier, phone, id_staff, email, address], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },
};

module.exports = InvoiceOrder;
