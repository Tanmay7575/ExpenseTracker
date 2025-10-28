import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AuthContext";
import * as apiClient from "../apiClient";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const Navbar = () => {
  const queryClient = useQueryClient();
  const { isLoggedIn,refetchToken } = useAppContext();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const Logout = async () => {
    try {
      await apiClient.logout();
      queryClient.invalidateQueries(["validateToken"]);
      refetchToken();
       setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-yellow-600 text-white px-6 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Expense Tracker</h1>

        <button
          className="md:hidden text-white text-xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          {isLoggedIn ? (
            <button onClick={Logout} className="hover:text-gray-300 cursor-pointer">
              Logout
            </button>
          ) : (
            <Link to="/login" className="hover:text-gray-300">
              Login
            </Link>
          )}
        </div>
      </div>
      {open && (
        <div className="md:hidden flex flex-col space-y-3 mt-3">
          <Link
            to="/"
            className="hover:text-gray-300"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          {isLoggedIn ? (
            <button
              onClick={() => {
                Logout();
                setOpen(false);
              }}
              className="hover:text-gray-300 text-left"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="hover:text-gray-300"
              onClick={() => setOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
