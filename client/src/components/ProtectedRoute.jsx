import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ navigateTo = "/login" }) => {
  const { isLoggedIn, isAdminLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn) {
    return <Navigate to={navigateTo} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
