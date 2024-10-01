import { useEffect, useState } from "react";
import appConstants from "../../constants.js";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  HiPencilSquare,
  HiTrash,
  HiMiniPlusCircle,
  HiEye,
} from "react-icons/hi2";
import Alert from "../../components/Alert.jsx";
import Pagination from "../../components/Pagination.jsx";
import ConfirmModal from "../../components/ConfirmModal.jsx";
import { Link } from "react-router-dom";

function WorkoutPlan() {
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(false);
  const [recordRefresh, setRecordRefresh] = useState(0);

  const [records, setRecords] = useState({});
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const auth = useSelector((state) => state.auth);

  const handleDelete = (recordId) => {
    setConfirmModalOpen(true);
    setSelectedRecord(recordId);
  };

  const handleConfirmModelConfirm = async () => {
    console.log("Confirmed!");
    setConfirmModalOpen(false);
    setSuccessMessage(false);
    try {
      const response = await axios.delete(
        `${appConstants.SERVER_URL}/api/workoutPlans/me/${selectedRecord}`,
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

      setSuccessMessage("Record Deleted Successfully.");
      setErrorMessage(false);
      setSelectedRecord(false);
      const newPage = page !== 1 && totalRecords === 1 ? page : page - 1;
      setPage(newPage);
      setRecordRefresh(recordRefresh + 1);
      console.log("Contact Load successful", data);
    } catch (error) {
      setErrorMessage("Network error. Please try again later.");
      console.error("Contact Error: ", error);
    }
  };

  const handleConfirmModalCancel = () => {
    console.log("Cancelled!");
    setConfirmModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${appConstants.SERVER_URL}/api/workoutPlans/me`,
          {
            headers: {
              Authorization: `Bearer ${auth?.tokenInfo?.token}`,
            },
            params: {
              page,
              limit,
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

        const { records, total, page: currentPage, totalPages } = data;

        setRecords(records);
        setTotalRecords(total);
        setTotalPages(totalPages);
        setPage(currentPage);

        console.log("Contact Load successful", data);
      } catch (error) {
        setErrorMessage("Network error. Please try again later.");
        console.error("Contact Error: ", error);
      }
    };

    fetchData();
  }, [page]);

  return (
    <div className="">
      <div className="px-4 space-y-4">
        <h1 className="mb-8 text-4xl tracking-tight font-extrabold text-gray-800 dark:text-white flex justify-between">
          <span>Workout Plans</span>
          <Link
            to={`/dashboard?tab=workoutPlanForm`}
            className="flex items-center justify-center rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow dark:hover:bg-blue-700"
          >
            <HiMiniPlusCircle className="size-4 me-2" />
            Add
          </Link>
        </h1>
        <Alert message={errorMessage} type="error" />
        <Alert message={successMessage} type="success" />
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="table-custom">
            <thead>
              <tr>
                <th>Sr No</th>
                <th>Name</th>
                <th>Description</th>
                <th>Duration</th>
                <th>Workout Type</th>
                <th>targetMuscles</th>
                <th>Created Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {records.length > 0 ? (
                records.map((record, index) => (
                  <tr key={index}>
                    <td>{index + 1 + (page - 1) * 10}</td>
                    <td className="text-nowrap">{record.title}</td>
                    <td>{record.description}</td>

                    <td>{record?.duration} min</td>
                    <td>{record?.workoutType}</td>
                    <td className="text-nowrap">
                      {record?.targetMuscles?.map((m, i) => (
                        <p key={i}>
                          {i + 1}. {m}
                        </p>
                      ))}
                    </td>
                    <td>{new Date(record?.createdAt).toLocaleString()}</td>
                    <td>
                      <div className="flex space-x-2">
                        <Link
                          to={`/dashboard?tab=workoutPlanShow&workoutPlanId=${record._id}`}
                        >
                          <HiEye className="size-5 text-blue-600" />
                        </Link>
                        <button onClick={() => handleDelete(record._id)}>
                          <HiTrash className="size-5 text-red-600" />
                        </button>
                      </div>
                    </td>
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
        {/* Use the Pagination component */}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
        <ConfirmModal
          isOpen={isConfirmModalOpen}
          onClose={handleConfirmModalCancel}
          onConfirm={handleConfirmModelConfirm}
          title="Delete Record"
          message="Are you sure you want to delete this record."
        />
      </div>
    </div>
  );
}

export default WorkoutPlan;
