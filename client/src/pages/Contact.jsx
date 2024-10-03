import { useForm } from "react-hook-form";
import axios from "axios";
import appConstants from "./../constants.js";
import { useState } from "react";
import Alert from "../components/Alert";
import { motion as m } from "framer-motion";
import { pageTransition, pageVariants } from "./../js/animations.js";

function Contact() {
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form Data: ", data);
    setSuccessMessage(false);
    setErrorMessage(false);
    try {
      const response = await axios.post(
        `${appConstants.SERVER_URL}/api/contacts`,
        data
      );

      if (response.status !== 200) {
        setErrorMessage("Error connecting to Server");
        console.error("Contact Response: ", response);
        return;
      }

      if (response.data?.status === "error") {
        let errMsg = response.data.message || "An unknown error occurred";
        if (response.data?.statusCode === 400) {
          errMsg = response.data.errors[0];
        }
        setErrorMessage(errMsg);
        console.error("Contact Response: ", response.data);
        return;
      } else {
        console.log("Contact Success Response: ", response.data);
        setSuccessMessage(response.data.message);
      }

      console.log("Contact successful");
    } catch (error) {
      setErrorMessage("Network error. Please try again later.");
      console.error("Contact Error: ", error);
    }
  };

  return (
    <m.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="py-8 px-4 mx-auto max-w-screen-md">
        <h1 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-800 dark:text-white">
          Contact Us
        </h1>

        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
          Got a technical issue? Want to send feedback about a beta feature?
          Need details about our Business plan? Let us know.
        </p>

        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
          <Alert message={errorMessage} type="error" />
          <Alert message={successMessage} type="success" />

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Your Email
            </label>

            <input
              type="email"
              id="email"
              placeholder="name@fitness.dev"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Email address is invalid",
                },
              })}
              className={`shadow-sm bg-gray-50 border ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light`}
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Subject
            </label>

            <input
              type="text"
              id="subject"
              placeholder="Let us know how we can help you"
              {...register("subject", { required: "Subject is required" })}
              className={`shadow-sm bg-gray-50 border ${
                errors.subject
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light`}
            />
            {errors.subject && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.subject.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Your Message
            </label>

            <textarea
              id="message"
              rows={6}
              placeholder="Leave a comment..."
              {...register("message", { required: "Message is required" })}
              className={`shadow-sm bg-gray-50 border ${
                errors.message
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light`}
            />
            {errors.message && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.message.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-600 sm:w-fit hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800"
          >
            Send Message
          </button>
        </form>
      </div>
    </m.div>
  );
}

export default Contact;
