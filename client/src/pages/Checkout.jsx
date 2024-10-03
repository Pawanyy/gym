import axios from "axios";
import { useEffect, useState } from "react";
import { HiTrash } from "react-icons/hi2";
import appConstants from "./../constants.js";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Alert from "./../components/Alert";
import { useSelector } from "react-redux";
import { motion as m } from "framer-motion";
import { pageTransition, pageVariants } from "./../js/animations.js";

const Checkout = () => {
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [servicePlan, setServicePlan] = useState({});
  const { search } = useLocation();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const handleEmptyCart = () => {
    setErrorMessage("Your Cart is Empty.");
    setServicePlan({});
    return;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams(search);
        const planId = queryParams.get("planId");

        if (!planId || planId === "") {
          setErrorMessage("Your Cart is Empty.");
          return;
        }

        const response = await axios.get(
          `${appConstants.SERVER_URL}/api/plans/${planId}`
        );

        if (response.status !== 200) {
          setErrorMessage("Error connecting to Server");
          console.error("Plan Response: ", response);
          return;
        }

        console.log("Plan Response: ", response.data);

        const { status, message, statusCode, data } = response.data;

        if (response.data?.status === "error") {
          const errMsg =
            statusCode === 404
              ? "Your cart is empty."
              : message || "An unknown error occurred";

          setErrorMessage(errMsg);
          return;
        }
        console.log("Plan Load successful", data);
        setServicePlan(data);
      } catch (error) {
        setErrorMessage("Network error. Please try again later.");
        console.error("Plan Error: ", error);
      }
    };

    fetchData();
  }, []);

  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        `${appConstants.SERVER_URL}/api/orders`,
        {
          planId: servicePlan._id,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.tokenInfo.token}`,
          },
        }
      );

      if (response.status !== 200) {
        setErrorMessage("Error connecting to Server");
        console.error("Plan Response: ", response);
        return;
      }

      console.log("Plan Response: ", response.data);

      const { status, message, statusCode, data } = response.data;

      if (status === "error") {
        const errMsg =
          statusCode === 404
            ? "Your cart is empty."
            : message || "An unknown error occurred";

        setErrorMessage(errMsg);
        return;
      }
      console.log("Plan Load successful", data);
      setServicePlan(data);
      setSuccessMessage("Plan Purchased Successfully!");
      setTimeout(() => {
        navigate("/services");
      }, 1500);
    } catch (error) {
      setErrorMessage("Network error. Please try again later.");
      console.error("Plan Error: ", error);
    }
  };

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
        Your Cart
      </h1>
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Alert message={errorMessage} type="error" />
        <Alert message={successMessage} type="success" />
        <div className="mx-auto max-w-3xl">
          {servicePlan &&
            !successMessage &&
            Object.keys(servicePlan).length > 0 && (
              <div className="mt-8">
                <ul className="space-y-4">
                  <li className="flex items-center gap-4">
                    <div>
                      <h3 className="text-sm text-gray-900 dark:text-gray-200">
                        {servicePlan.title}
                      </h3>

                      <dl className="mt-0.5 space-y-px text-[10px] text-gray-600 dark:text-gray-300">
                        <div>{servicePlan.description}</div>

                        <div>₹ {servicePlan.price}</div>
                      </dl>
                    </div>

                    <div className="flex flex-1 items-center justify-end gap-2">
                      <form>
                        <label htmlFor="Line1Qty" className="sr-only">
                          Quantity
                        </label>

                        <input
                          type="number"
                          min="1"
                          value="1"
                          id="Line1Qty"
                          disabled={true}
                          className="h-8 w-12 rounded border-gray-200 bg-gray-50 dark:bg-gray-600 p-0 text-center text-xs dark:text-gray-200 text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                        />
                      </form>

                      <Link
                        to="/checkout"
                        onClick={handleEmptyCart}
                        className="text-gray-600 transition hover:text-red-600"
                      >
                        <span className="sr-only">Remove item</span>

                        <HiTrash className="size-4" />
                      </Link>
                    </div>
                  </li>
                </ul>

                <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                  <div className="w-screen max-w-lg space-y-4">
                    <dl className="space-y-0.5 text-sm text-gray-700 dark:text-gray-100">
                      <div className="flex justify-between">
                        <dt>Subtotal</dt>
                        <dd>₹ {servicePlan.price}</dd>
                      </div>

                      <div className="flex justify-between !text-base font-medium">
                        <dt>Total</dt>
                        <dd>₹ {servicePlan.price}</dd>
                      </div>
                    </dl>

                    <div className="flex justify-end">
                      <button
                        className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                        onClick={handleCheckout}
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </m.div>
  );
};

export default Checkout;
