import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectAfterLoginRoute = ({ navigateTo = "/" }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to={navigateTo} />;
  }
  return <Outlet />;
};

export default ProtectAfterLoginRoute;
