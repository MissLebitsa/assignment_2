const db = require('../db');

const addCourse = async (data) => {
    const [result] = await db.execute(
        'INSERT INTO courses (name, code, description) VALUES (?, ?, ?)',
        [data.name, data.code, data.description]
    );
    return result;
};

const getCourses = async () => {
    const [rows] = await db.execute('SELECT * FROM courses');
    return rows;
};

const getCourseById = async (id) => {
    const [rows] = await db.execute('SELECT * FROM courses WHERE id = ?', [id]);
    return rows[0];
};

const updateCourse = async (id, data) => {
    const [result] = await db.execute(
        'UPDATE courses SET name = ?, code = ?, description = ? WHERE id = ?',
        [data.name, data.code, data.description, id]
    );
    return result;
};

const deleteCourse = async (id) => {
    const [result] = await db.execute('DELETE FROM courses WHERE id = ?', [id]);
    return result;
};

module.exports = { addCourse, getCourses, getCourseById, updateCourse, deleteCourse };