import { useState } from "react";
import * as apiClient from "../apiClient";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setLink("");

    try {
      const response = await apiClient.forgotPassword(email);
      setLink(response.link);
      setMessage("Click here to open your reset email");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm w-full max-w-md p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Enter your email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
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
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        {message && (
          <div className="mt-4 text-center">
            {link ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-700 transition"
              >
                {message}
              </a>
            ) : (
              <p className="text-red-500">{message}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;




