import {
  HiUserGroup,
  HiUserCircle,
  HiEnvelope,
  HiChartPie,
  HiCube,
  HiArrowRightStartOnRectangle,
  HiKey,
  HiDocumentText,
} from "react-icons/hi2";
import { FaDrumSteelpan, FaDumbbell } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutAdmin } from "../../store/authSlice.js";
import ThemeToggle from "../../components/ThemeToggle.jsx";
import ChangePassword from "./ChangePassword.jsx";
import Dash from "./Dash";
import User from "./User.jsx";
import Contact from "./Contact.jsx";
import Order from "./Order";
import Plan from "./Plan.jsx";
import PlanForm from "./PlanForm.jsx";
import UserForm from "./UserForm.jsx";
import Workout from "./Workout.jsx";
import WorkoutForm from "./WorkoutForm.jsx";
import WorkoutPlan from "./WorkoutPlan.jsx";
import WorkoutPlanShow from "./WorkoutPlanShow.jsx";

function Sidebar({ className }) {
  const [tab, setTab] = useState("");
  const { search } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutAdmin());
    navigate("/admin/login");
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
              <Link className="bg-blue-500 text-gray-200 block rounded-lg px-4 py-2 text-sm font-medium">
                <span className="flex">
                  <HiUserCircle className="size-10" />
                  <span className="flex flex-col">
                    <span className="ms-3 capitalize">{auth.user.email}</span>
                    <span className="ms-3 capitalize">{auth.user.role}</span>
                  </span>
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/dashboard?tab=dash"
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
                to="/admin/dashboard?tab=users"
                className={`${
                  tab === "users" ? "bg-gray-200 text-gray-700" : ""
                } block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-200 hover:text-gray-700`}
              >
                <span className="flex">
                  <HiUserGroup className="size-5" />
                  <span className="ms-3">Users</span>
                </span>
              </Link>
            </li>

            <li>
              <Link
                to="/admin/dashboard?tab=workouts"
                className={`${
                  tab === "workouts" ? "bg-gray-200 text-gray-700" : ""
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
                to="/admin/dashboard?tab=workoutPlans"
                className={`${
                  tab === "workoutPlans" ? "bg-gray-200 text-gray-700" : ""
                } block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-200 hover:text-gray-700`}
              >
                <span className="flex">
                  <FaDrumSteelpan className="size-5" />
                  <span className="ms-3">Workout Plans</span>
                </span>
              </Link>
            </li>

            <li>
              <Link
                to="/admin/dashboard?tab=plans"
                className={`${
                  tab === "plans" ? "bg-gray-200 text-gray-700" : ""
                } block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-200 hover:text-gray-700`}
              >
                <span className="flex">
                  <HiDocumentText className="size-5" />
                  <span className="ms-3">Plan</span>
                </span>
              </Link>
            </li>

            <li>
              <Link
                to="/admin/dashboard?tab=orders"
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
                to="/admin/dashboard?tab=contacts"
                className={`${
                  tab === "contacts" ? "bg-gray-200 text-gray-700" : ""
                } block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-200 hover:text-gray-700`}
              >
                <span className="flex">
                  <HiEnvelope className="size-5" />
                  <span className="ms-3">Contacts</span>
                </span>
              </Link>
            </li>

            <li>
              <Link
                to="/admin/dashboard?tab=changePassword"
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
                className="block w-full rounded-lg px-4 py-2 text-sm font-medium hover:bg-red-50 text-red-500 dark:hover:bg-red-600/10"
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

function AdminDashboard() {
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
      <div className="min-h-screen flex-1">
        <div className="h-16 w-full bg-white dark:bg-gray-900 dark:border-gray-800 border-b-2 px-4">
          <div className="flex h-16 items-center justify-between">
            <Link to="/admin/dashboard?tab=dash">Home</Link>
            <div></div>
            <ThemeToggle />
          </div>
        </div>
        <div className="px-4 py-8 sm:px-6 lg:px-8 mb-18">
          {tab === "dash" && <Dash />}
          {tab === "users" && <User />}
          {tab === "userForm" && <UserForm />}
          {tab === "orders" && <Order />}
          {tab === "plans" && <Plan />}
          {tab === "planForm" && <PlanForm />}
          {tab === "workouts" && <Workout />}
          {tab === "workoutForm" && <WorkoutForm />}
          {tab === "workoutPlans" && <WorkoutPlan />}
          {tab === "workoutPlanShow" && <WorkoutPlanShow />}
          {tab === "contacts" && <Contact />}
          {tab === "changePassword" && <ChangePassword />}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
