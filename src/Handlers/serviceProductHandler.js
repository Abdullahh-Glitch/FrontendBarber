import {isOnlyNumber} from '../utils/validator'


export const validateUsesCount = (value) => {
  console.log(value);

  if (value <= 0) return  "UsesCount cannot be zero or negative";
  if (!isOnlyNumber(value)) return  "UsesCount must be a valid number";
  return  ""; // no error
};