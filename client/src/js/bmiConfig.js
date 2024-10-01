const bmiConfig = {
    categories: [
        { label: "Severe Underweight", range: [0, 16] },
        { label: "Moderate Underweight", range: [16, 17] },
        { label: "Mild Underweight", range: [17, 18.5] },
        { label: "Normal", range: [18.5, 25] },
        { label: "Overweight", range: [25, 30] },
        { label: "Obese Class I", range: [30, 35] },
        { label: "Obese Class II", range: [35, 40] },
        { label: "Obese Class III", range: [40, Infinity] },
    ],
};

export default bmiConfig;
