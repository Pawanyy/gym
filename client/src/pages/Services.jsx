import axios from "axios";
import { useEffect, useState } from "react";
import { HiCheck } from "react-icons/hi2";
import appConstants from "./../constants.js";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Services = () => {
  const [errorMessage, setErrorMessage] = useState(false);
  const [servicePlan, setServicePlan] = useState([]);
  const [Orders, setOrders] = useState([]);

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchDataPublic = async () => {
      try {
        const response = await axios.get(
          `${appConstants.SERVER_URL}/api/plans`
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

    const fetchDataOrders = async () => {
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
          console.error("Profile Response: ", response);
          return;
        }

        console.log("Profile Response: ", response.data);
        const { status, message, statusCode, errors, data } = response.data;

        if (status === "error") {
          return;
        }
        setOrders(data.records);
        console.log("Profile Load successful", data);
      } catch (error) {
        console.error("Profile Error: ", error);
      }
    };

    if (auth.isLoggedIn) {
      fetchDataOrders();
    }
  }, []);

  return (
    <section className="services py-20">
      <h1 className="mb-16 text-4xl tracking-tight font-extrabold text-center text-gray-800 dark:text-white">
        Our Plans
      </h1>
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 md:px-8 lg:px-0">
          {servicePlan.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              purchased={
                Orders.find((o) => o.plan._id === service._id) !== undefined
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service, purchased = false }) => {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-600 p-6 shadow-sm sm:px-8 lg:p-12 hover:shadow-blue-500 hover:border-blue-500/75">
      <div className="text-center">
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-200">
          {service.title}
        </h2>
        <p className="mt-2 sm:mt-4">
          <strong className="text-xl font-bold text-gray-900 dark:text-gray-300 sm:text-2xl">
            ₹{service.price}
          </strong>
          {service.interval && service.interval !== "indefinite" && (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
              /{service.interval}
            </span>
          )}
        </p>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {service.description}
        </p>
      </div>

      <ul className="mt-6 space-y-2">
        {service.features.map((feature, index) => (
          <li className="flex items-center gap-1" key={index}>
            <HiCheck className="text-green-500" />
            <span className="text-gray-700 dark:text-gray-400">{feature}</span>
          </li>
        ))}
      </ul>

      {!purchased ? (
        <Link
          to={`/checkout?planId=${service._id}`}
          className="mt-8 block rounded-full border border-indigo-600 bg-white dark:bg-transparent px-12 py-3 text-center text-sm font-medium text-indigo-600 hover:ring-1 hover:ring-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
        >
          Purchase
        </Link>
      ) : (
        <button className="mt-8 block rounded-full border border-gray-600 bg-white dark:bg-transparent px-12 py-3 text-center text-sm font-medium text-gray-600 hover:ring-1 hover:ring-gray-600 focus:outline-none focus:ring active:text-gray-500">
          Already Purchased
        </button>
      )}
    </div>
  );
};

export default Services;
