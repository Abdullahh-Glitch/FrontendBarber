

const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;

export const validateForm = (formData, setErrors) => {
    const newErrors = {};

    if (!formData.categoryId) newErrors.categoryId = "Category is required";
    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (specialCharPattern.test(formData.name))
      newErrors.name = "Name can not contain special characters";
    if (!formData.sku.trim()) newErrors.sku = "SKU is required";
    if (!formData.unit.trim()) newErrors.unit = "Unit is required";
    if (formData.usesPerUnit < 0)
      newErrors.currentStock = "Uses cannot be negative";
    if (formData.currentStock < 0)
      newErrors.currentStock = "Current stock cannot be negative";
    if (formData.minStock < 0)
      newErrors.minStock = "Minimum stock cannot be negative";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };