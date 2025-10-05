const Lecture = require('../models/lectureModel');

exports.addLecture = async (req, res) => {
    try {
        await Lecture.addLecture(req.body);
        res.status(201).json({ message: 'Lecture added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getLectures = async (req, res) => {
    try {
        const lectures = await Lecture.getLectures();
        res.json(lectures);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getLectureById = async (req, res) => {
    try {
        const lecture = await Lecture.getLectureById(req.params.id);
        if (!lecture) return res.status(404).json({ error: 'Lecture not found' });
        res.json(lecture);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateLecture = async (req, res) => {
    try {
        await Lecture.updateLecture(req.params.id, req.body);
        res.json({ message: 'Lecture updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteLecture = async (req, res) => {
    try {
        await Lecture.deleteLecture(req.params.id);
        res.json({ message: 'Lecture deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};