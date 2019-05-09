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
          setProperty("Wrong password or username");
          setTimeout(() => setProperty(null), 4000);
        }
      } else {
        setProperty("Unrecognized error happened. Please, contact support.");
      }
    }
  };
};

export default formSubmit;
