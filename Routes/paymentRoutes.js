import express from 'express';
import { getPayment, processPayment, getAllCustomersWithPayments } from '../Controller/PaymentController.js';
const router = express.Router();


router.post('/create-payment-intent', getPayment);

router.post("/payments", processPayment);

router.get('/customers-with-payments', getAllCustomersWithPayments);
export default router;
