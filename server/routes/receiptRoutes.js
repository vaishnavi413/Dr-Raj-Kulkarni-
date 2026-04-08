const express = require('express');
const router = express.Router();
const Receipt = require('../models/Receipt');

// Create a new receipt
router.post('/', async (req, res) => {
    try {
        console.log('Attempting to save receipt:', req.body.receiptNo);
        const newReceipt = new Receipt(req.body);
        const savedReceipt = await newReceipt.save();
        console.log('Receipt saved successfully:', savedReceipt.receiptNo);
        res.status(201).json(savedReceipt);
    } catch (err) {
        console.error('Save error details:', err);
        res.status(400).json({ message: err.message });
    }
});

// Get all receipts
router.get('/', async (req, res) => {
    try {
        const receipts = await Receipt.find().sort({ createdAt: -1 });
        res.json(receipts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get latest receipt number to auto-increment
router.get('/latest-no', async (req, res) => {
    try {
        const latest = await Receipt.findOne().sort({ createdAt: -1 });
        res.json({ latestNo: latest ? latest.receiptNo : 'DRK-2026-000' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a receipt
router.put('/:id', async (req, res) => {
    try {
        const updatedReceipt = await Receipt.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedReceipt);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a receipt
router.delete('/:id', async (req, res) => {
    try {
        await Receipt.findByIdAndDelete(req.params.id);
        res.json({ message: 'Receipt deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
