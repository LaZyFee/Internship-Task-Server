import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";

function Navbar() {
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Payouts", path: "/payouts" },
    { name: "Affiliate", path: "/affiliate" },
    { name: "Help Center", path: "/help" },
  ].map((item) => (
    <NavLink
      key={item.name}
      to={item.path}
      className={({ isActive }) =>
        isActive
          ? "normal-case bg-text-gradient-2 bg-clip-text text-transparent font-extrabold"
          : "text-slate-500 hover:text-red-400 hover:px-4"
      }
    >
      {item.name}
    </NavLink>
  ));

  return (
    <div className="navbar">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={1}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl normal-case bg-text-gradient bg-clip-text text-transparent">
          Internship
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0 gap-4">{menuItems}</ul>
      </div>
      <div className="navbar-end">
        <NavLink
          className="btn btn-info bg-transparent hover:bg-primary-gradient text-white rounded-full lg:px-6"
          to="/dashboard"
        >
          <Icon icon="mage:dashboard-plus-fill" />
          Client Area
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
