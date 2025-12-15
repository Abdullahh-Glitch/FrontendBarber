import {isOnlyLetters,isOnlyNumber,hasSpecialChars,isValidPrice} from '../utils/validator'

export const validateForm = (formData, setErrors) => {
    const newErrors = {};

    if (!formData.categoryId) newErrors.categoryId = "Category is required";
    else if (!isOnlyNumber(formData.categoryId.toString())) newErrors.categoryId = "Category must be a valid number";

    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (!hasSpecialChars(formData.name)) newErrors.name = "Name can not contain special characters";

    if (!formData.sku.trim()) newErrors.sku = "SKU is required";
    else if (!hasSpecialChars(formData.sku)) newErrors.sku = "SKU can not contain special characters";

    if (!formData.unit.trim()) newErrors.unit = "Unit is required";
    else if (!hasSpecialChars(formData.unit)) newErrors.unit = "Unit can not contain special characters";
    else if (!isOnlyLetters(formData.unit)) newErrors.unit = "Unit must contain only letters";

    if (formData.usesPerUnit < 0) newErrors.usesPerUnit = "Uses cannot be negative";
    else if (!isOnlyNumber(formData.usesPerUnit.toString())) newErrors.usesPerUnit = "Uses must be a valid number";

    if (formData.price < 0) newErrors.price = "Price cannot be negative";
    else if (!isValidPrice(formData.price.toString())) newErrors.price = "Price must be a valid number";

    if (formData.currentStock < 0) newErrors.currentStock = "Current stock cannot be negative";
    else if (!isOnlyNumber(formData.currentStock.toString())) newErrors.currentStock = "Current stock must be a valid number";

    if (formData.minStock < 0) newErrors.minStock = "Minimum stock cannot be negative";
    else if (!isOnlyNumber(formData.minStock.toString())) newErrors.minStock = "Minimum stock must be a valid number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };