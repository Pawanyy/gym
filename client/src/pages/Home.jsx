import { Link } from "react-router-dom";
import {
  HiOutlineAcademicCap,
  HiOutlineClock,
  HiOutlineUserGroup,
  HiOutlineHeart,
  HiOutlineChartBar,
  HiOutlineChatAlt2,
} from "react-icons/hi";
import FeatureSection from "../components/FeatureSection";
import HeroSection from "./../components/HeroSection ";
import { motion as m } from "framer-motion";
import { pageTransition, pageVariants } from "./../js/animations.js";

function Home() {
  const featuresData = [
    {
      Icon: HiOutlineAcademicCap,
      title: "Personalized Plans",
      description:
        "Get customized workout plans tailored to your fitness level and goals.",
    },
    {
      Icon: HiOutlineClock,
      title: "Flexible Scheduling",
      description:
        "Plan your workouts around your schedule with our flexible calendar.",
    },
    {
      Icon: HiOutlineUserGroup,
      title: "Community Support",
      description:
        "Join a community of fitness enthusiasts and share your progress.",
    },
    {
      Icon: HiOutlineHeart,
      title: "Health Tracking",
      description:
        "Monitor your health metrics and track your progress over time.",
    },
    {
      Icon: HiOutlineChartBar,
      title: "Performance Insights",
      description:
        "Analyze your workouts and get insights to improve your performance.",
    },
    {
      Icon: HiOutlineChatAlt2,
      title: "Expert Guidance",
      description:
        "Access tips and advice from certified trainers to optimize your workouts.",
    },
  ];

  return (
    <m.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <HeroSection
        backgroundImage="https://images.unsplash.com/photo-1706029831405-619b27e3260c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Let us find your"
        highlightText="Perfect Gym Plan."
        description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus numquam ea!"
        primaryCta={{ text: "Get Started", link: "/register" }}
        secondaryCta={{ text: "Learn More", link: "/about" }}
      />
      <FeatureSection
        title="Features"
        description="Discover the key features of our gym workout planner that can help you achieve your fitness goals."
        features={featuresData}
        ctaElement={
          <div className="hidden inline-block rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring focus:ring-yellow-400">
            Get Started Today
          </div>
        }
      />
    </m.div>
  );
}

export default Home;
