import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../Store/AuthStore";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import cardImage from "../../assets/Rectangle 1.png";

function Home() {
  const apiUrl = "https://internship-task-server.up.railway.app";
  const [plans, setPlans] = useState([]);
  const [selectedSize, setSelectedSize] = useState("10000");
  const [editPlan, setEditPlan] = useState(null);
  const { isAdmin } = useAuth();
  const [total, setTotal] = useState("299");

  useEffect(() => {
    axios
      .get(`${apiUrl}/plans/${selectedSize}`)
      .then((response) => {
        setPlans(response.data);
        setTotal(response.data[0].details.weekend_holding);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [selectedSize]);

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleEdit = (plan) => {
    if (plan._id) {
      setEditPlan(plan);
    } else {
      console.error("Plan does not have a valid ID:", plan);
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`${apiUrl}/plans/${id}`)
      .then(() => {
        const updatedPlans = plans.filter((plan) => plan._id !== id);
        setPlans(updatedPlans);
      })
      .catch((error) => console.error("Error deleting plan: ", error));
  };

  const handleUpdate = (id, updatedDetails) => {
    axios
      .put(`${apiUrl}/plans/${id}`, updatedDetails)
      .then((response) => {
        const updatedPlans = plans.map((plan) =>
          plan._id === id ? response.data : plan
        );
        setPlans(updatedPlans);
        setEditPlan(null);
      })
      .catch((error) => console.error("Error updating plan: ", error));
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Home | Internship Task</title>
      </Helmet>
      <div className="text-center mt-10 text-white">
        <h1 className="text-4xl font-bold">Pick Your Funding Programs</h1>
      </div>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-2 gap-4 my-4">
          <button className="btn btn-info bg-transparent hover:bg-primary-gradient text-white rounded-full lg:px-6">
            Standard Challenge
          </button>
          <button className="btn btn-info bg-transparent hover:bg-primary-gradient text-white rounded-full lg:px-6">
            Instant Funding
          </button>
        </div>

        <div className="grid grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {/* Account size buttons */}
          {["10000", "20000", "30000", "50000", "60000"].map((size) => (
            <button
              key={size}
              className={`btn btn-info bg-transparent hover:bg-primary-gradient text-[#78FFD6] rounded-full lg:px-6 ${
                selectedSize === size
                  ? "bg-primary-gradient text-white"
                  : "text-white"
              }`}
              onClick={() => handleSizeChange(size)}
            >
              ${size}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="max-w-full lg:w-2/3 overflow-x-auto shadow-2xl rounded-xl">
            <table className="table w-full">
              {/* Head */}
              <thead>
                <tr>
                  <th></th> {/* Empty header for the detail names column */}
                  {plans.map((plan) => (
                    <th key={plan.plan_name}>{plan.plan_name}</th>
                  ))}
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {/* Row for Trading Period */}
                <tr>
                  <td>Trading Period</td>
                  {plans.map((plan) => (
                    <td key={plan.plan_name}>
                      {plan.details && plan.details.trading_period
                        ? `${plan.details.trading_period} days`
                        : "N/A"}
                    </td>
                  ))}
                  {isAdmin && <td></td>}
                </tr>

                {/* Row for Profit Target */}
                <tr>
                  <td>Profit Target</td>
                  {plans.map((plan) => (
                    <td key={plan.plan_name}>
                      {plan.details && plan.details.profit_target !== undefined
                        ? plan.details.profit_target
                        : "N/A"}
                    </td>
                  ))}
                  {isAdmin && <td></td>}
                </tr>

                {/* Row for Maximum Daily Loss */}
                <tr>
                  <td>Maximum Daily Loss</td>
                  {plans.map((plan) => (
                    <td key={plan.plan_name}>
                      {plan.details &&
                      plan.details.maximum_daily_loss !== undefined
                        ? plan.details.maximum_daily_loss
                        : "N/A"}
                    </td>
                  ))}
                  {isAdmin && <td></td>}
                </tr>

                {/* Row for Maximum Overall Loss */}
                <tr>
                  <td>Maximum Overall Loss</td>
                  {plans.map((plan) => (
                    <td key={plan.plan_name}>
                      {plan.details &&
                      plan.details.maximum_overall_loss !== undefined
                        ? plan.details.maximum_overall_loss
                        : "N/A"}
                    </td>
                  ))}
                  {isAdmin && <td></td>}
                </tr>

                {/* Row for Drawdown Type */}
                <tr>
                  <td>Drawdown Type</td>
                  {plans.map((plan) => (
                    <td key={plan.plan_name}>
                      {plan.details && plan.details.drawdown_type !== undefined
                        ? plan.details.drawdown_type
                        : "N/A"}
                    </td>
                  ))}
                  {isAdmin && <td></td>}
                </tr>

                {/* Row for News Trading */}
                <tr>
                  <td>News Trading</td>
                  {plans.map((plan) => (
                    <td key={plan.plan_name}>
                      {plan.details && plan.details.news_trading !== undefined
                        ? plan.details.news_trading
                          ? "Yes"
                          : "No"
                        : "N/A"}
                    </td>
                  ))}
                  {isAdmin && <td></td>}
                </tr>

                {/* Row for Weekend Holding */}
                <tr>
                  <td>Weekend Holding</td>
                  {plans.map((plan) => (
                    <td key={plan.plan_name}>
                      {plan.details &&
                      plan.details.weekend_holding !== undefined
                        ? plan.details.weekend_holding
                        : "N/A"}
                    </td>
                  ))}
                  {isAdmin && <td></td>}
                </tr>

                {/* Row for Actions (if admin) */}
                {isAdmin && (
                  <tr>
                    <td>Actions</td>
                    {plans.map((plan) => (
                      <td key={plan.plan_name}>
                        <div className="flex space-x-4">
                          <FaRegEdit
                            className="cursor-pointer text-blue-500"
                            onClick={() => handleEdit(plan)}
                          />
                          <FaRegTrashAlt
                            className="cursor-pointer text-red-500"
                            onClick={() => handleDelete(plan._id)}
                          />
                        </div>
                      </td>
                    ))}
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Cart */}
          <div className="card bg-black w-full lg:w-1/3 shadow-2xl text-white">
            <div className="card-body">
              <h2 className="card-title">Pick Challenge</h2>
              <p>
                The Challenge is your initial dive into becoming a Titan Trader.
                Prove your trading skills, hit the profit target, maintain
                discipline, and showcase responsible risk management.
              </p>

              <figure>
                <img src={cardImage} alt="card image" />
              </figure>
              <div className="my-2">Total: {total}</div>
              <Link
                to="/checkout"
                state={{ total }}
                className="btn w-full rounded-lg bg-primary-gradient text-white"
              >
                Start Challenge
              </Link>
            </div>
          </div>
        </div>

        {/* Edit Form (Only if the plan is being edited) */}
        {editPlan && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate(editPlan._id, editPlan.details);
            }}
            className="mt-4"
          >
            <h3 className="text-lg font-bold">
              Edit Plan: {editPlan.plan_name}
            </h3>
            <input
              type="text"
              value={editPlan.details.profit_target}
              onChange={(e) =>
                setEditPlan({
                  ...editPlan,
                  details: {
                    ...editPlan.details,
                    profit_target: e.target.value,
                  },
                })
              }
              placeholder="Profit Target"
              className="input input-bordered mt-2"
            />

            {/* Add similar inputs for other details you want to allow editing */}
            <button type="submit" className="btn btn-success mt-4">
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setEditPlan(null)}
              className="btn btn-error mt-4 ml-2"
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Home;
