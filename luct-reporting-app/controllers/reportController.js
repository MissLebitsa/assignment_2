const Report = require('../models/reportModel');
const ExcelJS = require('exceljs');

exports.createReport = async (req, res) => {
    try {
        const reportData = req.body;
        await Report.createReport(reportData);
        res.status(201).json({ message: 'Report created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllReports = async (req, res) => {
    try {
        const reports = await Report.getAllReports();
        res.json(reports);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getReportById = async (req, res) => {
    try {
        const report = await Report.getReportById(req.params.id);
        if (!report) return res.status(404).json({ error: 'Report not found' });
        res.json(report);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addFeedback = async (req, res) => {
    try {
        const { prl_feedback } = req.body;
        await Report.addFeedback(req.params.id, prl_feedback);
        res.json({ message: 'Feedback added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Download all reports as Excel
exports.downloadReportsExcel = async (req, res) => {
    try {
        const reports = await Report.getAllReports();
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Reports');
        worksheet.columns = [
            { header: 'Faculty Name', key: 'faculty_name' },
            { header: 'Class Name', key: 'class_name' },
            { header: 'Week of Reporting', key: 'week_of_reporting' },
            { header: 'Date of Lecture', key: 'date_of_lecture' },
            { header: 'Course Name', key: 'course_name' },
            { header: 'Course Code', key: 'course_code' },
            { header: 'Lecturer Name', key: 'lecturer_name' },
            { header: 'Actual Students Present', key: 'actual_students_present' },
            { header: 'Total Registered Students', key: 'total_registered_students' },
            { header: 'Venue', key: 'venue' },
            { header: 'Scheduled Time', key: 'scheduled_time' },
            { header: 'Topic Taught', key: 'topic_taught' },
            { header: 'Learning Outcomes', key: 'learning_outcomes' },
            { header: 'Lecturer Recommendations', key: 'lecturer_recommendations' },
            { header: 'PRL Feedback', key: 'prl_feedback' },
            { header: 'Created At', key: 'created_at' },
        ];
        worksheet.addRows(reports);

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=reports.xlsx');
        await workbook.xlsx.write(res);
        res.end();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};