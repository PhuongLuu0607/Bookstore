const Category = require('../../server/model/category');

exports.getAllCategories = (req, res) => {
    Category.getAll((err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
};

exports.getCategoryById = (req, res) => {
    const { id_category } = req.params;
    Category.getById(id_category, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
};

exports.createCategory = (req, res) => {
    const categoryData = req.body;
    Category.create(categoryData, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send("Category added successfully");
    });
};

exports.updateCategory = (req, res) => {
    const { id_category } = req.params;
    const categoryData = req.body;
    Category.update(id_category, categoryData, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send("Category updated successfully");
    });
};

exports.deleteCategory = (req, res) => {
    const { id_category } = req.params;
    Category.delete(id_category, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send("Category deleted successfully");
    });
};

// New function to search categories by name (approximate match)
exports.searchCategoryByName = (req, res) => {
    const { searchTerm } = req.params;
    Category.searchByName(searchTerm, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
};
