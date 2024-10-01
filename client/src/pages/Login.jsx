import { useForm } from "react-hook-form";
import siteLogo from "../assets/logo.png?format=webp";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import appConstants from "./../constants.js";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "./../store/authSlice.js";
import Alert from "../components/Alert.jsx";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form Data: ", data);
    setErrorMessage(false);
    try {
      const response = await axios.post(
        `${appConstants.SERVER_URL}/api/auth/login`,
        data
      );

      if (response.status != 200) {
        setErrorMessage("Error connecting to Server");
        console.error("Login Response: ", response);
        return;
      }

      if (response.data?.status === "error") {
        let errMsg = response.data.message || "An unknown error occurred";
        if (response.data?.statusCode === 400) {
          errMsg = response.data.errors[0];
        }
        setErrorMessage(errMsg);
        console.error("Login Response: ", response.data);
        return;
      } else {
        dispatch(login(response.data.data));
        navigate("/dashboard?tab=dash");
        console.log("Login Success Response: ", response.data);
      }

      console.log("Login successful");
    } catch (error) {
      setErrorMessage("Network error. Please try again later.");
      console.error("Login Error: ", error);
    }
  };

  const handlePasswordVisibility = (e) => {
    e.preventDefault();
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="py-8 px-4 mx-auto max-w-screen-sm lg:px-20">
        <div className="mb-6 flex items-center justify-center">
          <img src={siteLogo} alt="Logo" className="w-[33%]" />
        </div>
        <h1 className="mb-4 text-2xl tracking-tight font-extrabold text-center text-gray-800 dark:text-white">
          Sign in to your account
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Alert message={errorMessage} type="error" />
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Username
            </label>

            <input
              type="username"
              id="username"
              placeholder="johndoe"
              {...register("username", {
                required: "username is required",
              })}
              className={`shadow-sm bg-gray-50 border ${
                errors.username
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light`}
            />
            {errors.username && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.username.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Password
            </label>

            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                placeholder="********"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
                    message:
                      "Password must be 8 characters long, with an uppercase letter, a lowercase letter, a special character, and a number.",
                  },
                })}
                className={`shadow-sm bg-gray-50 border pe-10 ${
                  errors.password
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light`}
              />
              <span className="absolute inset-y-0 end-0 grid w-10 place-content-center text-gray-500">
                <button onClick={handlePasswordVisibility}>
                  {passwordVisible ? (
                    <HiEye className="size-4" />
                  ) : (
                    <HiEyeSlash className="size-4" />
                  )}
                </button>
              </span>
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="mt-1 text-right text-sm">
            <span className="text-blue-500 hover:cursor-pointer">
              <Link to="/forgot-password">Forgot Password?</Link>
            </span>
          </div>
          <button
            type="submit"
            className="py-3 px-5 text-sm w-full font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800"
          >
            Sign in
          </button>
          <div className="mt-1 text-right text-sm">
            <span className="text-gray-500 me-1">Not a Member?</span>
            <span className="text-blue-500 hover:cursor-pointer">
              <Link to="/register">Register Now</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
