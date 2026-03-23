const db = require('../config/config');

const Employee = {
    getAll: (callback) => {
        const sqlGet = "SELECT * FROM staff";
        db.query(sqlGet, (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },
    getById: (id_staff, callback) => {
        const sqlGet = "SELECT * FROM staff WHERE id_staff = ?";
        db.query(sqlGet, id_staff, (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },
    create: (employeeData, callback) => {
        const { staff_name, gender, address, birthday, phone, cmnd, staff_picture ,email } = employeeData;
        const sqlInsert = "INSERT INTO staff (staff_name, gender, address, birthday, phone, cmnd, staff_picture ,email) VALUES (?, ?, ?, ?, ?, ?, ?,?)";
        db.query(sqlInsert, [staff_name, gender, address, birthday, phone, cmnd, staff_picture,email], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },
    update: (id_staff, employeeData, callback) => {
        const { staff_name, gender, address, birthday, phone, cmnd, staff_picture, email } = employeeData;
        console.log(birthday)
        const sqlUpdate = "UPDATE staff SET staff_name = ?, gender = ?, address = ?, birthday = ?, phone = ?, cmnd = ?, staff_picture = ?, email = ? WHERE id_staff = ?";
        db.query(sqlUpdate, [staff_name, gender, address, birthday, phone, cmnd, staff_picture, email, id_staff], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },
    delete: (id_staff, callback) => {
        const sqlDelete = "DELETE FROM staff WHERE id_staff = ?";
        db.query(sqlDelete, id_staff, (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },
    // Tìm kiếm gần đúng theo tên nhân viên
    searchByName: (searchTerm, callback) => {
        const sqlSearch = "SELECT * FROM staff WHERE staff_name LIKE ?";
        const formattedSearchTerm = `%${searchTerm}%`;
        db.query(sqlSearch, [formattedSearchTerm], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    }
};

module.exports = Employee;
