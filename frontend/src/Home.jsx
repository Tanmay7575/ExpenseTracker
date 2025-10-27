import { Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { useAppContext } from "./context/AuthContext";

const Home = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-4xl w-full">
        {isLoggedIn ? (
          <Dashboard />
        ) : (
          <div className="text-center text-gray-700 flex flex-col items-center">
          
            <h1 className="text-4xl font-bold mb-4 tracking-wide">
              Welcome to{" "}
              <span className="text-blue-400">Expense Tracker</span>
            </h1>
            <p className="text-gray-400 mb-8 text-lg leading-relaxed">
              Track your daily expenses, manage your budget, and gain full control
              of your finances — all in one place.
            </p>
            <Link
              to="/login"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
            >
              Login to Get Started
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                Sign up now
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
