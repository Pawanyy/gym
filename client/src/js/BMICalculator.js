import bmiConfig from './bmiConfig.js';

export default class BMICalculator {
    constructor() {
        this.height = 0; // in cm
        this.weight = 0; // in kg
        this.age = 0; // in years
        this.gender = null; // 'male' or 'female'
        this.bmiConfig = bmiConfig; // Importing the BMI config
    }

    // Method to set height
    setHeight(value, unit = "cm") {
        console.log(value, unit);
        if (unit === "ft/in") {
            const [ft, inInches] = value.split("/").map(Number);

            if (isNaN(ft) || isNaN(inInches) || ft < 0 || inInches < 0) {
                throw new Error("Invalid height input. Feet and inches must be non-negative numbers.");
            }
            this.height = (ft * 30.48) + (inInches * 2.54); // Convert to cm
        } else {
            const heightCm = parseFloat(value);
            if (isNaN(heightCm) || heightCm <= 0) {
                throw new Error("Invalid height input. Height must be a positive number.");
            }
            this.height = heightCm; // Assume cm
        }
    }

    // Method to set weight
    setWeight(value, unit = "kg") {
        const weightValue = parseFloat(value);
        if (isNaN(weightValue) || weightValue <= 0) {
            throw new Error("Invalid weight input. Weight must be a positive number.");
        }
        this.weight = unit === "lb" ? weightValue / 2.205
            : weightValue; // Convert to kg

        console.log(this.weight, unit)
    }

    // Method to set age using either years or a date of birth (DOB)
    setAge(value) {
        if (typeof value === 'string' && !isNaN(Date.parse(value))) {
            // If value is a date string, calculate age
            const dob = new Date(value);
            const today = new Date();
            this.age = today.getFullYear() - dob.getFullYear();
            const monthDiff = today.getMonth() - dob.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
                this.age--;
            }
        } else {
            const ageValue = parseInt(value, 10);
            if (isNaN(ageValue) || ageValue <= 0) {
                throw new Error("Invalid age input. Age must be a positive integer.");
            }
            this.age = ageValue;
        }
    }

    // Method to set gender
    setGender(value) {
        const genderValue = value.toLowerCase();
        if (genderValue !== "male" && genderValue !== "female") {
            throw new Error("Invalid gender input. Gender must be either 'male' or 'female'.");
        }
        this.gender = genderValue;
    }

    // Method to calculate BMI
    calculateBMI() {
        if (this.height <= 0 || this.weight <= 0) {
            throw new Error("Invalid input. Height and weight must be greater than zero.");
        }
        return (this.weight / ((this.height / 100) ** 2)).toFixed(2); // BMI formula
    }

    // Method to get BMI category based on configuration
    getBMICategory(bmi) {
        for (const category of this.bmiConfig.categories) {
            const [min, max] = category.range;
            if (bmi >= min && bmi < max) {
                return category.label;
            }
        }
        return "Invalid BMI"; // Fallback for unexpected values
    }

    // Method to get health advice based on age and gender
    getHealthAdvice() {
        if (this.age < 18) {
            return "Consult a healthcare provider for age-appropriate advice.";
        }
        if (this.gender === "male") {
            return "Men should aim for a healthy lifestyle, including regular exercise and a balanced diet.";
        } else if (this.gender === "female") {
            return "Women should ensure they maintain a healthy diet and engage in physical activity.";
        }
        return "Consider a balanced lifestyle regardless of gender.";
    }
}