import { useForm } from "react-hook-form";
import siteLogo from "../assets/logo.png?format=webp";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi2";
import Alert from "../components/Alert.jsx";
import { useState } from "react";
import axios from "axios";
import appConstants from "./../constants.js";

function ResetPassword() {
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const { search } = useLocation();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form Data: ", data);
    setSuccessMessage(false);
    setErrorMessage(false);
    try {
      const queryParams = new URLSearchParams(search);
      const token = queryParams.get("token");

      const response = await axios.post(
        `${appConstants.SERVER_URL}/api/auth/resetPassword?token=${token}`,
        data
      );

      if (response.status !== 200) {
        setErrorMessage("Error connecting to Server");
        console.error("Contact Response: ", response);
        return;
      }

      console.log("Contact Response: ", response.data);

      if (response.data?.status === "error") {
        const { status, message, statusCode, errors } = response.data;

        const errMsg =
          statusCode === 400 && errors?.length
            ? errors[0]
            : message || "An unknown error occurred";

        setErrorMessage(errMsg);
        return;
      }
      console.log("Contact successful");
      setSuccessMessage(response.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setErrorMessage("Network error. Please try again later.");
      console.error("Contact Error: ", error);
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="py-8 px-4 mx-auto max-w-screen-sm lg:px-20">
        <div className="mb-6 flex items-center justify-center">
          <img src={siteLogo} alt="Logo" className="w-[33%]" />
        </div>
        <h1 className="mb-4 text-2xl tracking-tight font-extrabold text-center text-gray-800 dark:text-white">
          Reset Password
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Alert message={errorMessage} type="error" />
          <Alert message={successMessage} type="success" />
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="********"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
                  message:
                    "Password must be 8 characters long, with an uppercase letter, a lowercase letter, and a number.",
                },
              })}
              className={`shadow-sm bg-gray-50 border ${
                errors.password
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light`}
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="********"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              className={`shadow-sm bg-gray-50 border ${
                errors.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light`}
            />
            {errors.confirmPassword && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="py-3 px-5 text-sm w-full font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800"
          >
            Submit
          </button>
          <div>
            <Link to="/login">
              <button className="py-3 px-5 text-sm w-full flex items-center justify-center space-x-2 font-medium text-center text-black rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-800 dark:text-white">
                <HiChevronLeft />
                <span>Back to Login</span>
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
