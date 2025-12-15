import {isOnlyNumber,hasSpecialChars,isValidPrice} from '../utils/validator'


export const validateForm = (formData, setErrors) => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (!hasSpecialChars(formData.name)) newErrors.name = "Name can not contain special characters";

    if (formData.price < 0) newErrors.price = "Price cannot be negative";
    else if (!isOnlyNumber(formData.price.toString())) newErrors.price = "Price must be a valid number";
    else if (!isValidPrice(formData.price.toString())) newErrors.price = "Price must be a valid number";

    if (formData.durationMinutes < 0) newErrors.duration = "Duration cannot be negative";
    else if (!isOnlyNumber(formData.durationMinutes.toString())) newErrors.duration = "Duration must be a valid number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
