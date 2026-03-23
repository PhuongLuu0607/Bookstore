const express = require('express');
const router = express.Router();
const productReviewController = require('../controllers/reviewProductController');

//  Tạo review mới
router.post('/api/create-reviews-product', productReviewController.createReview);

//  Lấy review theo sản phẩm
router.get('/api/reviews/product/:id_product', productReviewController.getReviewsByProduct);


module.exports = router;
