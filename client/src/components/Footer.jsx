import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import siteLogo from "../assets/logo.png?format=webp";

function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t-2 border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-screen-xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-32">
          <div className="mx-auto lg:ml-0 max-w-sm lg:max-w-none">
            <img src={siteLogo} className="w-2/5 mx-auto lg:ml-0" alt="Logo" />
            <p className="mt-4 text-center text-gray-500 lg:text-left lg:text-lg dark:text-gray-400">
              Designed and built with all the ❤️ in the world.
              <br />
              Currently v0.0.1.
            </p>

            <div className="mt-6 flex justify-center gap-4 lg:justify-start">
              <a
                className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                href="#"
                target="_blank"
                rel="noreferrer"
              >
                <span className="sr-only"> Facebook </span>

                <FaFacebook className="size-6" />
              </a>

              <a
                className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                href="#"
                target="_blank"
                rel="noreferrer"
              >
                <span className="sr-only"> Instagram </span>

                <FaInstagram className="size-6" />
              </a>

              <a
                className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                href="#"
                target="_blank"
                rel="noreferrer"
              >
                <span className="sr-only"> Twitter </span>

                <FaTwitter className="size-6" />
              </a>

              <a
                className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                href="#"
                target="_blank"
                rel="noreferrer"
              >
                <span className="sr-only"> WhatsApp </span>

                <FaWhatsapp className="size-6" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 text-center lg:grid-cols-3 lg:text-left">
            <div>
              <strong className="font-medium text-gray-900 dark:text-white">
                Main
              </strong>

              <ul className="mt-6 space-y-1">
                <li>
                  <div className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75">
                    <Link to="/">Home</Link>
                  </div>
                </li>
                <li>
                  <div className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75">
                    <Link to="/services">Services</Link>
                  </div>
                </li>
                <li>
                  <div className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75">
                    <Link to="/about">About</Link>
                  </div>
                </li>
                <li>
                  <div className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75">
                    <Link to="/contact">Contact</Link>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <strong className="font-medium text-gray-900 dark:text-white">
                Other
              </strong>

              <ul className="mt-6 space-y-1">
                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                    href="#"
                  >
                    Terms of Service
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                    href="#"
                  >
                    Privacy Policy
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                    href="#"
                  >
                    Legal Policy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <strong className="font-medium text-gray-900 dark:text-white">
                Support
              </strong>

              <ul className="mt-6 space-y-1">
                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                    href="#"
                  >
                    Contact
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75 dark:text-white dark:hover:text-white/75"
                    href="#"
                  >
                    Live Chat
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t-2 border-gray-200 pt-8 dark:border-gray-800">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Copyright &copy; {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
