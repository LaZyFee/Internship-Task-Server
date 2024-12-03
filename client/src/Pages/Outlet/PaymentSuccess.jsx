import { useLocation } from "react-router-dom";

function PaymentSuccess() {
  const location = useLocation(); // Get the current location
  const { transactionId } = location.state || {}; // Extract transaction ID from state

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card bg-success  text-white lg:w-96 w-screen flex justify-center items-center">
        <div className="card-body">
          <h2 className="card-title">Payment Successful!</h2>
          <p>Your order has been processed. Thank you for your purchase!</p>
          <div className="card-actions justify-end">
            {transactionId && (
              <p>
                Your transaction ID:{" "}
                <strong className="font-semibold text-xl">
                  {transactionId}
                </strong>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
