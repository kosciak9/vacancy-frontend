/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { SuccessGreen } from "components/common/styles/Colors";

const SVGButton = props => {
  const ButtonStyle = css({
    backgroundColor: props.backgroundColor || SuccessGreen,
    width: props.width || "auto",
    height: props.height || "auto",
    border: "none"
  });
  return (
    <button
      css={[ButtonStyle, props.additionalCss]}
      onClick={props.onClick}
      type={props.type}
    >
      <img
        css={{ display: "block", margin: "auto" }}
        src={props.image}
        alt={props.altText}
      />
    </button>
  );
};
export default SVGButton;
