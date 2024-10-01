import { useForm } from "react-hook-form";
import siteLogo from "../assets/logo.png?format=webp";
import { Link } from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi2";
import appConstants from "./../constants.js";
import axios from "axios";
import { useState } from "react";
import Alert from "../components/Alert.jsx";

function ForgotPassword() {
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form Data: ", data);
    setSuccessMessage(false);
    setErrorMessage(false);
    try {
      const response = await axios.post(
        `${appConstants.SERVER_URL}/api/auth/forgotPassword`,
        data
      );

      if (response.status !== 200) {
        setErrorMessage("Error connecting to Server");
        console.error("Contact Response: ", response);
        return;
      }

      if (response.data?.status === "error") {
        let errMsg = response.data.message || "An unknown error occurred";
        if (response.data?.statusCode === 400) {
          errMsg = response.data.errors[0];
        }
        setErrorMessage(errMsg);
        console.error("Contact Response: ", response.data);
        return;
      } else {
        console.log("Contact Success Response: ", response.data);
        setSuccessMessage(response.data.message);
      }

      console.log("Contact successful");
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
          Forgot Password
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="text-sm text-gray-600">
            Enter your email and we'll send you a link to reset your pasword.
          </div>
          <Alert message={errorMessage} type="error" />
          <Alert message={successMessage} type="success" />
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Email
            </label>

            <input
              type="text"
              id="email"
              placeholder="johndoe@fitness.test"
              {...register("email", {
                required: "email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Email address is invalid",
                },
              })}
              className={`shadow-sm bg-gray-50 border ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light`}
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.email.message}
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

export default ForgotPassword;
