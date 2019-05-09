/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { floatingWarning } from "../styles/Layout";
import { WarningRed } from "../styles/Colors";

const WarningMesage = props => {
  const warningStyle = css({
    backgroundColor: WarningRed,
    fontSize: "1.5em",
    padding: 10,
    border: "1px solid",
    marginBottom: 5
  });
  return <aside css={[floatingWarning, warningStyle]}>{props.message}</aside>;
};

export default WarningMesage;
