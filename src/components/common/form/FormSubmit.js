const UNKNOWN_PASSWORD = "Wrong password or username.";
const UNKNOWN_ERROR = "Unrecognized error happened. Please, contact support.";

const formSubmit = (submitMethod, setProperty) => {
  return async formData => {
    try {
      await submitMethod(formData);
      setProperty(null);
    } catch (error) {
      const data = error.response.data;
      if (data.hasOwnProperty("non_field_errors")) {
        const loginError = data["non_field_errors"][0];
        if (loginError === "Unable to log in with provided credentials.") {
          setProperty(UNKNOWN_PASSWORD);
        } else {
          setProperty(UNKNOWN_ERROR);
        }
      } else {
        setProperty(UNKNOWN_ERROR);
      }
    } finally {
      setTimeout(() => setProperty(null), 4000);
    }
  };
};

export default formSubmit;
