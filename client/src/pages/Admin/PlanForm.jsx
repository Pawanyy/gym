import { useForm } from "react-hook-form";
import Alert from "../../components/Alert.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import appConstants from "../../constants.js";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function PlanForm() {
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
        const planId = queryParams.get("planId");

        if (!planId || planId === "") {
          setEditData(false);
          return;
        }

        const response = await axios.get(
          `${appConstants.SERVER_URL}/api/plans/${planId}`,
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

      if (typeof formData.features === "string") {
        formData.features = formData.features.split(",");
      }

      const response = await axios[method](
        `${appConstants.SERVER_URL}/api/plans${
          editData ? `/${editData?._id}` : ""
        }`,
        {
          ...formData,
        },
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
      setErrorMessage("Network error. Please try again later.");
      console.error("Contact Error: ", error);
    }
  };

  return (
    <div>
      <div className="px-4">
        <h1 className="mb-8 text-2xl tracking-tight font-extrabold text-gray-800 dark:text-white">
          {editData ? "Edit" : "Create"} Plan
        </h1>
        <form className="space-y-4 max-w-md" onSubmit={handleSubmit(onSubmit)}>
          <Alert message={errorMessage} type="error" />
          <Alert message={successMessage} type="success" />
          <div>
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="a12"
              {...register("title", {
                required: "Title is required",
              })}
              className={`shadow-sm bg-gray-50 border ${
                errors.title
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light`}
            />
            {errors.title && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              placeholder="desc"
              {...register("description", {
                required: "Description is required",
              })}
              className={`shadow-sm bg-gray-50 border ${
                errors.description
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light`}
            />
            {errors.description && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              placeholder="00"
              {...register("price", {
                required: "Price is required",
                min: 0,
                max: 99999999,
              })}
              className={`shadow-sm bg-gray-50 border ${
                errors.price
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light`}
            />
            {errors.price && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.price.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="interval"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Interval
            </label>
            <select
              id="interval"
              {...register("interval", {
                required: "Interval is required",
              })}
              className={`shadow-sm bg-gray-50 border ${
                errors.interval
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light`}
            >
              <option value="month">Month</option>
              <option value="year">Year</option>
              <option value="indefinite">Indefinite</option>
            </select>
            {errors.interval && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.interval.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="features"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Features(Enter Features seperated by (,) comma)
            </label>
            <textarea
              rows={3}
              id="features"
              placeholder="a12"
              {...register("features", {
                required: "Features is required",
              })}
              className={`shadow-sm bg-gray-50 border ${
                errors.features
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light`}
            />
            {errors.features && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.features.message}
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

export default PlanForm;
