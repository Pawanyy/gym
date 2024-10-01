import { FaDumbbell } from "react-icons/fa6";
import { HiArrowRightCircle, HiEnvelope, HiUserPlus } from "react-icons/hi2";
import { BsBox2Fill } from "react-icons/bs";
import appConstants from "./../../constants.js";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import Alert from "../../components/Alert.jsx";

function Dash() {
  const [errorMessage, setErrorMessage] = useState(false);

  const [dashData, setDashData] = useState({});

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${appConstants.SERVER_URL}/api/reports/dash`,
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

        setDashData(data);
        console.log("Contact Load successful", data);
      } catch (error) {
        setErrorMessage("Network error. Please try again later.");
        console.error("Contact Error: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="">
      <div className="px-4">
        <h1 className="mb-8 text-4xl tracking-tight font-extrabold text-gray-800 dark:text-white">
          Welcome {auth.user.username}!
        </h1>
        <Alert message={errorMessage} type="error" />
        <div className="h-32 grid grid-cols-4 gap-10">
          <div className="group bg-blue-600 rounded-2xl shadow-md overflow-hidden flex flex-col">
            <div className="px-4 py-4 flex justify-between items-center text-white">
              <span className="font-bold flex flex-col">
                <span className="text-3xl">{dashData?.totalUser}</span>
                <span>Users</span>
              </span>
              <HiUserPlus className="size-12 text-gray-300/40 group-hover:size-14 transform duration-500" />
            </div>
            <div className="h-8 bg-blue-700 w-full justify-center font-medium text-base text-white flex-grow items-center flex">
              More Info <HiArrowRightCircle className="size-5 ms-2" />
            </div>
          </div>
          <div className="group bg-green-600 rounded-2xl shadow-md overflow-hidden flex flex-col">
            <div className="px-4 py-4 flex justify-between items-center text-white">
              <span className="font-bold flex flex-col">
                <span className="text-3xl">{dashData?.totalWorkoutPlan}</span>
                <span>Workout Plans</span>
              </span>
              <FaDumbbell className="size-12 text-gray-300/40 group-hover:size-14 transform duration-500" />
            </div>
            <div className="h-8 bg-green-700 w-full justify-center font-medium text-base text-white flex-grow items-center flex">
              More Info <HiArrowRightCircle className="size-5 ms-2" />
            </div>
          </div>
          <div className="group bg-yellow-600 rounded-2xl shadow-md overflow-hidden flex flex-col">
            <div className="px-4 py-4 flex justify-between items-center text-white">
              <span className="font-bold flex flex-col">
                <span className="text-3xl">{dashData?.totalOrder}</span>
                <span>Orders</span>
              </span>
              <BsBox2Fill className="size-12 text-gray-300/40 group-hover:size-14 transform duration-500" />
            </div>
            <div className="h-8 bg-yellow-700 w-full justify-center font-medium text-base text-white flex-grow items-center flex">
              More Info <HiArrowRightCircle className="size-5 ms-2" />
            </div>
          </div>
          <div className="group bg-red-600 rounded-2xl shadow-md overflow-hidden flex flex-col">
            <div className="px-4 py-4 flex justify-between items-center text-white">
              <span className="font-bold flex flex-col">
                <span className="text-3xl">{dashData?.totalContact}</span>
                <span>Contacts</span>
              </span>
              <HiEnvelope className="size-12 text-gray-300/40 group-hover:size-14 transform duration-500" />
            </div>
            <div className="h-8 bg-red-700 w-full justify-center font-medium text-base text-white flex-grow items-center flex">
              More Info <HiArrowRightCircle className="size-5 ms-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dash;
