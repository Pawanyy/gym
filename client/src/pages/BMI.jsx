import { useEffect, useState } from "react";
import { FaMale, FaFemale } from "react-icons/fa";
import BMICalculator from "./../js/BMICalculator.js";
import Alert from "../components/Alert.jsx";
import bmiConfig from "../js/bmiConfig.js";
import { motion as m } from "framer-motion";
import { pageTransition, pageVariants } from "./../js/animations.js";

const constants = {
  CM: "cm",
  KG: "kg",
  YEARS: "years",
  DATE: "date",
  LBS: "lb",
  FOOT: "ft",
  INCH: "in",
};

const BMI_SVG = ({ bmi, className }) => {
  const safeBmi = Math.min(Math.max(bmi, 0), 43);

  const finalAngle = (safeBmi / 43) * 180;

  const [currentAngle, setCurrentAngle] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setCurrentAngle(finalAngle);
    setAnimate(true);
    console.log("Trigger Animation");
    const timer = setTimeout(() => setAnimate(false), 2000);
    return () => clearTimeout(timer);
  }, [finalAngle]);

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="300px"
      height="163px"
      viewBox="0 0 300 163"
    >
      <g
        transform="translate(18,18)"
        style={{ fontFamily: "arial,helvetica,sans-serif", fontSize: "12px" }}
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="0"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7"></polygon>
          </marker>
          <path
            id="curvetxt1"
            d="M-4 140 A140 140, 0, 0, 1, 284 140"
            style={{ fill: "none" }}
          ></path>
          <path
            id="curvetxt2"
            d="M33 43.6 A140 140, 0, 0, 1, 280 140"
            style={{ fill: "none" }}
          ></path>
          <path
            id="curvetxt3"
            d="M95 3 A140 140, 0, 0, 1, 284 140"
            style={{ fill: "none" }}
          ></path>
          <path
            id="curvetxt4"
            d="M235.4 33 A140 140, 0, 0, 1, 284 140"
            style={{ fill: "none" }}
          ></path>
        </defs>
        <path
          d="M0 140 A140 140, 0, 0, 1, 6.9 96.7 L140 140 Z"
          fill="#bc2020"
        ></path>
        <path
          d="M6.9 96.7 A140 140, 0, 0, 1, 12.1 83.1 L140 140 Z"
          fill="#d38888"
        ></path>
        <path
          d="M12.1 83.1 A140 140, 0, 0, 1, 22.6 63.8 L140 140 Z"
          fill="#ffe400"
        ></path>
        <path
          d="M22.6 63.8 A140 140, 0, 0, 1, 96.7 6.9 L140 140 Z"
          fill="#008137"
        ></path>
        <path
          d="M96.7 6.9 A140 140, 0, 0, 1, 169.1 3.1 L140 140 Z"
          fill="#ffe400"
        ></path>
        <path
          d="M169.1 3.1 A140 140, 0, 0, 1, 233.7 36 L140 140 Z"
          fill="#d38888"
        ></path>
        <path
          d="M233.7 36 A140 140, 0, 0, 1, 273.1 96.7 L140 140 Z"
          fill="#bc2020"
        ></path>
        <path
          d="M273.1 96.7 A140 140, 0, 0, 1, 280 140 L140 140 Z"
          fill="#8a0101"
        ></path>
        <path d="M45 140 A90 90, 0, 0, 1, 230 140 Z" fill="#fff"></path>
        <circle cx="140" cy="140" r="5" fill="#666"></circle>
        <g style={{ paintOrder: "stroke", stroke: "#fff", strokeWidth: "2px" }}>
          <text x="25" y="111" transform="rotate(-72, 25, 111)">
            16
          </text>
          <text x="30" y="96" transform="rotate(-66, 30, 96)">
            17
          </text>
          <text x="35" y="83" transform="rotate(-57, 35, 83)">
            18.5
          </text>
          <text x="97" y="29" transform="rotate(-18, 97, 29)">
            25
          </text>
          <text x="157" y="20" transform="rotate(12, 157, 20)">
            30
          </text>
          <text x="214" y="45" transform="rotate(42, 214, 45)">
            35
          </text>
          <text x="252" y="95" transform="rotate(72, 252, 95)">
            40
          </text>
        </g>
        <g style={{ fontSize: "14px" }}>
          <text>
            <textPath xlinkHref="#curvetxt1">Underweight</textPath>
          </text>
          <text>
            <textPath xlinkHref="#curvetxt2">Normal</textPath>
          </text>
          <text>
            <textPath xlinkHref="#curvetxt3">Overweight</textPath>
          </text>
          <text>
            <textPath xlinkHref="#curvetxt4">Obesity</textPath>
          </text>
        </g>
        <line
          x1="140"
          y1="140"
          x2="65"
          y2="140"
          stroke="#666"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from={`0 140 140`}
            to={`${currentAngle} 140 140`}
            dur="1.5s"
            fill="freeze"
            begin={animate ? "indefinite" : undefined}
          />
        </line>
        <text
          x="67"
          y="120"
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            fill: "#000",
          }}
        >
          BMI = {bmi}
        </text>
      </g>
    </svg>
  );
};

const BMI = () => {
  const [isMale, setIsMale] = useState(true);
  const [ageUnit, setAgeUnit] = useState(constants.YEARS);
  const [heightUnit, setHeightUnit] = useState(constants.CM);
  const [weightUnit, setWeightUnit] = useState(constants.KG);

  const [bmiValue, setBmiValue] = useState(false);

  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const [age, setAge] = useState({
    [constants.DATE]: "",
    [constants.YEARS]: "",
  });

  const [height, setHeight] = useState({
    [constants.CM]: "",
    [constants.FOOT]: "",
    [constants.INCH]: "",
  });
  const [weight, setWeight] = useState({
    [constants.KG]: "",
    [constants.LBS]: "",
  });

  const handleAgeChange = (event) => {
    setAge({ ...age, [ageUnit]: event.target.value });
  };

  const handleWeightChange = (event) => {
    setWeight({ ...weight, [weightUnit]: event.target.value });
  };

  const handleHeightChange = (event, unit) => {
    setHeight({ ...height, [unit]: event.target.value });
  };

  const handleAgeUnitChange = (event) => {
    setAgeUnit(event.target.value);
  };

  const handleWeightUnitChange = (event) => {
    setWeightUnit(event.target.value);
  };

  const handleHeightUnitChange = (event) => {
    setHeightUnit(event.target.value);
  };

  const handleGenderToggle = (event) => {
    setIsMale(event.target.checked);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage(false);
    setErrorMessage(false);
    console.log("calculating BMI: ");
    try {
      const bmiCalculator = new BMICalculator();

      bmiCalculator.setAge(age[ageUnit]);
      bmiCalculator.setGender(isMale ? "male" : "female");
      bmiCalculator.setWeight(weight[weightUnit], weightUnit);
      bmiCalculator.setHeight(
        heightUnit === constants.CM
          ? height[heightUnit]
          : `${height[constants.FOOT]}/${height[constants.INCH]}`,
        heightUnit === constants.CM
          ? constants.CM
          : `${constants.FOOT}/${constants.INCH}`
      );

      const bmiResult = bmiCalculator.calculateBMI();

      setSuccessMessage("Your BMI: " + bmiResult);
      setBmiValue(bmiResult);
      console.log("bmiResult: ", bmiResult);
    } catch (error) {
      setErrorMessage(error.message);
      console.error(error);
    }
  };

  return (
    <m.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="services py-20"
    >
      <h1 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-800 dark:text-white">
        BMI Calculator
      </h1>
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="md:px-4 mx-auto max-w-screen-sm lg:px-20">
          <p className="mb-12">
            The Body Mass Index (BMI) Calculator can be used to calculate BMI
            value and corresponding weight status while taking age into
            consideration.
          </p>
          <form className="space-y-4 md:px-4" onSubmit={handleFormSubmit}>
            <Alert message={errorMessage} type="error" />
            <Alert message={successMessage} type="success" />
            <div>
              <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Gender
              </div>
              <label
                htmlFor="genderToggle"
                className="relative inline-block h-10 w-20 cursor-pointer rounded-full bg-gray-200 dark:bg-gray-300 transition-colors [-webkit-tap-highlight-color:_transparent] peer"
              >
                <input
                  type="checkbox"
                  id="genderToggle"
                  className="sr-only peer"
                  checked={isMale}
                  onChange={handleGenderToggle}
                />

                <span className="absolute inset-y-0 left-1 z-10 m-1 inline-flex w-8 h-8 items-center justify-center rounded-full transition-colors text-gray-600 peer-checked:text-white">
                  <FaMale className="w-5 h-5" />
                </span>

                <span className="absolute inset-y-0 right-1 z-10 m-1 inline-flex w-8 h-8 items-center justify-center rounded-full transition-colors text-white peer-checked:text-gray-600">
                  <FaFemale className="w-5 h-5" />
                </span>

                <span className="absolute inset-y-0 start-8 z-1 m-1 w-10 h-8 inline-flex size-8 items-center justify-center rounded-full text-white transition-all peer-checked:start-0 bg-pink-600 peer-checked:bg-blue-600"></span>
              </label>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Age
              </label>
              <div className="flex">
                <input
                  type={ageUnit === constants.YEARS ? "number" : "date"}
                  onChange={handleAgeChange}
                  value={
                    ageUnit === constants.YEARS
                      ? age[constants.YEARS]
                      : age[constants.DATE]
                  }
                  min={ageUnit === constants.YEARS ? 0 : ""}
                  max={
                    ageUnit === constants.YEARS
                      ? 999
                      : new Date().toISOString().split("T")[0]
                  }
                  step={ageUnit === constants.YEARS ? 1 : undefined}
                  placeholder={ageUnit}
                  className={`shadow-sm bg-gray-50 rounded-l-lg border border-r-0 border-gray-300 dark:border-gray-600 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light`}
                />
                <select
                  className="w-28 rounded-r-lg p-2.5 border border-gray-300 text-gray-700 sm:text-sm"
                  onChange={handleAgeUnitChange}
                >
                  <option value={constants.YEARS}>Years</option>
                  <option value={constants.DATE}>DOB</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Height
              </label>
              <div className="flex">
                {heightUnit === constants.CM ? (
                  <input
                    type="number"
                    placeholder={constants.CM}
                    onChange={(e) => handleHeightChange(e, constants.CM)}
                    value={height.cm}
                    min={0}
                    max={999}
                    className={`shadow-sm bg-gray-50 rounded-l-lg border border-r-0 border-gray-300 dark:border-gray-600 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light`}
                  />
                ) : (
                  <div className="flex w-full">
                    <input
                      type="number"
                      placeholder="foot"
                      onChange={(e) => handleHeightChange(e, constants.FOOT)}
                      value={height.ft}
                      min={0}
                      max={100}
                      step={1}
                      className={`shadow-sm bg-gray-50 rounded-l-lg border border-r-0 border-gray-300 dark:border-gray-600 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light`}
                    />
                    <input
                      type="number"
                      placeholder="inches"
                      onChange={(e) => handleHeightChange(e, constants.INCH)}
                      value={height.in}
                      min={0}
                      max={12}
                      step={1}
                      className={`shadow-sm bg-gray-50 border border-r-0 border-gray-300 dark:border-gray-600 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light`}
                    />
                  </div>
                )}

                <select
                  className="w-28 rounded-r-lg p-2.5 border border-gray-300 text-gray-700 sm:text-sm"
                  onChange={handleHeightUnitChange}
                >
                  <option value={constants.CM}>CM</option>
                  <option value={constants.FOOT}>FT/IN</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Weight
              </label>
              <div className="flex">
                <input
                  type="number"
                  placeholder={weightUnit}
                  onChange={handleWeightChange}
                  value={
                    weightUnit === constants.KG
                      ? weight[constants.KG]
                      : weight[constants.LBS]
                  }
                  min={0}
                  max={99999}
                  className={`shadow-sm bg-gray-50 rounded-l-lg border border-r-0 border-gray-300 dark:border-gray-600 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light`}
                />
                <select
                  className="w-28 rounded-r-lg p-2.5 border border-gray-300 text-gray-700 sm:text-sm"
                  onChange={handleWeightUnitChange}
                >
                  <option value={constants.KG}>KG</option>
                  <option value={constants.LBS}>LB</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="py-3 px-5 text-sm w-full font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800"
            >
              Calculate
            </button>
          </form>
          {bmiValue && (
            <div className="py-4 mt-8">
              <div>
                <h1 className="mb-4 text-2xl text-green-700 dark:text-green-400 font-bold">
                  Result: {bmiValue}
                  <span>
                    kg/m
                    <sup>2</sup>
                  </span>
                  <span className="ms-3 dark:text-white text-gray-700">
                    (
                    {
                      bmiConfig.categories.find(
                        (v) => bmiValue >= v.range[0] && bmiValue <= v.range[1]
                      )?.label
                    }
                    )
                  </span>
                </h1>
                <BMI_SVG className="mx-auto dark:bg-white" bmi={bmiValue} />
              </div>
              <div className="mt-8 space-y-6">
                <h1 className="text-xl text-gray-800 dark:text-gray-200 font-bold">
                  BMI introduction
                </h1>
                <p>
                  BMI is a measurement of a person's leanness or corpulence
                  based on their height and weight, and is intended to quantify
                  tissue mass. It is widely used as a general indicator of
                  whether a person has a healthy body weight for their height.
                  Specifically, the value obtained from the calculation of BMI
                  is used to categorize whether a person is underweight, normal
                  weight, overweight, or obese depending on what range the value
                  falls between. These ranges of BMI vary based on factors such
                  as region and age, and are sometimes further divided into
                  subcategories such as severely underweight or very severely
                  obese. Being overweight or underweight can have significant
                  health effects, so while BMI is an imperfect measure of
                  healthy body weight, it is a useful indicator of whether any
                  additional testing or action is required. Refer to the table
                  below to see the different categories based on BMI that are
                  used by the calculator.
                </p>
                <h1 className="text-xl text-gray-800 dark:text-gray-200 font-bold">
                  BMI table
                </h1>
                <p>
                  This is the World Health Organization's (WHO) recommended body
                  weight based on BMI values..
                </p>
                <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                  <table className="table-custom">
                    <thead>
                      <tr>
                        <th>Classification</th>
                        <th>BMI range - kg/m2</th>
                      </tr>
                    </thead>

                    <tbody>
                      {bmiConfig.categories.map((category, index) => {
                        return (
                          <tr key={index}>
                            <td>{category.label}</td>
                            <td>
                              {`${category.range[0]} - ${category.range[1]}`}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </m.div>
  );
};

export default BMI;
