const db = require('../db');

const addClass = async (data) => {
    const [result] = await db.execute(
        'INSERT INTO classes (course_id, name, venue, scheduled_time) VALUES (?, ?, ?, ?)',
        [data.course_id, data.name, data.venue, data.scheduled_time]
    );
    return result;
};

const getClasses = async () => {
    const [rows] = await db.execute('SELECT * FROM classes');
    return rows;
};

const getClassById = async (id) => {
    const [rows] = await db.execute('SELECT * FROM classes WHERE id = ?', [id]);
    return rows[0];
};

const updateClass = async (id, data) => {
    const [result] = await db.execute(
        'UPDATE classes SET course_id = ?, name = ?, venue = ?, scheduled_time = ? WHERE id = ?',
        [data.course_id, data.name, data.venue, data.scheduled_time, id]
    );
    return result;
};

const deleteClass = async (id) => {
    const [result] = await db.execute('DELETE FROM classes WHERE id = ?', [id]);
    return result;
};

module.exports = { addClass, getClasses, getClassById, updateClass, deleteClass };