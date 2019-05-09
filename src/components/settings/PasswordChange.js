/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Form } from "informed";
import { useState } from "react";
import { formLayout } from "components/common/styles/Layout";
import SubmitArrow from "components/common/svgs/submit.svg";
import SVGButton from "components/common/SVGButton";
import formSubmit from "components/common/form/FormSubmit";
import BaseInput from "components/common/form/BaseInput";
import WarningMesage from "components/common/form/WarningMessage";

const PasswordChange = ({ login }) => {
  const [warningMessage, setMesssage] = useState(null);
  const changePassword = formSubmit(login.changePassword, setMesssage);
  const buttonHeight = 40;
  return (
    <Form css={formLayout} onSubmit={changePassword}>
      {warningMessage ? <WarningMesage message={warningMessage} /> : null}
      <BaseInput
        type="password"
        field="newPassword"
        placeholder="Your new password"
      />
      <BaseInput
        type="password"
        field="reNewPassword"
        placeholder="Repeat your new password"
      />
      <BaseInput
        type="password"
        field="currentPassword"
        placeholder="Your current password for security"
      />
      <SVGButton
        height={buttonHeight}
        type="submit"
        altText="submit button, arrow"
        image={SubmitArrow}
      />
    </Form>
  );
};

export default PasswordChange;
