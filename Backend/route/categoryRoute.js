const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/api/getallcategory', categoryController.getAllCategories);
router.get('/api/getcategory/:id_category', categoryController.getCategoryById);
router.post('/api/createcategory', categoryController.createCategory);
router.put('/api/updatecategory/:id_category', categoryController.updateCategory);
router.delete('/api/deletecategory/:id_category', categoryController.deleteCategory);
router.get('/api/searchcategory/:searchTerm', categoryController.searchCategoryByName);
module.exports = router;
