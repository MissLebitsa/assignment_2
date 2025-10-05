const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    attendance: 92,
    averageGrade: "B+",
    completedModules: ["Mathematics", "English", "Science"],
    progress: 80
  });
});

module.exports = router;