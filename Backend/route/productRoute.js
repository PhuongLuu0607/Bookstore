const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
console.log(productController)

router.get('/api/getallproduct', productController.getAllProducts);
router.get('/api/getproduct/:id_product', productController.getProductById);
router.get('/api/getproduct-by-category/:id_category', productController.getProductByCategoryId);
router.post('/api/createproduct', productController.createProduct);
router.put('/api/updateproduct/:id_product', productController.updateProduct);
router.delete('/api/deleteproduct/:id_product', productController.deleteProduct);
router.get('/api/searchproduct/:searchTerm', productController.searchProductByName);
router.get('/api/searchgdvprice', productController.searchProductByPriceAndCategory);

module.exports = router;