const db = require('../db');

const addLecture = async (data) => {
    const [result] = await db.execute(
        'INSERT INTO lectures (class_id, date, topic, learning_outcomes, lecturer_id) VALUES (?, ?, ?, ?, ?)',
        [data.class_id, data.date, data.topic, data.learning_outcomes, data.lecturer_id]
    );
    return result;
};

const getLectures = async () => {
    const [rows] = await db.execute('SELECT * FROM lectures');
    return rows;
};

const getLectureById = async (id) => {
    const [rows] = await db.execute('SELECT * FROM lectures WHERE id = ?', [id]);
    return rows[0];
};

const updateLecture = async (id, data) => {
    const [result] = await db.execute(
        'UPDATE lectures SET class_id = ?, date = ?, topic = ?, learning_outcomes = ?, lecturer_id = ? WHERE id = ?',
        [data.class_id, data.date, data.topic, data.learning_outcomes, data.lecturer_id, id]
    );
    return result;
};

const deleteLecture = async (id) => {
    const [result] = await db.execute('DELETE FROM lectures WHERE id = ?', [id]);
    return result;
};

module.exports = { addLecture, getLectures, getLectureById, updateLecture, deleteLecture };