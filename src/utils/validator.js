// Only Numbers (integer)
export const isOnlyNumber = (value) => {
  return /^\d+$/.test(String(value));
};

// Only Letters (with spaces)
export const isOnlyLetters = (value) => {
  return /^[A-Za-z ]+$/.test(String(value));
};

// Has Special Characters
export const hasSpecialChars = (value) => {
  return /[^A-Za-z0-9 ]/.test(String(value));
};

// Valid Email
export const isValidEmail = (value) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value));
};

// Valid Phone Number (10 digits)
export const isValidPhoneNumber = (value) => {
  return /^\d{10}$/.test(String(value));
};

// Valid Price (positive, up to 2 decimals)
export const isValidPrice = (value) => {
  return /^\d+(\.\d{1,2})?$/.test(String(value));
};
