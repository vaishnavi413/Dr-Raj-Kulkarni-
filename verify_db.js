const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../server/.env') });

const verify = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB:', mongoose.connection.name);
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Collections:', collections.map(c => c.name));
        
        const Receipt = mongoose.model('Receipt', new mongoose.Schema({}), 'Dr_Ra_Kulkarni_receipt');
        const count = await Receipt.countDocuments();
        console.log('Receipts in Dr_Ra_Kulkarni_receipt:', count);
        
        const all = await Receipt.find().limit(5);
        console.log('Latest 5 receipts:', all);
        
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

verify();
