import express from 'express';
import { getPayment, processPayment } from '../Controller/PaymentController.js';
const router = express.Router();


router.post('/create-payment-intent', getPayment);

router.post("/payments", processPayment);


export default router;
