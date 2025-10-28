import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AuthContext";
import * as apiClient from "../apiClient";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get("redirect") || "/";
  const { refetchToken } = useAppContext();

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await apiClient.loginUser(user);
    alert("User Logged In Successfully");
    refetchToken();
    navigate(redirectPath, { replace: true });
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      alert(error.response.data.message);
    } else {
      alert("Invalid Credentials");
    }
    console.error("Login Error:", error);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm border border-gray-200">
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-700">
          Login to Expense Tracker
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-sm text-blue-600 font-medium">
          <Link to="/register" className="hover:underline">
            Register Here
          </Link>
          <Link to="/forgot-password" className="hover:underline">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
