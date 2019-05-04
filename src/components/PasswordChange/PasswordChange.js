/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Form, Text } from "informed";
import { useState, Fragment } from "react";
import { Provider, Subscribe } from "unstated";
import { ButtonStyle, FormLayout, InputStyle } from "../LoginForm/styles.js";
import SubmitArrow from "../LoginForm/submit.svg";
import LoginContainer from "../../store/LoginContainer";

const changePassword = async (formData, loginChangePassword, setResult) => {
  try {
    await loginChangePassword(formData);
    setResult("Successfully changed password");
  } catch (error) {
    const data = error.response.data;
    console.log(data);
    if (data["current_password"]) {
      setResult(data["current_password"][0]);
    }

    if (data["new_password"]) {
      setResult(
        data["new_password"].reduce((accum, value) => (accum += " " + value))
      );
    }
  }
};

const PasswordChange = () => {
  const [result, setResult] = useState(" ");
  return (
    <Provider>
      <Subscribe to={[LoginContainer]}>
        {login => (
          <Fragment>
            <div css={{ margin: 5 }}>{result}</div>
            <Form
              css={FormLayout}
              onSubmit={formData => {
                changePassword(formData, login.changePassword, setResult);
              }}
            >
              <Text
                css={InputStyle}
                type="password"
                field="newPassword"
                placeholder="Your new password"
              />
              <Text
                css={InputStyle}
                type="password"
                field="reNewPassword"
                placeholder="Repeat your new password"
              />
              <Text
                css={InputStyle}
                type="password"
                field="currentPassword"
                placeholder="Your current password for security"
              />
              <button css={{ ...ButtonStyle, width: "auto" }} type="submit">
                <img
                  alt="submit button, arrow"
                  src={SubmitArrow}
                  css={{ display: "block", margin: "auto" }}
                />
              </button>
            </Form>
          </Fragment>
        )}
      </Subscribe>
    </Provider>
  );
};

export default PasswordChange;
