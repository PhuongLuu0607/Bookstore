const Author = require('../model/author'); // Đổi model

// Lấy tất cả tác giả
exports.getAllAuthors = (req, res) => {
    Author.getAll((err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
};

// Lấy tác giả theo ID
exports.getAuthorById = (req, res) => {
    const { id_authors } = req.params;
    Author.getById(id_authors, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
};

// Thêm tác giả mới
exports.createAuthor = (req, res) => {
    const authorData = req.body; // { author_name: "Tên tác giả" }
    Author.create(authorData, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send("Author added successfully");
    });
};

// Cập nhật tác giả
exports.updateAuthor = (req, res) => {
    const { id_authors } = req.params;
    const authorData = req.body; // { author_name: "Tên mới" }
    Author.update(id_authors, authorData, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send("Author updated successfully");
    });
};

// Xóa tác giả
exports.deleteAuthor = (req, res) => {
    const { id_authors } = req.params;
    Author.delete(id_authors, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send("Author deleted successfully");
    });
};

// Hàm tìm kiếm tác giả theo tên (gần đúng)
exports.searchAuthorByName = (req, res) => {
    const { searchTerm } = req.params; // Lấy search term từ URL
    Author.searchByName(searchTerm, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
};
