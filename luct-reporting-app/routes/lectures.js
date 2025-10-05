const express = require('express');
const router = express.Router();
const lectureController = require('../controllers/lectureController');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/search', authenticate, async (req, res) => {
    const { topic, date, lecturer_id } = req.query;
    let sql = 'SELECT * FROM lectures WHERE 1=1';
    const params = [];
    if (topic) {
        sql += ' AND topic LIKE ?';
        params.push(`%${topic}%`);
    }
    if (date) {
        sql += ' AND date = ?';
        params.push(date);
    }
    if (lecturer_id) {
        sql += ' AND lecturer_id = ?';
        params.push(lecturer_id);
    }
    try {
        const db = require('../db');
        const [rows] = await db.execute(sql, params);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', authenticate, lectureController.addLecture);
router.get('/', authenticate, lectureController.getLectures);
router.get('/:id', authenticate, lectureController.getLectureById);
router.put('/:id', authenticate, lectureController.updateLecture);
router.delete('/:id', authenticate, lectureController.deleteLecture);

module.exports = router;