const mongoose = require('mongoose');

const ReceiptSchema = new mongoose.Schema({
    receiptNo: { type: String, required: true, unique: true },
    date: { type: Date, default: Date.now },
    patientName: { type: String, required: true },
    age: { type: String },
    gender: { type: String },
    services: {
        consultation: { type: Number, default: 0 },
        acupuncture: { type: Number, default: 0 },
        nutritionChart: { type: Number, default: 0 },
        therapy: { type: Number, default: 0 },
        package: { type: Number, default: 0 },
        medicinesHerbalSyrup: { type: Number, default: 0 },
        medicinesFlowerRemedies: { type: Number, default: 0 },
        medicinesBiochemicTablets: { type: Number, default: 0 },
        medicinesDrops: { type: Number, default: 0 },
        electroTherapy: { type: Number, default: 0 },
        physiotherapy: { type: Number, default: 0 },
        massageTherapy: { type: Number, default: 0 },
        neurotherapy: { type: Number, default: 0 },
        ivNutrition: { type: Number, default: 0 },
        cuppingHijama: { type: Number, default: 0 },
        basti: { type: Number, default: 0 },
        shirodhara: { type: Number, default: 0 },
        prp: { type: Number, default: 0 }
    },
    treatmentFor: { type: String, default: "" },
    total: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Receipt', ReceiptSchema, 'Dr_Ra_Kulkarni_receipt');
