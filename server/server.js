const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cron = require('node-cron');
const connectDB = require('./config/db');
const receiptRoutes = require('./routes/receiptRoutes');
const sendWeeklyBackup = require('./utils/backup');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/receipts', receiptRoutes);

// Weekly Cron Job: Every Sunday at midnight
cron.schedule('0 0 * * 0', () => {
    sendWeeklyBackup();
});

// For testing: endpoint to trigger backup manually
app.get('/api/trigger-backup', (req, res) => {
    sendWeeklyBackup();
    res.json({ message: 'Backup triggered' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
