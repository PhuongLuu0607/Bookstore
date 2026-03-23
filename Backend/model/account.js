const db = require('../config/config.js');
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const customerModel = require('./customer'); // dùng model 'customer'

const Account = {

  // ---------------- CREATE BASIC ACCOUNT ----------------
  create: (accountData, callback) => {
    const { user_name, password, email, phone } = accountData;

    bcryptjs.hash(password, saltRounds, (err, hashedPassword) => {
      if (err) return callback(err);

      const sqlInsert = `
        INSERT INTO account (user_name, password, email, phone)
        VALUES (?, ?, ?, ?)
      `;

      db.query(sqlInsert, [user_name, hashedPassword, email, phone], (error, result) => {
        if (error) return callback(error);

        const id_account = result.insertId;

        const customerData = {
          customer_name: user_name,
          phone,
          email,
        };

        customerModel.create(customerData, (errC, resC) => {
          if (errC) return callback(errC);

          const id_customer = resC.insertId;
          const id_account_type = 2;

          // Create account_detail record
          const sqlDetail = `
            INSERT INTO account_detail (id_account, id_customer, id_account_type, id_staff)
            VALUES (?, ?, ?, NULL)
          `;

          db.query(sqlDetail, [id_account, id_customer, id_account_type], (errDetail, resDetail) => {
            if (errDetail) return callback(errDetail);

            return callback(null, {
              account_id: id_account,
              customer_id: id_customer,
              detail_id: resDetail.insertId
            });
          });
        });
      });
    });
  },

  // ---------------- CREATE ACCOUNT WITH DETAILS ----------------
  createWithDetails: (accountData, callback) => {
    const { user_name, password, email, phone, id_account_type, id_staff, id_customer } = accountData;

    bcryptjs.hash(password, saltRounds, (err, hashedPassword) => {
      if (err) return callback(err);

      const sqlInsertAccount = `
        INSERT INTO account (user_name, password, email, phone)
        VALUES (?, ?, ?, ?)
      `;

      db.query(sqlInsertAccount, [user_name, hashedPassword, email, phone], (err, result) => {
        if (err) return callback(err);

        const id_account = result.insertId;
        const sqlInsertDetails = `
          INSERT INTO account_detail (id_account, id_customer, id_account_type, id_staff)
          VALUES (?, ?, ?, ?)
        `;

        db.query(sqlInsertDetails, [id_account, id_customer, id_account_type, id_staff], (err2, result2) => {
          if (err2) return callback(err2);
          callback(null, { account_id: id_account, detail_id: result2.insertId });
        });
      });
    });
  },

  // ---------------- LOGIN ----------------
  login: (email, password, callback) => {
    const sqlSelect = `SELECT * FROM account WHERE email = ?`;
    db.query(sqlSelect, [email], (error, results) => {
      if (error) return callback(error);
      if (results.length === 0) {
        return callback(null, { message: "Account not found." });
      }

      const user = results[0];
      const id_account = user.id_account;

      bcryptjs.compare(password, user.password, (err, isMatch) => {
        if (err) return callback(err);
        if (!isMatch) {
          return callback(null, { message: "Incorrect password." });
        }

        const sqlGetDetail = "SELECT * FROM account_detail WHERE id_account = ?";
        db.query(sqlGetDetail, [id_account], (err, result) => {
        if (err) return callback(err);

        if (result.length === 0) {
            return callback(null, null);
        }

        const detail = result[0];
        const id_account_type = detail.id_account_type;

        const sqlGetDetail = "SELECT * FROM account_type WHERE id_account_type = ?";
        db.query(sqlGetDetail, [id_account_type], (err1, result1) => {
        if (err1) return callback(err1);

        if (result1.length === 0) {
            return callback(null, null);
        }
        const detailType = result1[0]
        user.role = detailType.name_account_type

        callback(null, { message: "Login successful.", user });
        });
        });
      });
    });
  },

  // ---------------- GET ALL ----------------
    getAll: (callback) => {
    const sql = `
        SELECT 
        a.id_account,
        a.user_name,
        a.email,
        a.phone,
        ad.id_account_type,
        CASE 
            WHEN ad.id_account_type = 1 THEN 'Admin'
            WHEN ad.id_account_type = 2 THEN 'Staff'
            WHEN ad.id_account_type = 3 THEN 'Customer'
            WHEN ad.id_account_type = 4 THEN 'Manage'
            ELSE 'Unknown'
        END AS role
        FROM account AS a
        LEFT JOIN account_detail AS ad 
        ON a.id_account = ad.id_account
        ORDER BY a.id_account DESC
    `;

    db.query(sql, (error, result) => {
        if (error) return callback(error);
        callback(null, result);
    });
    },


  // ---------------- FIND BY ID ----------------
  findById: (id_account, callback) => {
    const sql = 'SELECT * FROM account WHERE id_account = ?';
    db.query(sql, [id_account], (err, results) => {
      if (err) return callback(err);
      if (results.length === 0) return callback(null, null);
      callback(null, results[0]);
    });
  },

  // ---------------- UPDATE ACCOUNT ----------------
  updateById: (id_account, user_name, phone, newPassword, callback) => {
    let sql = '';
    let values = [];

    if (newPassword) {
      sql = `UPDATE account SET user_name = ?, phone = ?, password = ? WHERE id_account = ?`;
      values = [user_name, phone, newPassword, id_account];
    } else {
      sql = `UPDATE account SET user_name = ?, phone = ? WHERE id_account = ?`;
      values = [user_name, phone, id_account];
    }

    db.query(sql, values, (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    });
  },

  // ---------------- GET BY ID ----------------
  getById: (id_account, callback) => {
    const sqlGet = "SELECT * FROM account WHERE id_account = ?";
    db.query(sqlGet, [id_account], (error, result) => {
      if (error) return callback(error);
      callback(null, result);
    });
  },

  // ---------------- GET ACCOUNT INFO (JOIN) ----------------
  getInfo: (id_account, callback) => {
    const sqlGetDetail = "SELECT * FROM account_detail WHERE id_account = ?";
    db.query(sqlGetDetail, [id_account], (err, result) => {
      if (err) return callback(err);

      if (result.length === 0) {
        return callback(null, null);
      }

      const detail = result[0];
      let user_id = null;

      if (detail.id_account_type === 1) {
        user_id = detail.id_staff;
      } else if (detail.id_account_type === 2) {
        user_id = detail.id_customer;
      } else {
        return callback(new Error("Invalid account type"));
      }

      return callback(null, { user_id });
    });
  }

};

module.exports = Account;
