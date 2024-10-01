import { useEffect, useState } from "react";
import appConstants from "../../constants.js";
import { useSelector } from "react-redux";
import axios from "axios";
import Alert from "../../components/Alert.jsx";
import { useLocation } from "react-router-dom";

function WorkoutPlanShow() {
  const [workoutPlanData, setWorkoutPlanData] = useState({});
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const auth = useSelector((state) => state.auth);
  const { search } = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams(search);
        const workoutPlanId = queryParams.get("workoutPlanId");

        if (!workoutPlanId || workoutPlanId === "") {
          setWorkoutPlanData(false);
          return;
        }

        const response = await axios.get(
          `${appConstants.SERVER_URL}/api/workoutPlans/${workoutPlanId}`,
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
        setWorkoutPlanData(data);
      } catch (error) {
        setErrorMessage("Network error. Please try again later.");
        console.error("Profile Error: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="">
      <div className="px-4">
        <h1 className="mb-8 text-4xl tracking-tight font-extrabold text-gray-800 dark:text-white">
          Workout Plan Info
        </h1>
        <Alert message={errorMessage} type="error" />
        <Alert message={successMessage} type="success" />
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="table-custom">
            <thead>
              <tr>
                <th>Sr No</th>
                <th>Title</th>
                <th>Descricption</th>
                <th>Duration</th>
                <th>Excercises</th>
                <th>Workout Type</th>
                <th>Targeted Muscle</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(workoutPlanData).length > 0 && (
                <tr>
                  <td>1</td>
                  <td>{workoutPlanData.title}</td>
                  <td>{workoutPlanData.descricption}</td>
                  <td>{workoutPlanData.duration}</td>
                  <td>{workoutPlanData.exercises.length}</td>
                  <td>{workoutPlanData.workoutType}</td>
                  <td>
                    {workoutPlanData?.targetMuscles.map((m, i) => (
                      <p key={i}>
                        {i + 1}. {m}
                      </p>
                    ))}
                  </td>
                  <td>{workoutPlanData.createdAt}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <h2 className="text-2xl mt-8 mb-4">Excersises Info</h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="table-custom">
            <thead>
              <tr>
                <th>Sr No</th>
                <th>Name</th>
                <th>Description</th>
                <th>Muscles</th>
                <th>Duration</th>
                <th>Sets</th>
                <th>Reps</th>
                <th>Diffculty</th>
                <th>Instructions</th>
                <th>Created Date</th>
              </tr>
            </thead>

            <tbody>
              {workoutPlanData?.exercises?.length > 0 ? (
                workoutPlanData?.exercises.map((record, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="text-nowrap">{record.name}</td>
                    <td>{record.description}</td>
                    <td className="text-nowrap">
                      {record.muscles.map((m, i) => (
                        <p key={i}>
                          {i + 1}. {m}
                        </p>
                      ))}
                    </td>
                    <td>{record.duration} min</td>
                    <td>{record.sets}</td>
                    <td>{record.reps}</td>
                    <td className="capitalize">{record.difficulty}</td>
                    <td>{record.instructions}</td>
                    <td>{new Date(record.createdAt).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={11} className="text-center">
                    No Data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default WorkoutPlanShow;
