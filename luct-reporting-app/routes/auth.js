const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/search', authenticate, async (req, res) => {
    const { name, email, role } = req.query;
    let sql = 'SELECT id, name, email, role FROM users WHERE 1=1';
    const params = [];
    if (name) {
        sql += ' AND name LIKE ?';
        params.push(`%${name}%`);
    }
    if (email) {
        sql += ' AND email LIKE ?';
        params.push(`%${email}%`);
    }
    if (role) {
        sql += ' AND role = ?';
        params.push(role);
    }
    try {
        const db = require('../db');
        const [rows] = await db.execute(sql, params);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;