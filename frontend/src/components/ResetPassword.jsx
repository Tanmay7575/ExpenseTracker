import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as apiClient from "../apiClient";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setMessage("Passwords do not match!");
    }

    try {
      setLoading(true);
      const res = await apiClient.resetPassword(token, formData.password);
      setMessage(res.message || "Password reset successful!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm w-full max-w-md p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Reset Password
        </h2>

        {message && (
          <div
            className={`text-center text-sm mb-4 ${
              message.toLowerCase().includes("success")
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              New Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter new password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-gray-300 text-gray-800
                         focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-gray-300 text-gray-800
                         focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md font-semibold transition-all 
              ${loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"}
            `}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

