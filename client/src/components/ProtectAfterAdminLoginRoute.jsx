import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectAfterAdminLoginRoute = ({ navigateTo = "/" }) => {
  const { isLoggedIn, isAdminLoggedIn } = useSelector((state) => state.auth);

  if (isAdminLoggedIn) {
    return <Navigate to={navigateTo} />;
  }
  return <Outlet />;
};

export default ProtectAfterAdminLoginRoute;
