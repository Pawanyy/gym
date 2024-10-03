import { useEffect, useState } from "react";
import appConstants from "../../constants.js";
import { useSelector } from "react-redux";
import axios from "axios";
import Alert from "../../components/Alert.jsx";

function Order() {
  const [Orders, setOrders] = useState({});
  const [errorMessage, setErrorMessage] = useState(false);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${appConstants.SERVER_URL}/api/orders/me`,
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
        setOrders(data);
        console.log("Profile Load successful", data);
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
          My Plans
        </h1>
        <Alert message={errorMessage} type="error" />
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm dark:divide-gray-700 dark:bg-gray-900">
            <thead className="text-left">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  Plan Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  Price
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  Interval
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  Payment Status
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  Date
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {Object.keys(Orders).length > 0 ? (
                Orders.records.map((record, index) => (
                  <tr
                    key={index}
                    className="odd:bg-gray-50 dark:odd:bg-gray-800/50"
                  >
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                      {record.plan.title}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                      {record.price}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                      {record.interval}
                    </td>
                    <td className="whitespace-nowrap capitalize px-4 py-2 text-gray-700 dark:text-gray-200">
                      {record.paymentStatus}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                      {new Date(record.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900 dark:text-white"
                  >
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

export default Order;
