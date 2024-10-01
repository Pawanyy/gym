import { useEffect, useState } from "react";
import appConstants from "../../constants.js";
import { useSelector } from "react-redux";
import axios from "axios";
import Alert from "../../components/Alert.jsx";
import Pagination from "./../../components/Pagination";

function Contact() {
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [errorMessage, setErrorMessage] = useState(false);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${appConstants.SERVER_URL}/api/contacts`,
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
        <h1 className="mb-8 text-4xl tracking-tight font-extrabold text-gray-800 dark:text-white">
          Contacts
        </h1>
        <Alert message={errorMessage} type="error" />
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="table-custom">
            <thead>
              <tr>
                <th>Sr No</th>
                <th>Subject</th>
                <th>Email</th>
                <th>Message</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {records.length > 0 ? (
                records.map((record, index) => (
                  <tr key={index}>
                    <td>{index + 1 + (page - 1) * 10}</td>
                    <td>{record.subject}</td>
                    <td>{record.email}</td>
                    <td>{record.message}</td>
                    <td>{new Date(record.createdAt).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center">
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
          onPageChange={setPage} // Pass the function to change the page
        />
      </div>
    </div>
  );
}

export default Contact;
