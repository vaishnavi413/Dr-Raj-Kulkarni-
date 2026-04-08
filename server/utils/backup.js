const ExcelJS = require('exceljs');
const nodemailer = require('nodemailer');
const Receipt = require('../models/Receipt');
const path = require('path');
const fs = require('fs');

const sendWeeklyBackup = async () => {
    try {
        console.log('Generating weekly backup...');
        
        // Get data from last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        
        const receipts = await Receipt.find({
            createdAt: { $gte: sevenDaysAgo }
        });

        if (receipts.length === 0) {
            console.log('No new receipts to backup.');
            return;
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Weekly Receipts');

        worksheet.columns = [
            { header: 'Receipt No', key: 'receiptNo', width: 15 },
            { header: 'Date', key: 'date', width: 15 },
            { header: 'Patient Name', key: 'patientName', width: 25 },
            { header: 'Age', key: 'age', width: 10 },
            { header: 'Gender', key: 'gender', width: 10 },
            { header: 'Consultation', key: 'consultation', width: 15 },
            { header: 'Therapy', key: 'therapy', width: 15 },
            { header: 'Package', key: 'package', width: 15 },
            { header: 'Total', key: 'total', width: 15 }
        ];

        receipts.forEach(r => {
            worksheet.addRow({
                receiptNo: r.receiptNo,
                date: r.date.toLocaleDateString(),
                patientName: r.patientName,
                age: r.age,
                gender: r.gender,
                consultation: r.services.consultation,
                therapy: r.services.therapy,
                package: r.services.package,
                total: r.total
            });
        });

        const backupDir = path.join(__dirname, '../backups');
        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir);
        }

        const filePath = path.join(backupDir, `weekly_backup_${Date.now()}.xlsx`);
        await workbook.xlsx.writeFile(filePath);

        // Send Email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.DOCTOR_EMAIL,
            subject: 'Weekly Billing System Backup',
            text: 'Attached is the weekly receipt backup in Excel format.',
            attachments: [
                {
                    filename: 'Weekly_Receipts.xlsx',
                    path: filePath
                }
            ]
        };

        await transporter.sendMail(mailOptions);
        console.log('Weekly backup sent to doctor email.');

    } catch (err) {
        console.error('Backup failed:', err);
    }
};

module.exports = sendWeeklyBackup;
