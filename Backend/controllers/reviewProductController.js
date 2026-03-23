const ProductReview = require('../model/reviewProduct');

// 📌 Thêm đánh giá mới
exports.createReview = (req, res) => {
    const reviewData = req.body;
    if (!reviewData.id_product || !reviewData.id_customer || !reviewData.rating) {
        return res.status(400).send("Thiếu thông tin bắt buộc");
    }

    ProductReview.create(reviewData, (err, {reviewResult,updateResult}) => {
        if (err) return res.status(500).send(err);
        res.send({ message: "Review created successfully", id: reviewResult.insertId });
    });
};

// 📦 Lấy danh sách review theo sản phẩm
exports.getReviewsByProduct = (req, res) => {
    const { id_product } = req.params;
    ProductReview.getByProductId(id_product, (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
};



