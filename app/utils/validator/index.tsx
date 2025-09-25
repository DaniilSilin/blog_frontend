const validateField = (
  value: string,
  value2: Record<string, boolean> | undefined,
  validator: (value: string, value2?: Record<string, any>) => string,
  setError: (value: string) => void,
) => {
  let isValid;
  let error;

  if (value && value2) {
    error = validator(value, value2);
  } else {
    error = validator(value);
  }

  if (error || !value) {
    setError(error);
    isValid = false;
  } else {
    setError("");
    isValid = true;
  }
  return isValid;
};

export default validateField;
