import CustomerModel from '../Models/CustomerModel.js';
import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

import Mailgun from "mailgun.js";
import formData from "form-data";

const mailgun = new Mailgun(formData);
const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;

if (!MAILGUN_API_KEY) {
    console.error('MAILGUN_API_KEY is not defined');
    // Optionally, you can throw an error or handle it as needed
}

const mg = mailgun.client({
    username: "api",
    key: MAILGUN_API_KEY
});


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const CURRENCY = 'usd';


export const getPayment = async (req, res) => {
    try {
        const { amount, customer } = req.body;

        if (!amount || !customer) {
            return res.status(400).json({ message: 'Amount and customer are required' });
        }

        // Check if the customer already exists in the database
        let existingCustomer = await CustomerModel.findOne({ email: customer.email });

        if (!existingCustomer) {
            try {
                existingCustomer = new CustomerModel({
                    name: customer.name,
                    email: customer.email,
                    payments: []
                });
                await existingCustomer.save();
            } catch (err) {
                if (err.code === 11000) {
                    // Handle the duplicate key error gracefully
                    console.error('Duplicate key error: ', err);
                    return res.status(400).json({ message: 'Email already exists' });
                }
                console.error('Error saving customer: ', err);
                return res.status(500).json({ message: 'Failed to save customer' });
            }
        }

        // Create a payment intent with Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: parseInt(amount * 100), // Convert amount to cents
            currency: CURRENCY,
            payment_method_types: ['card'],
            receipt_email: customer.email // Set the receipt email
        });

        if (!res.headersSent) {
            return res.send({ clientSecret: paymentIntent.client_secret });
        }
    } catch (error) {
        console.error('Error in getPayment:', error);
        if (!res.headersSent) {
            return res.status(500).json({ message: error.message });
        }
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

        // If the customer exists, add a new payment record to their payments array
        if (existingCustomer) {
            existingCustomer.payments.push({
                transactionId: transactionId,
                amount: amount,
                paidAt: new Date()
            });

            const updatedCustomer = await existingCustomer.save();

            // Send a confirmation email after successful payment
            await sendConfirmationEmail(customer.email, transactionId, amount);

            return res.status(200).json({
                message: 'Payment recorded for existing customer',
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

            // Send a confirmation email after successful payment
            await sendConfirmationEmail(customer.email, transactionId, amount);

            return res.status(201).json({
                message: 'Payment successful and customer saved',
                customer: savedCustomer,
            });
        }
    } catch (error) {
        console.error('Error processing payment:', error);
        if (!res.headersSent) {
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
};

// Helper function to send confirmation email
const sendConfirmationEmail = async (email, transactionId, amount) => {
    try {
        const messageData = {
            from: "Excited User <mailgun@sandboxdb6253c20b5142dba74f4570ac38f34e.mailgun.org>",
            to: ["rhr277@gmail.com"],
            subject: "Thank you for your purchase!",
            html: `
  <div style="padding: 20px; font-family: Arial, sans-serif; background-color: #f9f9f9; border-radius: 10px;">
    <h2 style="color: #333;">Thank you for purchasing!</h2>
    <p style="font-size: 16px;">Your transaction was successful. Below are your payment details:</p>
    <h4>Transaction ID: ${transactionId}</h4>
    <h4>Amount: ${amount} ${CURRENCY.toUpperCase()}</h4>
    <p style="font-size: 14px; color: #555;">We hope you enjoy your purchase. If you have any questions, feel free to contact us.</p>
  </div>
`

        };

        const result = await mg.messages.create('sandboxdb6253c20b5142dba74f4570ac38f34e.mailgun.org', messageData);
        console.log('Email sent successfully:', result);
    } catch (err) {
        console.error('Error sending email:', err);
    }
};
export const getAllCustomersWithPayments = async (req, res) => {
    try {
        // Find all customers who have at least one payment
        const customers = await CustomerModel.find({ 'payments.0': { $exists: true } });

        if (customers.length === 0) {
            return res.status(404).json({ message: 'No customers with payments found' });
        }

        // Send back the customer data including their payment history
        return res.status(200).json({
            message: 'Customers with payments retrieved successfully',
            customers,
        });
    } catch (error) {
        console.error('Error fetching customers with payments: ', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

