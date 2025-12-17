import {
  isOnlyLetters,
  isOnlyNumber,
  hasSpecialChars,
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

  // SKU
  if (!formData.sku?.trim())
    errors.sku = "SKU is required";

  // Unit
  if (!formData.unit?.trim())
    errors.unit = "Unit is required";
  else if (hasSpecialChars(formData.unit))
    errors.unit = "Unit cannot contain special characters";
  else if (!isOnlyLetters(formData.unit))
    errors.unit = "Unit must contain only letters";

  // Uses Per Unit
  if (!isOnlyNumber(formData.usesPerUnit))
    errors.usesPerUnit = "Uses must be a valid number";
  else if (formData.usesPerUnit < 0)
    errors.usesPerUnit = "Uses cannot be negative";

  // Current Stock
  if (!isOnlyNumber(formData.currentStock))
    errors.currentStock = "Current stock must be a valid number";
  else if (formData.currentStock < 0)
    errors.currentStock = "Current stock cannot be negative";

  // Min Stock
  if (!isOnlyNumber(formData.minStock))
    errors.minStock = "Minimum stock must be a valid number";
  else if (formData.minStock < 0)
    errors.minStock = "Minimum stock cannot be negative";

  setErrors(errors);
  return Object.keys(errors).length === 0;
};
