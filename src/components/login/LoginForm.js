/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Form } from "informed";
import { useState } from "react";
import SubmitArrow from "components/common/svgs/submit.svg";
import formSubmit from "components/common/form/FormSubmit";
import {
  FacebookBlue,
  SuccessGreen,
  TwitterBlue
} from "components/common/styles/Colors";
import BaseInput from "components/common/form/BaseInput";
import { formLayout, buttonGroup } from "components/common/styles/Layout";
import SVGButton from "components/common/SVGButton";
import WarningMesage from "components/common/form/WarningMessage";
import FacebookLogo from "components/common/svgs/facebook.svg";
import TwitterLogo from "components/common/svgs/twitter.svg";
import validate from "components/common/form/FormValidation";

const LogicForm = ({ login }) => {
  const [warningMessage, setMessage] = useState(null);
  const userLogin = formSubmit(login.userLogin, setMessage);

  const buttonHeight = 40;
  const buttonWidth = 90;

  return (
    <Form css={formLayout} onSubmit={userLogin}>
      {warningMessage ? <WarningMesage message={warningMessage} /> : null}
      <BaseInput field="username" placeholder="username" validate={validate} />
      <BaseInput
        field="password"
        type="password"
        placeholder="password"
        validate={validate}
      />
      <div css={buttonGroup}>
        <SVGButton
          backgroundColor={TwitterBlue}
          width={buttonWidth}
          height={buttonHeight}
          image={TwitterLogo}
          altText="twitter logo"
        />
        <SVGButton
          backgroundColor={FacebookBlue}
          width={buttonWidth}
          height={buttonHeight}
          altText="facebook logo"
          image={FacebookLogo}
        />
        <SVGButton
          height={buttonHeight}
          width={buttonWidth}
          backgroundColor={SuccessGreen}
          image={SubmitArrow}
          altText="submit button, arrow"
        />
      </div>
    </Form>
  );
};

export default LogicForm;
