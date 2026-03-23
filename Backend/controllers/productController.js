const Product = require('../model/product');
console.log(Product)

exports.getAllProducts = (req, res) => {
    const page = req.query.page;
    const pageSize = req.query.pageSize || 10;

    Product.getAll({ page, pageSize }, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }

        console.log(result);
        res.send(page ? result[0] : result);
    });
};

exports.getProductById = (req, res) => {
    const { id_product } = req.params;
    Product.getById(id_product, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
};

exports.getProductByCategoryId = (req, res) => {
    const { id_category } = req.params;
    Product.getByCategoryId(id_category, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
};

exports.createProduct = (req, res) => {
    const productData = req.body;
    Product.create(productData, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send("Product added successfully");
    });
};

exports.updateProduct = (req, res) => {
    const { id_product } = req.params;
    const productData = req.body;
    Product.update(id_product, productData, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send("Product updated successfully");
    });
};

exports.deleteProduct = (req, res) => {
    const { id_product } = req.params;
    Product.delete(id_product, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send("Product deleted successfully");
    });
};

exports.searchProductByName = (req, res) => {
    const { searchTerm } = req.params;
    Product.searchByName(searchTerm, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
};

exports.searchProductByPriceAndCategory = (req, res) => {
    const { minPrice, maxPrice, id_category } = req.query;

    Product.searchByPriceAndCategory(minPrice, maxPrice, id_category, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
};
