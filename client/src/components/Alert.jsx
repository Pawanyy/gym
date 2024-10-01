const Alert = ({ message, type }) => {
  if (!message) return null;

  const alertClasses = {
    error:
      "flex flex-col gap-2 p-4 text-sm border-red-500 bg-red-100 text-red-700 dark:bg-red-200 dark:text-red-800 rounded-lg",
    success:
      "flex flex-col gap-2 p-4 text-sm border-green-500 bg-green-100 text-green-700 dark:bg-green-200 dark:text-green-800 rounded-lg",
  };

  return <div className={alertClasses[type]}>{message}</div>;
};

export default Alert;
