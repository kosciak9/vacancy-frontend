/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { SuccessGreen, TextBlack } from "components/common/styles/Colors";

const SVGButton = props => {
  const ButtonStyle = css({
    backgroundColor: props.backgroundColor || SuccessGreen,
    color: props.color || TextBlack,
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
      {props.image ? (
        <img
          css={{ display: "block", margin: "auto" }}
          src={props.image}
          alt={props.altText}
        />
      ) : (
        props.children
      )}
    </button>
  );
};
export default SVGButton;
