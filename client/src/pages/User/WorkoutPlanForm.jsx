import { useState } from "react";
import appConstants from "../../constants.js";
import { useSelector } from "react-redux";
import axios from "axios";
import Alert from "../../components/Alert.jsx";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const diffOptions = appConstants.DIFFICULTY.map((value) => ({
  value: value,
  label: value.charAt(0).toUpperCase() + value.slice(1),
}));

const muscleoptions = appConstants.MUSCLE_ENUMS.map((value) => ({
  value: value,
  label: value.charAt(0).toUpperCase() + value.slice(1),
}));

function WorkoutPlanForm() {
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (formData) => {
    console.log("Form Data: ", formData);
    setSuccessMessage(false);
    setErrorMessage(false);
    try {
      const selectedDifficulty = formData?.difficulty?.value;

      const selectedMuscles = formData?.muscles?.map((opt) => {
        return opt?.value ? opt.value : opt;
      });

      const payload = {
        ...formData,
        difficulty: selectedDifficulty,
        muscles: selectedMuscles || [],
      };

      if (typeof formData?.muscles === "string") {
        payload.muscles = formData.muscles.split(",")?.map((m) => m?.trim());
      }

      const response = await axios.post(
        `${appConstants.SERVER_URL}/api/workoutPlans`,
        payload,
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

      const { status, message, statusCode, errors, data } = response.data;
      if (status === "error") {
        const errMsg =
          statusCode === 400 && errors?.length
            ? errors[0]
            : message || "An unknown error occurred";

        setErrorMessage(errMsg);
        return;
      }
      console.log("Profile successful");
      setSuccessMessage(message);
      reset();
      setTimeout(() => {
        navigate(`/dashboard?tab=workoutPlanShow&workoutPlanId=${data._id}`);
      }, 1500);
    } catch (error) {
      setErrorMessage("Network error. Please try again later.");
      console.error("Profile Error: ", error);
    }
  };

  return (
    <div className="">
      <div className="px-4">
        <h1 className="mb-8 text-4xl tracking-tight font-extrabold text-gray-800 dark:text-white">
          Workout Plan Generator
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
              placeholder="xyz"
              {...register("title", {
                required: "Name is required",
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
            <textarea
              id="description"
              placeholder="desc"
              rows={3}
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
              htmlFor="muscles"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Muscles [Seperated by (,) Comma]
            </label>
            <Controller
              name="muscles"
              control={control}
              defaultValue={null}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={muscleoptions}
                  isMulti
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              )}
            />
            {errors.muscles && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.muscles.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="difficulty"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Difficulty
            </label>
            <Controller
              name="difficulty"
              control={control}
              defaultValue={null}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={diffOptions}
                  className="basic-select"
                  classNamePrefix="select"
                />
              )}
            />
            {errors.difficulty && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.difficulty.message}
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

export default WorkoutPlanForm;
