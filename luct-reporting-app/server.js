require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));      
app.use('/api/reports', require('./routes/reports'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/classes', require('./routes/classes'));
app.use('/api/lectures', require('./routes/lectures'));
app.use('/api/student/monitoring', require('./routes/monitoring'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});