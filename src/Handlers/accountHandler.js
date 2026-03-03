import {
  isOnlyNumber,
  hasSpecialChars,
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
  else if (hasSpecialChars(formData.name))
    errors.name = "Name cannot contain special characters";

  // Company Name
  if (formData.categoryId === 2 && !formData.companyName?.trim())
    errors.companyName = "Company Name is required";
  else if (hasSpecialChars(formData.companyName))
    errors.companyName = "Company Name cannot contain special characters";

  // Mobile No
  if(hasSpecialChars(formData.mobileNo))
    errors.mobileNo = "Mobile Number cannot contain special characters";
  else if (formData.mobileNo !== "" && !isOnlyNumber(formData.mobileNo))
    errors.mobileNo = "Mobile Number must contain only numbers";
  else if (formData.mobileNo.length > 0 && formData.mobileNo.length !== 11)
    errors.mobileNo = "Mobile Number must be 11 digits";

  // Phone No
  if(hasSpecialChars(formData.phoneNo))
    errors.phoneNo = "Phone Number cannot contain special characters";
  else if (formData.phoneNo !== "" && !isOnlyNumber(formData.phoneNo))
    errors.phoneNo = "Phone Number must contain only numbers";
  else if (formData.phoneNo.length > 0 && formData.phoneNo.length !== 11)
    errors.phoneNo = "Phone Number must be 11 digits";

  // Opening Balance
  if (!isValidBalance(formData.openingBalance))
    errors.openingBalance = "Opening Balance must be a valid number";

  setErrors(errors);
  return Object.keys(errors).length === 0;
};
