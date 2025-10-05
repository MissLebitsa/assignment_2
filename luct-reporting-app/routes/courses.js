const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/search', authenticate, async (req, res) => {
    const { name, code } = req.query;
    let sql = 'SELECT * FROM courses WHERE 1=1';
    const params = [];
    if (name) {
        sql += ' AND name LIKE ?';
        params.push(`%${name}%`);
    }
    if (code) {
        sql += ' AND code LIKE ?';
        params.push(`%${code}%`);
    }
    try {
        const db = require('../db');
        const [rows] = await db.execute(sql, params);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', authenticate, authorize(['pl']), courseController.addCourse);
router.get('/', authenticate, courseController.getCourses);
router.get('/:id', authenticate, courseController.getCourseById);
router.put('/:id', authenticate, authorize(['pl']), courseController.updateCourse);
router.delete('/:id', authenticate, authorize(['pl']), courseController.deleteCourse);

module.exports = router;