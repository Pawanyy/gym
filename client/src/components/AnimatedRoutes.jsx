import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./../pages/Login";
import Register from "./../pages/Register.jsx";
import Home from "./../pages/Home";
import About from "./../pages/About";
import Contact from "./../pages/Contact";
import Services from "./../pages/Services";
import Root from "./../pages/Root.jsx";
import NotFound from "./../pages/NotFound";
import ForgotPassword from "./../pages/ForgotPassword.jsx";
import ResetPassword from "./../pages/ResetPassword.jsx";
import BMI from "./../pages/BMI.jsx";
import Dashboard from "./../pages/User/Dashboard.jsx";
import Checkout from "./../pages/Checkout.jsx";
import ProtectAfterLoginRoute from "./ProtectAfterLoginRoute";
import AdminLogin from "./../pages/Admin/AdminLogin.jsx";
import ProtectedAdminRoute from "./ProtectedAdminRoute ";
import AdminDashboard from "./../pages/Admin/AdminDashboard.jsx";
import ProtectAfterAdminLoginRoute from "./ProtectAfterAdminLoginRoute";
import Workouts from "../pages/Workouts.jsx";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Root />}>
          <Route path="/" element={<Home />} />
          <Route
            element={
              <ProtectAfterLoginRoute navigateTo="/dashboard?tab=dash" />
            }
          >
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/bmi-calculator" element={<BMI />} />
          <Route path="/services" element={<Services />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>
        </Route>

        {/* Admin routes */}
        <Route
          element={
            <ProtectAfterAdminLoginRoute navigateTo="/admin/dashboard?tab=dash" />
          }
        >
          <Route path="/admin/login" element={<AdminLogin />} />
        </Route>
        <Route element={<ProtectedAdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/manage-users" element={<h1>GG</h1>} />
        </Route>

        {/* Not found route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}
export default AnimatedRoutes;
