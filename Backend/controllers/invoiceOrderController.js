const InvoiceOrder = require('../model/invoiceOrder');

// Get all invoice orders
exports.getAllInvoiceOrders = (req, res) => {
    InvoiceOrder.getAll((err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
};

// Get invoice order by ID
exports.getInvoiceOrderById = (req, res) => {
    const { id_invoiceorder } = req.params; 
    InvoiceOrder.getById(id_invoiceorder, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
};

// Create a new invoice order
exports.createInvoiceOrder = (req, res) => {
    const invoiceOrderData = req.body;
    InvoiceOrder.create(invoiceOrderData, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send("Invoice order added successfully");
    });
};
