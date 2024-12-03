import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import About from "../Pages/Outlet/About";
import Products from "../Pages/Outlet/Products";
import Payouts from "../Pages/Outlet/Payouts";
import Afilliate from "../Pages/Outlet/Afilliate";
import HelpCenter from "../Pages/Outlet/HelpCenter";
import Home from "../Pages/Outlet/Home";
import NotFound from "../Pages/Shared/404";
import Login from "../Pages/Authenticate/Login";
import SignUp from "../Pages/Authenticate/Signup";
import AdminRoute from "../Store/AdminRoute";
import Dashboard from "../Pages/AdminPages/Dashboard/Dashboard";
import DisplayError from "../Pages/Shared/DisplayError";
import DashboardLayout from "../Layouts/DashboardLayouts";
import Checkout from "../Pages/Outlet/Checkout";
import PaymentSuccess from "../Pages/Outlet/PaymentSuccess";
import PaymentCancel from "../Pages/Outlet/PaymentCancel";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/about", element: <About /> },
      { path: "/products", element: <Products /> },
      { path: "/payouts", element: <Payouts /> },
      { path: "/affiliate", element: <Afilliate /> },
      { path: "/help", element: <HelpCenter /> },
      { path: "/error", element: <DisplayError /> },
      { path: "/payment-success", element: <PaymentSuccess /> },
      { path: "/payment-cancel", element: <PaymentCancel /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    errorElement: <DisplayError />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },

  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "*", element: <NotFound /> },
]);
