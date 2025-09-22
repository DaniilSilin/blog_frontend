// @ts-ignore
const validateField = (value, value2, validator, errorMessage) => {
  let isValid;
  let error;

  if (value && value2) {
    error = validator(value, value2);
  } else {
    error = validator(value);
  }

  if (error && !value) {
    errorMessage(error);
    isValid = false;
  } else {
    errorMessage(error);
    isValid = true;
  }
  return isValid;
};

export default validateField;
