import axios from "axios";
import { useEffect, useState } from "react";
import { HiCheck } from "react-icons/hi2";
import appConstants from "../constants.js";
import { useSelector } from "react-redux";
import { motion as m } from "framer-motion";
import { pageTransition, pageVariants } from "../js/animations.js";

const Workouts = () => {
  const [errorMessage, setErrorMessage] = useState(false);
  const [WorkoutList, setServicePlan] = useState([]);
  const [Orders, setOrders] = useState([]);

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
    <div className="rounded-2xl border border-gray-200 dark:border-gray-600 p-6 shadow-sm sm:px-8 lg:p-12 hover:shadow-blue-500 hover:border-blue-500/75">
      <div className="text-left">
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
        </div>
      </div>

      <ul className="mt-6 space-y-2">
        {data?.muscles?.map((feature, index) => (
          <li className="flex items-center gap-1" key={index}>
            <HiCheck className="text-green-500" />
            <span className="text-gray-700 dark:text-gray-400">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Workouts;
