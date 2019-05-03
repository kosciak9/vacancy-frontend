/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Form, Text } from "informed";
import FacebookLogo from "./facebook.svg";
import {
  ButtonStyle,
  FacebookButtonStyle,
  FormLayout,
  InputStyle,
  TwitterButtonStyle
} from "./styles";
import SubmitArrow from "./submit.svg";
import TwitterLogo from "./twitter.svg";
import LoginContainer from "../../store/LoginContainer";
import { Provider, Subscribe } from "unstated";

const LogicForm = () => {
  return (
    <Provider>
      <Subscribe to={[LoginContainer]}>
        {login => (
          <Form css={FormLayout} onSubmit={login.userLogin}>
            <Text css={InputStyle} field="username" placeholder="username" />
            <Text
              css={InputStyle}
              field="password"
              type="password"
              placeholder="password"
            />
            <div css={{ display: "flex", justifyContent: "space-between" }}>
              {
                // TODO: separate buttons into components
              }
              <button css={{ ...ButtonStyle, ...TwitterButtonStyle }}>
                <img
                  alt="twitter logo"
                  src={TwitterLogo}
                  css={{ display: "block", margin: "auto" }}
                />
              </button>
              <button css={{ ...ButtonStyle, ...FacebookButtonStyle }}>
                <img
                  alt="facebook logo"
                  src={FacebookLogo}
                  css={{ display: "block", margin: "auto" }}
                />
              </button>
              <button css={ButtonStyle} type="submit">
                <img
                  alt="submit button, arrow"
                  src={SubmitArrow}
                  css={{ display: "block", margin: "auto" }}
                />
              </button>
            </div>
          </Form>
        )}
      </Subscribe>
    </Provider>
  );
};

export default LogicForm;
