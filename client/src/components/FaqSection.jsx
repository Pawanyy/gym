import { HiChevronDown } from "react-icons/hi";

const FAQSection = ({ faqs }) => {
  return (
    faqs && (
      <>
        <h2 className="mb-4 text-2xl font-semibold text-center text-gray-600 dark:text-white">
          FAQs
        </h2>
        <div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                className="group [&_summary::-webkit-details-marker]:hidden"
                key={index}
              >
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-100 hover:bg-gray-300 p-4 text-gray-900 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-900">
                  <h2 className="font-medium">
                    {index + 1}. {faq.title}
                  </h2>
                  <HiChevronDown className="size-6 shrink-0 transition duration-300 group-open:-rotate-180" />
                </summary>

                <p className="mt-4 px-4 leading-relaxed text-gray-700 dark:text-gray-200">
                  {faq.content}
                </p>
              </details>
            ))}
          </div>
        </div>
      </>
    )
  );
};

export default FAQSection;
