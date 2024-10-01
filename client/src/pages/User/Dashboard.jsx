import {
  HiUserCircle,
  HiChartPie,
  HiCube,
  HiArrowRightStartOnRectangle,
  HiKey,
} from "react-icons/hi2";
import { FaDumbbell } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Profile from "./Profile.jsx";
import ChangePassword from "./ChangePassword.jsx";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice.js";
import Dash from "./Dash.jsx";
import Order from "./Order.jsx";
import WorkoutPlanForm from "./WorkoutPlanForm.jsx";
import WorkoutPlan from "./WorkoutPlan.jsx";
import WorkoutPlanShow from "./WorkoutPlanShow.jsx";

function Sidebar({ className }) {
  const [tab, setTab] = useState("");
  const { search } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(search);
    const tabFromUrl = urlSearchParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
    console.log("Tab: ", tab);
  }, [search]);

  return (
    <>
      <div className={className}>
        <div className="px-4 py-6">
          <ul className="mt-2 space-y-1">
            <li>
              <Link
                to="/dashboard?tab=dash"
                className={`${
                  !tab ? "bg-gray-200 text-gray-700" : ""
                } block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-200 hover:text-gray-700`}
              >
                <span className="flex">
                  <HiChartPie className="size-5" />
                  <span className="ms-3">Dashboard</span>
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard?tab=profile"
                className={`${
                  tab === "profile" ? "bg-gray-200 text-gray-700" : ""
                } block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-200 hover:text-gray-700`}
              >
                <span className="flex">
                  <HiUserCircle className="size-5" />
                  <span className="ms-3">Profile</span>
                </span>
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard?tab=workoutPlans"
                className={`${
                  tab === "workoutPlans" ? "bg-gray-200 text-gray-700" : ""
                } block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-200 hover:text-gray-700`}
              >
                <span className="flex">
                  <FaDumbbell className="size-5" />
                  <span className="ms-3">Workouts</span>
                </span>
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard?tab=orders"
                className={`${
                  tab === "orders" ? "bg-gray-200 text-gray-700" : ""
                } block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-200 hover:text-gray-700`}
              >
                <span className="flex">
                  <HiCube className="size-5" />
                  <span className="ms-3">Orders</span>
                </span>
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard?tab=changePassword"
                className={`${
                  tab === "changePassword" ? "bg-gray-200 text-gray-700" : ""
                } block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-200 hover:text-gray-700`}
              >
                <span className="flex">
                  <HiKey className="size-5" />
                  <span className="ms-3">Change Password</span>
                </span>
              </Link>
            </li>

            <li>
              <button
                className="block rounded-lg px-4 py-2 text-sm font-medium hover:bg-red-50 text-red-500 dark:hover:bg-red-600/10"
                onClick={handleLogout}
              >
                <span className="flex">
                  <HiArrowRightStartOnRectangle className="size-5" />
                  <span className="ms-3">Logout</span>
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

function Dashboards() {
  const { search } = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(search);
    const tabFromUrl = urlSearchParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
    console.log("Tab: ", tabFromUrl);
  }, [search]);
  return (
    <div className="flex w-full">
      <Sidebar className="min-w-72 flex-none font-sans antialiased flex min-h-screen flex-col justify-between border-e bg-white dark:bg-gray-900 dark:border-gray-700" />
      <div className="min-h-screen flex-grow px-4 py-8 sm:px-6 lg:px-8 mb-18">
        {tab === "dash" && <Dash />}
        {tab === "profile" && <Profile />}
        {tab === "orders" && <Order />}
        {tab === "workoutPlans" && <WorkoutPlan />}
        {tab === "workoutPlanForm" && <WorkoutPlanForm />}
        {tab === "workoutPlanShow" && <WorkoutPlanShow />}
        {tab === "changePassword" && <ChangePassword />}
      </div>
    </div>
  );
}

export default Dashboards;
