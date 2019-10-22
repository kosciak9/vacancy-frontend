/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Checkbox } from "reakit";
import theme from "common/theme";

export default function IconCheckbox(props) {
  const {
    checked,
    onChange,
    iconChecked,
    iconUnchecked,
    checkedForeground = "black",
    checkedBackground = theme.palette.success,
    uncheckedForeground = "black",
    uncheckedBackground = theme.palette.invalid
  } = props;
  const IconChecked = iconChecked;
  const IconUnchecked = iconUnchecked;
  return (
    <Checkbox
      css={theme => ({
        cursor: "pointer",
        height: 24,
        width: 24,
        borderRadius: 2,
        margin: theme.spacing(1),
        border: "1px solid rgba(0, 0, 0, 0.3)",
        color: checked ? checkedForeground : uncheckedForeground,
        backgroundColor: checked ? checkedBackground : uncheckedBackground,
        padding: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      })}
      checked={checked}
      onChange={onChange}
      as="button"
    >
      {checked ? (
        <IconChecked color={checkedForeground} size={20} />
      ) : (
        <IconUnchecked color={uncheckedForeground} size={20} />
      )}
    </Checkbox>
  );
}
