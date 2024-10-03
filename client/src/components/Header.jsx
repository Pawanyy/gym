import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  HiUser,
  HiBars3,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import siteLogo from "../assets/logo.png?format=webp";
import { useEffect, useState, useRef } from "react";
import { logout } from "../store/authSlice.js";
import ThemeToggle from "./ThemeToggle.jsx";

function Header() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);
  const profileDropdownRef = useRef(null);

  const handleLogout = () => {
    setTimeout(() => {
      dispatch(logout());
      navigate("/login");
    }, 1000);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!profileDropdownRef.current?.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    if (profileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileOpen]);

  return (
    <header className="bg-white dark:bg-gray-900 dark:border-gray-800 border-b-2">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link to="/">
              <div className="block text-blue-600 dark:text-blue-600">
                <span className="sr-only">Home</span>
                <img className="h-8" src={siteLogo} />
              </div>
            </Link>
          </div>

          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <div className="text-gray-500 transition dark:text-white dark:hover:text-white/75 hover:text-blue-600 text-base">
                    <NavLink
                      to="/services"
                      className={({ isActive }) =>
                        isActive ? "text-blue-500" : ""
                      }
                    >
                      Services
                    </NavLink>
                  </div>
                </li>

                <li>
                  <div className="text-gray-500 transition dark:text-white dark:hover:text-white/75 hover:text-blue-600 text-base">
                    <NavLink
                      to="/workouts"
                      className={({ isActive }) =>
                        isActive ? "text-blue-500" : ""
                      }
                    >
                      Workouts
                    </NavLink>
                  </div>
                </li>

                <li>
                  <div className="text-gray-500 transition dark:text-white dark:hover:text-white/75 hover:text-blue-600 text-base">
                    <NavLink
                      to="/bmi-calculator"
                      className={({ isActive }) =>
                        isActive ? "text-blue-500" : ""
                      }
                    >
                      BMI
                    </NavLink>
                  </div>
                </li>

                <li>
                  <div className="text-gray-500 transition dark:text-white dark:hover:text-white/75 hover:text-blue-600 text-base">
                    <NavLink
                      to="/about"
                      className={({ isActive }) =>
                        isActive ? "text-blue-500" : ""
                      }
                    >
                      About
                    </NavLink>
                  </div>
                </li>

                <li>
                  <div className="text-gray-500 transition dark:text-white dark:hover:text-white/75 hover:text-blue-600 text-base">
                    <NavLink
                      to="/contact"
                      className={({ isActive }) =>
                        isActive ? "text-blue-500" : ""
                      }
                    >
                      Contact
                    </NavLink>
                  </div>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            {auth.isLoggedIn && (
              <div className="relative">
                <div className="space-x-3 flex items-center justify-center">
                  <div className="inline-flex items-center overflow-hidden rounded-full bg-white dark:border-gray-800 dark:bg-gray-900 border-2 border-white hover:border-gray-200 dark:hover:border-gray-600">
                    <button
                      className="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                      onClick={() => setProfileOpen(!profileOpen)}
                    >
                      <span className="sr-only">User</span>
                      <HiUser className="size-6" />
                    </button>
                  </div>
                </div>
                <div
                  ref={profileDropdownRef}
                  className={`${
                    !profileOpen && "hidden"
                  } absolute end-0 z-10 mt-8 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg dark:divide-gray-800 dark:border-gray-800 dark:bg-gray-900`}
                  role="menu"
                >
                  <div className="p-2">
                    <div
                      className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                      role="menuitem"
                    >
                      {auth.isLoggedIn && "Welcome " + auth.user.username}
                    </div>
                    <Link
                      to="/dashboard?tab=profile"
                      className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                      role="menuitem"
                    >
                      Profile
                    </Link>
                  </div>

                  <div className="p-2">
                    <button
                      className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50 dark:text-red-500 dark:hover:bg-red-600/10"
                      role="menuitem"
                      onClick={handleLogout}
                    >
                      <HiOutlineArrowRightOnRectangle className="size-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}

            {!auth.isLoggedIn && (
              <>
                <Link to="/login">
                  <div className="rounded-3xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow dark:hover:bg-blue-700">
                    Login
                  </div>
                </Link>

                <div className="hidden sm:flex">
                  <Link to="/register">
                    <div className="rounded-3xl bg-gray-100 px-5 py-2.5 text-sm font-medium text-blue-600 dark:bg-gray-800 dark:text-white dark:hover:text-white/75">
                      Register
                    </div>
                  </Link>
                </div>
              </>
            )}

            <div className="block md:hidden">
              <button className="rounded bg-gray-100 p-2 text-gray-600 transition  hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75">
                <HiBars3 className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
