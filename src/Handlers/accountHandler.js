import {
  isOnlyNumber,
  isValidBalance,
} from "../utils/validator";

export const validateForm = (formData, setErrors) => {
  const errors = {};

  // Category
  if (!formData.categoryId)
    errors.categoryId = "Category is required";
  else if (!isOnlyNumber(formData.categoryId))
    errors.categoryId = "Category must be a number";

  // Name
  if (!formData.name?.trim())
    errors.name = "Name is required";

  // Company Name
  if (formData.categoryId === 2 && !formData.companyName?.trim())
    errors.companyName = "Company Name is required";

  // Opening Balance
  if (!isValidBalance(formData.openingBalance))
    errors.openingBalance = "Opening Balance must be a valid number";

  setErrors(errors);
  return Object.keys(errors).length === 0;
};
