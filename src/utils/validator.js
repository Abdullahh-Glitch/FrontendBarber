
// Only Numbers
export const isOnlyNumber = (value) => {
  return /^\d+$/.test(value);
};

// Only Letters (with space)
export const isOnlyLetters = (value) => {
  return /^[A-Za-z ]+$/.test(value);
};

// No special characters
export const hasSpecialChars = (value) => {
  return /^[A-Za-z0-9 ]+$/.test(value);
};

// Valid Email
export const isValidEmail = (value) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

// Valid Phone Number (10 digits)
export const isValidPhoneNumber = (value) => {
  return /^\d{10}$/.test(value);
};

// Valid Price (positive number with up to 2 decimal places)
export const isValidPrice = (value) => {
  return /^\d+(\.\d{1,2})?$/.test(value);
};
