const db = require('../db');

const createReport = async (reportData) => {
    const [result] = await db.execute(
        `INSERT INTO reports (
            faculty_name, class_name, week_of_reporting, date_of_lecture,
            course_name, course_code, lecturer_name, actual_students_present,
            total_registered_students, venue, scheduled_time, topic_taught,
            learning_outcomes, lecturer_recommendations
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            reportData.faculty_name,
            reportData.class_name,
            reportData.week_of_reporting,
            reportData.date_of_lecture,
            reportData.course_name,
            reportData.course_code,
            reportData.lecturer_name,
            reportData.actual_students_present,
            reportData.total_registered_students,
            reportData.venue,
            reportData.scheduled_time,
            reportData.topic_taught,
            reportData.learning_outcomes,
            reportData.lecturer_recommendations
        ]
    );
    return result;
};

const getAllReports = async () => {
    const [rows] = await db.execute('SELECT * FROM reports');
    return rows;
};

const getReportById = async (id) => {
    const [rows] = await db.execute('SELECT * FROM reports WHERE id = ?', [id]);
    return rows[0];
};

const addFeedback = async (id, prl_feedback) => {
    const [result] = await db.execute(
        'UPDATE reports SET prl_feedback = ? WHERE id = ?',
        [prl_feedback, id]
    );
    return result;
};

module.exports = {
    createReport,
    getAllReports,
    getReportById,
    addFeedback
};