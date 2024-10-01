import { useForm } from "react-hook-form";
import Alert from "../../components/Alert.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import appConstants from "../../constants.js";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function UserForm() {
  const [editData, setEditData] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const auth = useSelector((state) => state.auth);
  const { search } = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams(search);
        const userId = queryParams.get("userId");

        if (!userId || userId === "") {
          setEditData(false);
          return;
        }

        const response = await axios.get(
          `${appConstants.SERVER_URL}/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${auth?.tokenInfo?.token}`,
            },
          }
        );

        if (response.status !== 200) {
          setErrorMessage("Error connecting to Server");
          console.error("Response: ", response);
          return;
        }

        console.log("Response Data: ", response.data);

        const { status, message, statusCode, errors, data } = response.data;

        if (status === "error") {
          const errMsg =
            statusCode === 400 && errors?.length
              ? errors[0]
              : message || "An unknown error occurred";

          setErrorMessage(errMsg);
          return;
        }
        console.log("Load successful", data);
        setEditData(data);
        reset(data);
      } catch (error) {
        setErrorMessage("Network error. Please try again later.");
        console.error("Profile Error: ", error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (formData) => {
    console.log("Form Data: ", formData);
    setSuccessMessage(false);
    setErrorMessage(false);
    try {
      const method = editData ? "patch" : "post";

      if (!formData?.password || formData?.password?.trim() === "") {
        delete formData["password"];
      }

      const response = await axios[method](
        `${appConstants.SERVER_URL}/api/users${
          editData ? `/${editData?._id}` : ""
        }`,
        formData,
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

      const { status, message, statusCode, errors, data } = response.data;

      if (status === "error") {
        const errMsg =
          statusCode === 400 && errors?.length
            ? errors[0]
            : message || "An unknown error occurred";

        setErrorMessage(errMsg);
        return;
      }
      console.log("Contact successful");
      setSuccessMessage(message);
      reset();
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message ||
          "Network error. Please try again later."
      );
      console.error("Contact Error: ", error);
    }
  };

  return (
    <div>
      <div className="px-4">
        <h1 className="mb-8 text-2xl tracking-tight font-extrabold text-gray-800 dark:text-white">
          {editData ? "Edit" : "Create"} User
        </h1>
        <form className="space-y-4 max-w-md" onSubmit={handleSubmit(onSubmit)}>
          <Alert message={errorMessage} type="error" />
          <Alert message={successMessage} type="success" />
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="John Doe"
              {...register("name", { required: "Name is required" })}
              className={`shadow-sm bg-gray-50 border ${
                errors.name
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light`}
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="johndoe"
              {...register("username", { required: "Username is required" })}
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
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="name@fitness.dev"
              {...register("email", {
                required: "Email is required",
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
                required: false,
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
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="(123) 456-7890"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Phone number must be 10 digits.",
                },
              })}
              className={`shadow-sm bg-gray-50 border ${
                errors.phone
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light`}
            />
            {errors.phone && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="role"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Role
            </label>
            <select
              id="role"
              placeholder="(123) 456-7890"
              {...register("role", {
                required: "Role is required",
              })}
              className={`shadow-sm bg-gray-50 border ${
                errors.role
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light`}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.role.message}
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

export default UserForm;
