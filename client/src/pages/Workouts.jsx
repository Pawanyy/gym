import axios from "axios";
import { useEffect, useState } from "react";
import appConstants from "../constants.js";
import { useSelector } from "react-redux";
import { motion as m } from "framer-motion";
import { pageTransition, pageVariants } from "../js/animations.js";
import noImage from "./../assets/noImage.png";
import Alert from "./../components/Alert";

const Workouts = () => {
  const [errorMessage, setErrorMessage] = useState(false);
  const [WorkoutList, setServicePlan] = useState([]);

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchDataPublic = async () => {
      try {
        const response = await axios.get(
          `${appConstants.SERVER_URL}/api/workouts`
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
        console.log("Profile Load successful", response.data);
        setServicePlan(response.data.data.records);
      } catch (error) {
        setErrorMessage("Network error. Please try again later.");
        console.error("Profile Error: ", error);
      }
    };

    fetchDataPublic();
  }, []);

  return (
    <m.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="services py-20"
    >
      <h1 className="mb-16 text-4xl tracking-tight font-extrabold text-center text-gray-800 dark:text-white">
        Workouts
      </h1>
      <Alert message={errorMessage} type="error" />
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 md:px-8 lg:px-0">
          {WorkoutList.map((workout, index) => (
            <WorkoutCard key={index} data={workout} />
          ))}
        </div>
      </div>
    </m.div>
  );
};

const WorkoutCard = ({ data }) => {
  return (
    <div className="rounded-2xl border overflow-y-hidden border-gray-200 dark:border-gray-600shadow-smhover:shadow-blue-500 hover:border-blue-500/75">
      <div>
        <img
          className="w-full"
          src={data.image ? data.image : noImage}
          alt="workout image"
        />
      </div>
      <div className="text-left p-8 pt-5">
        <h2 className="text-lg font-medium capitalize text-gray-900 dark:text-gray-200">
          {data?.name}
        </h2>
        <div className="mt-2 space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {data?.description}
          </p>
          <div>
            Difficulty:
            <strong className="ms-2 font-bold capitalize">
              {data?.difficulty}
            </strong>
          </div>
          <div>Duration: {data?.duration} min</div>
          <div>
            {data?.sets} X {data?.reps} (sets X reps)
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            {data?.instructions}
          </p>
          <div className="mt-6 capitalize text-gray-100 dark:text-white flex space-x-1 space-y-1 text-sm flex-wrap">
            {data?.muscles?.map((feature, index) => (
              <span className="px-2 py-1 bg-blue-500 rounded-md" key={index}>
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workouts;
