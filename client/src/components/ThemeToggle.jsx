import { HiSun, HiMoon } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "./../store/themeSlice.js";

function ThemeToggle() {
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className="inline-flex items-center overflow-hidden rounded-full bg-white dark:border-gray-800 dark:bg-gray-900 border-2 border-white hover:border-gray-200 dark:hover:border-gray-600">
      <button
        className="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-200"
        onClick={handleThemeToggle}
      >
        {theme === "dark" ? (
          <HiMoon className="size-6" />
        ) : (
          <HiSun className="size-6" />
        )}
      </button>
    </div>
  );
}

export default ThemeToggle;
