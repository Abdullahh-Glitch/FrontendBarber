import {isOnlyNumber} from '../utils/validator'


export const validate = (value, setErrors) => {
    let newErrors = "";

    if (value <= 0) newErrors = "UsesCount cannot be zero or negative";
    else if (!isOnlyNumber(value)) newErrors = "usesCount must be a valid number";

    setErrors(newErrors);
    return newErrors === ""? true : false;
  };
