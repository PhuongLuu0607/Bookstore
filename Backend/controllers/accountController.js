const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const Account = require('../model/account'); // Model xử lý MySQL query

const SECRET_KEY = 'your-secret-key'; 

// ---------------- LOGIN ACCOUNT ----------------
exports.loginAccount = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please provide both email and password." });
    }

    Account.login(email, password, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Server error." });
        }

        if (result.message && result.message !== "Login successful.") {
            return res.status(400).json(result);
        }

        // If login success → generate token
        const user = result.user;
        const token = jwt.sign(
            {
                id_account: user.id_account,
                user_name: user.user_name,
                email: user.email,
            },
            SECRET_KEY,
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        res.status(200).json({
            message: "Login successful.",
            token,
            user: {
                id_account: user.id_account,
                user_name: user.user_name,
                email: user.email,
                role: user.role,
            },
        });
    });
};

// ---------------- UPDATE ACCOUNT ----------------
exports.updateAccountById = async (req, res) => {
    const { id_account, user_name, phone, old_password, new_password } = req.body;

    if (!id_account) {
        return res.status(400).json({ message: "Missing account ID." })
    }

    Account.findById(id_account, async (err, user) => {
        if (err) return res.status(500).json({ message: "Server error." });
        if (!user) return res.status(404).json({ message: "Account not found." });

        // If changing password
        if (old_password && new_password) {
            const isMatch = await bcryptjs.compare(old_password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Old password is incorrect." });
            }
            const hashedPassword = await bcryptjs.hash(new_password, 10);
            Account.updateById(id_account, user_name, phone, hashedPassword, (err, result) => {
                if (err) return res.status(500).json({ message: "Update failed." });
                res.status(200).json({ message: "Account information and password updated successfully." });
            });
        } else {
            // Update without changing password
            Account.updateById(id_account, user_name, phone, null, (err, result) => {
                if (err) return res.status(500).json({ message: "Update failed." });
                res.status(200).json({ message: "Account information updated successfully." });
            });
        }
    });
};

// ---------------- CREATE ACCOUNT (basic) ----------------
exports.createAccount = (req, res) => {
    const accountData = req.body;
    Account.create(accountData, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send("Account created successfully.");
    });
};

// ---------------- CREATE ACCOUNT WITH DETAILS ----------------
exports.createAccountWithDetails = (req, res) => {
    const {
        user_name,
        password,
        email,
        phone,
        id_account_type,
        id_staff = null,
        id_customer = null
    } = req.body;

    Account.createWithDetails(
        { user_name, password, email, phone, id_account_type, id_staff, id_customer },
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.send("Account and related details created successfully.");
        }
    );
};

// ---------------- GET ALL ACCOUNTS ----------------
exports.getAllAccount = (req, res) => {
    Account.getAll((err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
};

// ---------------- GET ACCOUNT BY ID ----------------
exports.getAccountById = (req, res) => {
    const { id_account } = req.params;
    Account.getById(id_account, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
};

// ---------------- GET ACCOUNT INFO (joined) ----------------
exports.getAccountInfo = (req, res) => {
    const { id_account } = req.params;
    Account.getInfo(id_account, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
};
