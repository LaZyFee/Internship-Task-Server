import { Helmet } from "react-helmet";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdRefresh } from "react-icons/io";
import { toast } from "react-hot-toast";

function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Store API_URL in an environment variable or a config file
  const API_URL = "https://internship-task-server.up.railway.app";

  const fetchCustomersWithPayments = async () => {
    try {
      const res = await axios.get(`${API_URL}/customers-with-payments`);
      setCustomers(res.data.customers);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching customers with payments:", err);
      setError("Failed to load customers");
      setLoading(false);
    }
  };

  // Fetch customers when the component mounts
  useEffect(() => {
    fetchCustomersWithPayments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [API_URL]);

  // Handler to refresh the table data
  const handleRefresh = () => {
    setLoading(true); // Optionally show loading while fetching
    fetchCustomersWithPayments();
    toast.success("Data refreshed successfully");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Helmet>
        <title>Dashboard | Internship Task</title>
      </Helmet>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-purple-900">Dashboard</h1>
        <button className="btn btn-ghost" onClick={handleRefresh}>
          {" "}
          Refresh <IoMdRefresh className="w-6 h-6 cursor-pointer" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* Table head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Paid At</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, customerIndex) =>
              customer.payments.map((payment, paymentIndex) => (
                <tr key={`${customer._id}-${paymentIndex}`}>
                  {/* Index number */}
                  <th>{customerIndex + 1}</th>
                  {/* Customer name */}
                  <td>{customer.name}</td>
                  {/* Customer email */}
                  <td>{customer.email}</td>
                  {/* Transaction ID */}
                  <td>{payment.transactionId}</td>
                  {/* Payment amount */}
                  <td>{payment.amount}</td>
                  {/* Payment date */}
                  <td>{new Date(payment.paidAt).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
