import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { HiArrowSmallLeft } from "react-icons/hi2";
import { motion as m } from "framer-motion";
import { pageTransition, pageVariants } from "./../js/animations.js";

function NotFound() {
  const location = useLocation();

  console.log(location);

  return (
    <m.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="grid h-screen place-content-center bg-white px-4 dark:bg-gray-900"
    >
      <div className="text-center">
        <h1 className="text-6xl md:text-9xl font-black text-gray-200 dark:text-gray-700">
          404
        </h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          Page Not Found!
        </p>

        <p className="mt-4 text-gray-500 dark:text-gray-400">
          Sorry, the page you are looking for could not be found.
        </p>

        <Link to="/">
          <div className="mt-6 inline-flex space-x-2 rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring">
            <HiArrowSmallLeft className="size-5" />
            <span>Go Back Home</span>
          </div>
        </Link>
      </div>
    </m.div>
  );
}

export default NotFound;
