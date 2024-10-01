// ConfirmModal.jsx
import React from "react";

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="alert"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="rounded-xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-start gap-4">
          <span className="text-green-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>

          <div className="flex-1">
            <strong className="block font-medium text-gray-900 dark:text-white">
              {title}
            </strong>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-200">
              {message}
            </p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={onConfirm}
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
              >
                <span className="text-sm">{confirmText}</span>
              </button>
              <button
                onClick={onClose}
                className="block rounded-lg px-4 py-2 text-gray-700 transition hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                <span className="text-sm">{cancelText}</span>
              </button>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-gray-500 transition hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-500"
          >
            <span className="sr-only">Dismiss popup</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
