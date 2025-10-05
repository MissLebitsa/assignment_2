const Course = require('../models/courseModel');

exports.addCourse = async (req, res) => {
    try {
        await Course.addCourse(req.body);
        res.status(201).json({ message: 'Course added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.getCourses();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.getCourseById(req.params.id);
        if (!course) return res.status(404).json({ error: 'Course not found' });
        res.json(course);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateCourse = async (req, res) => {
    try {
        await Course.updateCourse(req.params.id, req.body);
        res.json({ message: 'Course updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        await Course.deleteCourse(req.params.id);
        res.json({ message: 'Course deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};