const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/search', authenticate, async (req, res) => {
    const { name, venue } = req.query;
    let sql = 'SELECT * FROM classes WHERE 1=1';
    const params = [];
    if (name) {
        sql += ' AND name LIKE ?';
        params.push(`%${name}%`);
    }
    if (venue) {
        sql += ' AND venue LIKE ?';
        params.push(`%${venue}%`);
    }
    try {
        const db = require('../db');
        const [rows] = await db.execute(sql, params);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', authenticate, classController.addClass);
router.get('/', authenticate, classController.getClasses);
router.get('/:id', authenticate, classController.getClassById);
router.put('/:id', authenticate, classController.updateClass);
router.delete('/:id', authenticate, classController.deleteClass);

module.exports = router;