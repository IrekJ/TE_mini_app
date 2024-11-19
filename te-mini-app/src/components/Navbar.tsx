import React from "react";
import { NavLink } from "react-router-dom";

export const Navbar: React.FC = () => {
  const linkclassName = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "bg-gray-500 text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
      : "text-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2";

  return (
    <nav className="bg-gray-200 p-4">
      <div className="flex justify-center space-x-4">
      <NavLink to="/" className={linkclassName}>
          Home
        </NavLink>
        <NavLink to="/posts" className={linkclassName}>
          Posts
        </NavLink>
        <NavLink to="/login" className={linkclassName}>
          Login
        </NavLink>
        <NavLink to ="/register" className={linkclassName}>
          Register
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
