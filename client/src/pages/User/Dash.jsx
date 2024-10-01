import appConstants from "../../constants.js";
import { useDispatch, useSelector } from "react-redux";

function Dash() {
  const auth = useSelector((state) => state.auth);
  return (
    <div className="">
      <div className="px-4">
        <h1 className="mb-8 text-4xl tracking-tight font-extrabold text-gray-800 dark:text-white">
          Welcome {auth.user.username}!
        </h1>
      </div>
    </div>
  );
}

export default Dash;
