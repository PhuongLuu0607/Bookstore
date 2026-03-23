const Bill = require('../model/customerOrder');

// Lấy tất cả bill
exports.getAllBill = (req, res) => {
    Bill.getAll((err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
};

// Lấy bill theo id_customer_order
exports.getBillById = (req, res) => {
    const { id_customer_order } = req.params;
    Bill.getById(id_customer_order, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
};

// Xóa bill theo id_customer_order
exports.deleteBill = (req, res) => {
    const { id_customer_order } = req.params;
    Bill.delete(id_customer_order, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send("Bill deleted successfully");
    });
};

// Cập nhật bill theo id_customer_order
exports.updateBill = (req, res) => {
    const { id_customer_order } = req.params;
    const billData = req.body;
    Bill.update(id_customer_order, billData, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send("Bill updated successfully");
    });
};

// Tìm kiếm gần đúng theo tên sản phẩm (JOIN với bảng detail_order_customer + product)
exports.searchBillByName = (req, res) => {
    const { searchTerm } = req.params;
    Bill.searchByName(searchTerm, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
};

// Lấy bill theo ngày đặt hàng (order_date)
exports.getBillByOrderDate = (req, res) => {
    const { order_date } = req.params;
    Bill.getByOrderDate(order_date, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
};

// Lấy bill theo trạng thái (status)
exports.getBillByStatus = (req, res) => {
    const { status } = req.params;
    Bill.getByStatus(status, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
};
