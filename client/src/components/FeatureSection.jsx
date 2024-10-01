const FeatureSection = ({ title, description, features, ctaElement }) => {
  return (
    <section className="text-black dark:bg-gray-900 dark:text-white">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        {/* Section Header */}
        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">{description}</p>
        </div>

        {/* Features Grid */}
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="block rounded-xl border border-gray-300 hover:border-gray-600/75 dark:border-gray-800 p-8 shadow-xl transition dark:hover:border-blue-500/10 dark:hover:shadow-blue-500/10"
            >
              <feature.Icon className="size-10 text-blue-500" />
              <h2 className="mt-4 text-xl font-bold dark:text-white">
                {feature.title}
              </h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        {ctaElement && <div className="mt-12 text-center">{ctaElement}</div>}
      </div>
    </section>
  );
};

export default FeatureSection;
