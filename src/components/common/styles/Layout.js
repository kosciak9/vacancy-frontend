import { css } from "@emotion/core";

const flexCenter = css({
  height: "100%",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
});

const flexCenterColumn = css([flexCenter, { flexDirection: "column" }]);
const floatingWarning = css({
  color: "white",
  position: "fixed",
  bottom: 10,
  right: 10
});

const buttonGroup = css({
  display: "flex",
  justifyContent: "space-between"
});

const formLayout = css({
  display: "flex",
  flexDirection: "column",
  maxWidth: 300
});

const floatingNavbar = css({
  position: "fixed",
  top: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  zIndex: 100
});

export {
  floatingNavbar,
  formLayout,
  flexCenter,
  flexCenterColumn,
  floatingWarning,
  buttonGroup
};
