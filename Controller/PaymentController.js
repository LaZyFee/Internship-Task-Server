import CustomerModel from '../Models/CustomerModel.js';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_51Ox3o4RrPIPSDdtURYxddoLm5f2mL4OOvDI0YxJeO94BuDXF2H5aiITo8OdnQcwZztVzTc9kLZvbFWuMs8lWXcyd00iMWMB2sw");

const CURRENCY = 'usd';

export const getPayment = async (req, res) => {
    try {
        const { amount, customer } = req.body;

        if (!amount || !customer) {
            return res.status(400).json({ message: 'Amount and customer are required' });
        }

        // Check if the customer already exists in the database
        let existingCustomer = await CustomerModel.findOne({ email: customer.email });

        // If the customer does not exist, create a new one
        if (!existingCustomer) {
            existingCustomer = new CustomerModel({
                name: customer.name,
                email: customer.email,
            });
            await existingCustomer.save().catch(err => {
                console.error('Error saving customer: ', err);
                return res.status(500).json({ message: 'Failed to save customer' });
            });
        }

        // Create a payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: parseInt(amount * 100), // Convert amount to cents
            currency: CURRENCY,
            payment_method_types: ['card'],
            receipt_email: customer.email, // Set the receipt email
        });

        res.send({ clientSecret: paymentIntent.client_secret });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const processPayment = async (req, res) => {
    try {
        const { transactionId, amount, customer } = req.body;

        if (!transactionId || !amount || !customer || !customer.email || !customer.name) {
            return res.status(400).json({ message: 'All payment details are required.' });
        }

        // Find the customer by email
        let existingCustomer = await CustomerModel.findOne({ email: customer.email });

        if (existingCustomer) {
            // If the customer already exists, add a new payment record to their payments array
            existingCustomer.payments.push({
                transactionId: transactionId,
                amount: amount,
                paidAt: new Date()
            });

            const updatedCustomer = await existingCustomer.save();
            return res.status(200).json({
                message: 'New payment added for existing customer',
                customer: updatedCustomer,
            });
        } else {
            // If the customer doesn't exist, create a new entry with the payment record
            const newCustomer = new CustomerModel({
                name: customer.name,
                email: customer.email,
                payments: [{
                    transactionId: transactionId,
                    amount: amount,
                    paidAt: new Date()
                }]
            });

            const savedCustomer = await newCustomer.save();
            return res.status(201).json({
                message: 'Payment successful and customer saved',
                customer: savedCustomer,
            });
        }
    } catch (error) {
        console.error('Error processing payment: ', error);
        if (!res.headersSent) {
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
};