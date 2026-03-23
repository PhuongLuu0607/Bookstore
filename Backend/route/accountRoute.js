const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

// Tạo mới tài khoản
router.post('/api/createaccount', accountController.createAccount);

router.post('/api/createaccount-with-details', accountController.createAccountWithDetails);

// Đăng nhập tài khoản
router.post('/api/login', accountController.loginAccount);

router.get('/api/getallAccount', accountController.getAllAccount);

router.put('/api/updateaccount', accountController.updateAccountById);

router.get('/api/getaccountbyid/:id_tai_khoan', accountController.getAccountById);

router.get('/api/getinfobyiduser/:id_tai_khoan', accountController.getAccountInfo);

module.exports = router;
