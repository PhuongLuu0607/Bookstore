const db = require('../config/config');

const Author = {
    // Lấy tất cả tác giả
    getAll: (callback) => {
        const sqlGet = "SELECT * FROM authors";
        db.query(sqlGet, (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },

    // Lấy tác giả theo ID
    getById: (id_authors, callback) => {
        const sqlGet = "SELECT * FROM authors WHERE id_authors = ?";
        db.query(sqlGet, [id_authors], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },

    // Thêm tác giả mới
    create: (authorData, callback) => {
        const { author_name } = authorData;
        const sqlInsert = "INSERT INTO authors (author_name) VALUES (?)";
        db.query(sqlInsert, [author_name], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },

    // Cập nhật tên tác giả
    update: (id_authors, authorData, callback) => {
        const { author_name } = authorData;
        const sqlUpdate = "UPDATE authors SET author_name = ? WHERE id_authors = ?";
        db.query(sqlUpdate, [author_name, id_authors], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },

    // Xóa tác giả theo ID
    delete: (id_authors, callback) => {
        const sqlDelete = "DELETE FROM authors WHERE id_authors = ?";
        db.query(sqlDelete, [id_authors], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },

    // Tìm kiếm gần đúng theo tên tác giả
    searchByName: (searchTerm, callback) => {
        const sqlSearch = "SELECT * FROM authors WHERE author_name LIKE ?";
        const formattedSearchTerm = `%${searchTerm}%`;
        db.query(sqlSearch, [formattedSearchTerm], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    }
};

module.exports = Author;
