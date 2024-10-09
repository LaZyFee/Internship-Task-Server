import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    transactionId: { type: String, required: true },
    amount: { type: Number, required: true },
    paidAt: { type: Date, default: Date.now }
});

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    payments: [paymentSchema]
});

const CustomerModel = mongoose.model('Customer', customerSchema);
export default CustomerModel;
