const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { authenticate } = require('../middleware/auth');

router.get('/search', authenticate, async (req, res) => {});
router.get('/download/excel', authenticate, reportController.downloadReportsExcel);
router.post('/', authenticate, reportController.createReport);
router.get('/', authenticate, reportController.getAllReports);
router.get('/:id', authenticate, reportController.getReportById);

router.post('/:id/feedback', authenticate, reportController.addFeedback);

module.exports = router;