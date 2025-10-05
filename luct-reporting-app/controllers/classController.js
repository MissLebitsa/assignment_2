const Class = require('../models/classModel');

exports.addClass = async (req, res) => {
    try {
        await Class.addClass(req.body);
        res.status(201).json({ message: 'Class added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getClasses = async (req, res) => {
    try {
        const classes = await Class.getClasses();
        res.json(classes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getClassById = async (req, res) => {
    try {
        const classObj = await Class.getClassById(req.params.id);
        if (!classObj) return res.status(404).json({ error: 'Class not found' });
        res.json(classObj);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateClass = async (req, res) => {
    try {
        await Class.updateClass(req.params.id, req.body);
        res.json({ message: 'Class updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteClass = async (req, res) => {
    try {
        await Class.deleteClass(req.params.id);
        res.json({ message: 'Class deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};