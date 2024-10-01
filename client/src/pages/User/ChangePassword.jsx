import { useForm } from "react-hook-form";
import Alert from "../../components/Alert.jsx";
import { useState } from "react";
import axios from "axios";
import appConstants from "../../constants.js";
import { useSelector } from "react-redux";

function ChangePassword() {
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const auth = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form Data: ", data);
    setSuccessMessage(false);
    setErrorMessage(false);
    try {
      const response = await axios.post(
        `${appConstants.SERVER_URL}/api/auth/changePassword`,
        data,
        {
          headers: {
            Authorization: `Bearer ${auth?.tokenInfo?.token}`,
          },
        }
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
      reset();
    } catch (error) {
      setErrorMessage("Network error. Please try again later.");
      console.error("Contact Error: ", error);
    }
  };

  return (
    <div className="">
      <div className="px-4">
        <h1 className="mb-8 text-2xl tracking-tight font-extrabold text-gray-800 dark:text-white">
          Change Password
        </h1>
        <form className="space-y-4 max-w-md" onSubmit={handleSubmit(onSubmit)}>
          <Alert message={errorMessage} type="error" />
          <Alert message={successMessage} type="success" />
          <div>
            <label
              htmlFor="currentPassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              placeholder="********"
              {...register("currentPassword", {
                required: "Current Password is required",
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
                  message:
                    "Current Password must be 8 characters long, with an uppercase letter, a lowercase letter, and a number.",
                },
              })}
              className={`shadow-sm bg-gray-50 border ${
                errors.currentPassword
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light`}
            />
            {errors.currentPassword && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="newPassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              placeholder="********"
              {...register("newPassword", {
                required: "New Password is required",
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
                  message:
                    "New Password must be 8 characters long, with an uppercase letter, a lowercase letter, and a number.",
                },
                validate: (value) =>
                  value !== watch("currentPassword") ||
                  "New Password cannot be same as Current Password",
              })}
              className={`shadow-sm bg-gray-50 border ${
                errors.newPassword
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light`}
            />
            {errors.newPassword && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.newPassword.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="py-3 px-5 text-sm w-full font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
