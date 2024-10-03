import { useForm, Controller } from "react-hook-form";
import Alert from "../../components/Alert.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import appConstants from "../../constants.js";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Select from "react-select";

const diffOptions = appConstants.DIFFICULTY.map((value) => ({
  value: value,
  label: value.charAt(0).toUpperCase() + value.slice(1),
}));

const muscleoptions = appConstants.MUSCLE_ENUMS.map((value) => ({
  value: value,
  label: value.charAt(0).toUpperCase() + value.slice(1),
}));

function WorkoutForm() {
  const [editData, setEditData] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const auth = useSelector((state) => state.auth);
  const { search } = useLocation();
  const [refresh, setRefresh] = useState(0);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams(search);
        const workoutId = queryParams.get("workoutId");

        if (!workoutId || workoutId === "") {
          setEditData(false);
          return;
        }

        const response = await axios.get(
          `${appConstants.SERVER_URL}/api/workouts/${workoutId}`,
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

        const selectedDifficulty = diffOptions.find(
          (opt) => opt.value === data.difficulty
        );

        const selectedMuscles = data.muscles
          .map((value) => {
            const option = muscleoptions.find((opt) => opt.value === value);
            return option || null;
          })
          .filter(Boolean);

        reset({
          ...data,
          difficulty: selectedDifficulty,
          muscles: selectedMuscles,
        });
      } catch (error) {
        setErrorMessage("Network error. Please try again later.");
        console.error("Profile Error: ", error);
      }
    };

    fetchData();
  }, [refresh]);

  const onSubmit = async (formData) => {
    console.log("Form Data: ", formData);
    setSuccessMessage(false);
    setErrorMessage(false);
    try {
      const method = editData ? "patch" : "post";

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

      const response = await axios[method](
        `${appConstants.SERVER_URL}/api/workouts${
          editData ? `/${editData?._id}` : ""
        }`,
        payload,
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
      setRefresh(refresh + 1);
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
          {editData ? "Edit" : "Create"} Workout
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
              placeholder="Pull Ups"
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
              htmlFor="muscles"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Muscles
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
              htmlFor="duration"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Duration
            </label>
            <input
              type="number"
              id="duration"
              placeholder="10"
              min={1}
              max={999999}
              step={1}
              {...register("duration", {
                required: "Duration is required.",
              })}
              className={`shadow-sm bg-gray-50 border ${
                errors.duration
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light`}
            />
            {errors.duration && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.duration.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="sets"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Sets
            </label>
            <input
              type="number"
              id="sets"
              placeholder="10"
              min={1}
              max={999999}
              step={1}
              {...register("sets", {
                required: "Sets is required.",
              })}
              className={`shadow-sm bg-gray-50 border ${
                errors.sets
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light`}
            />
            {errors.sets && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.sets.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="reps"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Duration
            </label>
            <input
              type="number"
              id="reps"
              placeholder="10"
              min={1}
              max={999999}
              step={1}
              {...register("reps", {
                required: "Reps is required.",
              })}
              className={`shadow-sm bg-gray-50 border ${
                errors.reps
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light`}
            />
            {errors.reps && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.reps.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="instructions"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Instructions
            </label>
            <textarea
              rows={3}
              id="instructions"
              placeholder="abc"
              {...register("instructions", {
                required: "Instructions is required",
              })}
              className={`shadow-sm bg-gray-50 border ${
                errors.instructions
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light`}
            />
            {errors.instructions && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.instructions.message}
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

export default WorkoutForm;
