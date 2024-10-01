import { Link } from "react-router-dom"; // Use appropriate routing library

const HeroSection = ({
  backgroundImage,
  title,
  highlightText,
  description,
  primaryCta,
  secondaryCta,
}) => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-gray-900/75 sm:bg-transparent from-gray-900/95 to-gray-900/25 bg-gradient-to-r"></div>

      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
            {title}
            <strong className="block font-extrabold text-blue-500">
              {highlightText}
            </strong>
          </h1>

          <p className="mt-4 max-w-lg text-white sm:text-xl/relaxed">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-center">
            <Link
              to={primaryCta.link}
              className="block w-full rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
            >
              {primaryCta.text}
            </Link>

            <Link
              to={secondaryCta.link}
              className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-blue-600 shadow hover:text-blue-700 focus:outline-none focus:ring active:text-blue-500 sm:w-auto"
            >
              {secondaryCta.text}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
