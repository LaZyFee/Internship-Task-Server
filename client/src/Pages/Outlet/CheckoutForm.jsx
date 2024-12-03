import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function CheckoutForm({ customerInfo, amount }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  const API_URL =
    import.meta.env.VITE_REACT_APP_API_URL ||
    "https://internship-task-server.up.railway.app";

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const res = await axios.post(`${API_URL}/create-payment-intent`, {
          amount, // amount in cents
          customer: customerInfo,
        });
        setClientSecret(res.data.clientSecret);
        setSubmitDisabled(false);
      } catch (err) {
        console.error(err);
        toast.error("Failed to create payment intent");
      }
    };

    createPaymentIntent();
  }, [amount, customerInfo, API_URL]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || submitDisabled) {
      return;
    }

    setSubmitDisabled(true);
    setProcessing(true);

    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message);
      setSubmitDisabled(false);
      setProcessing(false);
      return;
    }

    setCardError("");

    try {
      const { paymentIntent, error: intentError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              name: customerInfo.name,
              email: customerInfo.email,
            },
          },
        });

      if (intentError) {
        setCardError(intentError.message);
        setSubmitDisabled(false);
        setProcessing(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        const payment = {
          transactionId: paymentIntent.id,
          amount: paymentIntent.amount,
          customer: customerInfo,
        };

        await axios.post(`${API_URL}/payments`, payment);
        setProcessing(false);
        setSuccess(true);
        setTransactionId(paymentIntent.id);
        toast.success("Payment successful!");

        navigate("/payment-success", {
          state: { transactionId: paymentIntent.id },
        });
      }
    } catch (error) {
      console.error("Error confirming card payment: ", error);
      setCardError("Payment confirmation failed");
      setSubmitDisabled(false);
      setProcessing(false);
    }
  };

  return (
    <div className="w-screen lg:w-96 mx-auto card shadow-xl place-content-center my-10">
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "18px",
                color: "white",
                "::placeholder": { color: "white" },
              },
              invalid: { color: "#9e2146" },
            },
          }}
        />
        <button
          className="btn btn-primary mt-4 py-5 text-white my-5"
          type="submit"
          disabled={!stripe || !clientSecret || processing || submitDisabled}
        >
          {processing ? "Processing..." : "Pay"}
        </button>
      </form>
      <p className="text-red-500">{cardError}</p>
    </div>
  );
}

export default CheckoutForm;
