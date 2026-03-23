const BillCT = require('../model/detailCustomerOrder');

// Lấy chi tiết đơn hàng theo id_customer_order
exports.getBillById = (req, res) => {
    const { id_customer_order } = req.params;
    BillCT.getById(id_customer_order, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
};

// Lấy top 5 sản phẩm bán chạy
exports.getTop5Products = (req, res) => {
    BillCT.getTop5ProductsDetails((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Lấy tất cả chi tiết đơn hàng theo id_customer
exports.getDetailsByCustomerId = (req, res) => {
    const { id_customer } = req.params;
    BillCT.getDetailsByCustomerId(id_customer, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.length === 0) {
            return res.status(404).send('No orders found for this customer.');
        }
        res.json(result);
    });
};
