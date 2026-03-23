const Order = require('../model/order-client');

exports.addOrder = (req, res) => {
    console.log('orderData from client = ', req.body);
    
    const orderData = req.body;

    Order.addOrder(orderData, (err, message) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send('thanh cong');
    });
};


