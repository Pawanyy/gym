import { useEffect, useState } from "react";
import appConstants from "../../constants.js";
import { useSelector } from "react-redux";
import axios from "axios";
import Alert from "../../components/Alert.jsx";
import Pagination from "./../../components/Pagination";
import ConfirmModal from "../../components/ConfirmModal.jsx";

function Order() {
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(false);
  const [recordRefresh, setRecordRefresh] = useState(0);

  const [records, setRecords] = useState([]);
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
    try {
      const response = await axios.delete(
        `${appConstants.SERVER_URL}/api/plans/${selectedRecord}`,
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
          `${appConstants.SERVER_URL}/api/orders`,
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
  }, [page, recordRefresh]);

  return (
    <div className="">
      <div className="px-4 space-y-4">
        <h1 className="mb-8 text-4xl tracking-tight font-extrabold text-gray-800 dark:text-white flex justify-between">
          <span>Purchases</span>
        </h1>
        <Alert message={errorMessage} type="error" />
        <Alert message={successMessage} type="success" />
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="table-custom">
            <thead>
              <tr>
                <th>Sr No</th>
                <th>Username</th>
                <th>Plan</th>
                <th>Price</th>
                <th>Interval</th>
                <th>Payment Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {records.length > 0 ? (
                records.map((record, index) => (
                  <tr key={index}>
                    <td>{index + 1 + (page - 1) * 10}</td>
                    <td className="text-nowrap">{record?.user?.username}</td>
                    <td>
                      <p>{record?.plan?.title}</p>
                    </td>
                    <td className="text-nowrap">₹ {record?.price}</td>
                    <td className="capitalize">{record?.interval}</td>
                    <td className="text-nowrap capitalize">
                      {record.paymentStatus}
                    </td>
                    <td>{new Date(record.createdAt).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="text-center" colSpan={8}>
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

export default Order;
