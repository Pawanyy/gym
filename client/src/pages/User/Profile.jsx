import { useForm } from "react-hook-form";
import Alert from "../../components/Alert.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import appConstants from "../../constants.js";
import { useSelector } from "react-redux";

function Profile() {
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const auth = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${appConstants.SERVER_URL}/api/users/me`,
          {
            headers: {
              Authorization: `Bearer ${auth?.tokenInfo?.token}`,
            },
          }
        );

        if (response.status !== 200) {
          setErrorMessage("Error connecting to Server");
          console.error("Profile Response: ", response);
          return;
        }

        console.log("Profile Response: ", response.data);

        if (response.data?.status === "error") {
          const { status, message, statusCode, errors } = response.data;

          const errMsg =
            statusCode === 400 && errors?.length
              ? errors[0]
              : message || "An unknown error occurred";

          setErrorMessage(errMsg);
          return;
        }
        console.log("Profile Load successful");
        reset(response.data.data);
      } catch (error) {
        setErrorMessage("Network error. Please try again later.");
        console.error("Profile Error: ", error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data) => {
    console.log("Form Data: ", data);
    setSuccessMessage(false);
    setErrorMessage(false);
    try {
      const response = await axios.patch(
        `${appConstants.SERVER_URL}/api/users/me`,
        data,
        {
          headers: {
            Authorization: `Bearer ${auth?.tokenInfo?.token}`,
          },
        }
      );

      if (response.status !== 200) {
        setErrorMessage("Error connecting to Server");
        console.error("Profile Response: ", response);
        return;
      }

      console.log("Profile Response: ", response.data);

      if (response.data?.status === "error") {
        const { status, message, statusCode, errors } = response.data;

        const errMsg =
          statusCode === 400 && errors?.length
            ? errors[0]
            : message || "An unknown error occurred";

        setErrorMessage(errMsg);
        return;
      }
      console.log("Profile successful");
      setSuccessMessage(response.data.message);
    } catch (error) {
      setErrorMessage("Network error. Please try again later.");
      console.error("Profile Error: ", error);
    }
  };

  return (
    <div className="">
      <div className="px-4">
        <h1 className="mb-8 text-2xl tracking-tight font-extrabold text-gray-800 dark:text-white">
          My Profile
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
              htmlFor="bloodGroup"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Blood Group:
            </label>
            <select
              id="bloodGroup"
              name="bloodGroup"
              className="shadow-sm bg-gray-50 border-gray-300 dark:border-gray-600 w-full rounded-lg p-2.5 border  dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light"
              {...register("bloodGroup", {
                required: "bloodGroup is required",
              })}
            >
              <option value="Unknown">Unknown</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Address
            </label>
            <textarea
              type="address"
              id="address"
              rows={3}
              placeholder="abcd"
              {...register("address", {
                optional: "Address cannot be Empty",
              })}
              className={`shadow-sm bg-gray-50 border ${
                errors.address
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light`}
            />
            {errors.address && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.address.message}
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

          <button
            type="submit"
            className="py-3 px-5 text-sm w-full font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
