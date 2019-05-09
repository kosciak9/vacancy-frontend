/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { Fragment } from "react";
import { BasicText, asField } from "informed";
import {
  WarningRed,
  InputOrange,
  InputBackground,
  PlaceholderWhite,
  TextBlack
} from "components/common/styles/Colors";
import WarningMesage from "components/common/form/WarningMessage";

const InputStyle = css({
  width: 300,
  height: 40,
  backgroundColor: InputBackground,
  border: "none",
  borderBottom: `3px solid ${InputOrange}`,
  color: TextBlack,
  marginBottom: 20,
  padding: "9px 0 9px 10px",
  "::placeholder": {
    color: PlaceholderWhite
  }
});

const ErrorStyle = css({
  borderBottom: `3px solid ${WarningRed}`
});

const BaseInput = asField(({ fieldState, ...props }) => {
  const styleList = [InputStyle];
  if (fieldState.error) styleList.push(ErrorStyle);
  return (
    <Fragment>
      <BasicText fieldState={fieldState} {...props} css={styleList} />
      {fieldState.error ? <WarningMesage message={fieldState.error} /> : null}
    </Fragment>
  );
});

export default BaseInput;
