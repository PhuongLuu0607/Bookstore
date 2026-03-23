const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();

// Export router
const productRoutes = require('./routes/productRoute');
const categoryRoutes = require('./routes/categoryRoute');
const authorRoutes = require('./routes/authorRoute');
const staffRoutes = require('./routes/staffRoute');
const customerRoutes = require('./routes/customerRoute');
const warehouseRoutes = require('./routes/warehouseRoute');
const customerOrderRoutes = require('./routes/customerOrderRoute');
const invoiceOrderRoutes = require('./routes/incoiceOrderRoute');
const detailCustomerOrderRoutes = require('./routes/detailCustomerOrderRoutes');
const accountRoutes = require('./routes/accountRoute');
const orderClientRoutes = require('./routes/order-client');
const productReviewRoutes = require('./routes/reviewProductRoute');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sử dụng route
app.use(productRoutes);
app.use(categoryRoutes);
app.use(authorRoutes);
app.use(staffRoutes);
app.use(customerRoutes);
app.use(warehouseRoutes);
app.use(customerOrderRoutes);
app.use(invoiceOrderRoutes);
app.use(detailCustomerOrderRoutes);
app.use(accountRoutes);
app.use(orderClientRoutes);

app.use(productReviewRoutes);
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log("Listen running port",PORT);
});
