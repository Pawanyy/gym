import { Link } from "react-router-dom";
import aboutImage from "../assets/about.jpg?format=webp&w=1440";
import { HiChevronDown } from "react-icons/hi2";
import FAQSection from "./../components/FaqSection";
import { motion as m } from "framer-motion";
import { pageTransition, pageVariants } from "./../js/animations.js";

function About() {
  const FAQs = [
    {
      title: "How does the workout plan generator work?",
      content: `Our generator uses a combination of user input and advanced
                  algorithms to create customized workout plans. Users fill out
                  a simple questionnaire about their fitness goals, preferences,
                  and experience level, and we generate a plan that suits their
                  needs.`,
    },
    {
      title: "Can I modify my workout plan?",
      content: `Our generator uses a combination of user input and advanced
                  algorithms to create customized workout plans. Users fill out
                  a simple questionnaire about their fitness goals, preferences,
                  and experience level, and we generate a plan that suits their
                  needs.`,
    },
    {
      title: "How can I contact support if I need help?",
      content: `Our generator uses a combination of user input and advanced
                  algorithms to create customized workout plans. Users fill out
                  a simple questionnaire about their fitness goals, preferences,
                  and experience level, and we generate a plan that suits their
                  needs.`,
    },
    {
      title: "Are there any plans available?",
      content: `Our generator uses a combination of user input and advanced
                  algorithms to create customized workout plans. Users fill out
                  a simple questionnaire about their fitness goals, preferences,
                  and experience level, and we generate a plan that suits their
                  needs.`,
    },
  ];

  return (
    <m.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="py-8 px-4 mx-auto max-w-screen">
        <h1 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-800 dark:text-white">
          About Us
        </h1>

        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
          Forge Your Path to Fitness.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <img src={aboutImage} className="rounded-3xl" />
          <p className="mb-8 lg:mb-16 font-light text-gray-500 dark:text-gray-400 sm:text-xl lg:text-lg">
            We believe that every individual deserves a workout plan tailored to
            their unique fitness goals and lifestyle. Our mission is to provide
            you with the tools and guidance you need to achieve your best self,
            whether you're just starting your fitness journey or looking to push
            past a plateau.
            <br />
            <br />
            With our intelligent workout plan generator, we combine cutting-edge
            technology with expert knowledge to deliver personalized exercise
            routines that suit your body, your goals, and your schedule. We
            understand that everyone’s journey is different, which is why we
            offer adaptable plans that evolve as you do.
            <br />
            <br />
            <Link to="/about">
              <button className="px-4 py-2 rounded-xl font-medium text-base border-2 border-gray-300 text-black dark:text-white hover:bg-blue-600 hover:text-white">
                Get In Touch
              </button>
            </Link>
          </p>
        </div>

        <div className="mt-8">
          <FAQSection faqs={FAQs} />
        </div>
      </div>
    </m.div>
  );
}

export default About;
