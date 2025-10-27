import ForgotPassword from "./components/ForgotPassword";
import Navbar from "./components/Navbar";
import ResetPassword from "./components/ResetPassword";
import Home from "./Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Routes, Route } from "react-router-dom";

const App = () => {
  
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/reset-password/:token" element={<ResetPassword/>}/>
      </Routes>
     
    </div>
  );
};

export default App;
