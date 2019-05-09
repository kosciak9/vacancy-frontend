const validate = value => {
  return !value || value.length < 3
    ? "Field needs to be at least 4 characters long"
    : undefined;
};

export default validate;
