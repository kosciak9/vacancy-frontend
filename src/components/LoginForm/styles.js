const FormLayout = {
  display: "flex",
  flexDirection: "column"
};

const InputStyle = {
  width: 300,
  height: 40,
  backgroundColor: "rgba(217, 217, 217, 0.3)",
  border: "none",
  borderBottom: "3px solid #F9AB00",
  color: "#000",
  marginBottom: 20,
  padding: "9px 0 9px 10px",
  "::placeholder": {
    color: "rgba(0, 0, 0, 0.75)"
  }
};

const ButtonStyle = {
  width: 90,
  height: 40,
  backgroundColor: "#76A81F",
  border: "none"
};

const FacebookButtonStyle = {
  backgroundColor: "#3B5998"
};

const TwitterButtonStyle = {
  backgroundColor: "#55ACEE"
};

export {
  InputStyle,
  ButtonStyle,
  FacebookButtonStyle,
  TwitterButtonStyle,
  FormLayout
};
