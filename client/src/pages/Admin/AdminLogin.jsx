import { useForm } from "react-hook-form";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import appConstants from "../../constants.js";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginAdmin } from "../../store/authSlice.js";
import Alert from "../../components/Alert.jsx";
function AdminLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    console.log("Form Data: ", formData);
    setErrorMessage(false);
    try {
      const response = await axios.post(
        `${appConstants.SERVER_URL}/api/auth/login`,
        {
          ...formData,
          role: "admin",
        }
      );

      if (response.status != 200) {
        setErrorMessage("Error connecting to Server");
        console.error("Login Response: ", response);
        return;
      }

      const { status, message, statusCode, errors, data } = response.data;

      if (status === "error") {
        const errMsg =
          statusCode === 400 && errors?.length
            ? errors[0]
            : message || "An unknown error occurred";

        setErrorMessage(errMsg);
        console.error("Login Response: ", response.data);
        return;
      } else {
        dispatch(loginAdmin(data));
        navigate("/admin/dashboard?tab=dash");
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
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-14">
      <div className="py-10 px-4 mx-auto max-w-screen-sm lg:px-20">
        <h1 className="my-10 text-4xl tracking-tight font-extrabold text-center text-gray-800 dark:text-white">
          Admin Login
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
          <div className="mt-1 text-right text-sm hidden">
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
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
