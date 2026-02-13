import {
  isOnlyNumber,
  isValidBalance,
} from "../utils/validator";

export const validateForm = (formData, setErrors) => {
  const errors = {};

  // qty
  if (!formData.qty)
    errors.qty = "Qty is required";
  else if (!isOnlyNumber(formData.qty))
    errors.qty = "Qty must be a number";

  // Purchase Price
  if (!formData.purchasePrice)
    errors.purchasePrice = "purchased Price is required";
  else (!isValidBalance(formData.purchasePrice))
    errors.purchasePrice = "`Purchase Price` must be a valid number";


  // Purchase Price
  if (!formData.salesPrice)
    errors.salesPrice = "Sales Price is required";
  else (!isValidBalance(formData.salesPrice))
    errors.salesPrice = "`Sales Price` must be a valid number";

  setErrors(errors);
  return Object.keys(errors).length === 0;
};
