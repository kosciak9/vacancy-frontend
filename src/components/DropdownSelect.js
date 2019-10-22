import { ArrowDown, ArrowUp } from "react-feather";

/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useSelect } from "downshift";

export default function DropdownSelect({ label, value, onChange, items }) {
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps
  } = useSelect({
    items,
    selectedItem: value,
    onSelectedItemChange: i => onChange(i.selectedItem)
  });

  return (
    <div>
      {label && <label {...getLabelProps()}>{label}</label>}
      <button
        {...getToggleButtonProps()}
        css={theme => [
          {
            cursor: "pointer",
            minWidth: 200,
            borderRadius: 2,
            boxSizing: "border-box",
            border: "1px solid rgba(0, 0, 0, 0.3)",
            padding: theme.spacing(1),
            marginTop: theme.spacing(2),
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "Cabin"
          },
          theme.typography.body
        ]}
      >
        {selectedItem ? selectedItem.name : "nothing selected"}
        {isOpen ? <ArrowUp /> : <ArrowDown />}
      </button>
      <ul
        {...getMenuProps()}
        css={theme => ({
          maxHeight: "200px",
          cursor: "pointer",
          overflowY: "auto",
          minWidth: 200,
          position: "absolute",
          margin: 0,
          boxSizing: "border-box",
          padding: isOpen ? theme.spacing(1) : 0,
          backgroundColor: theme.palette.backdrop
        })}
      >
        {isOpen &&
          items.map((option, index) => (
            <li
              css={theme => ({
                backgroundColor:
                  highlightedIndex === index ? "#bde4ff" : "inherit"
              })}
              key={`${option.name}${index}`}
              {...getItemProps({ item: option, index })}
            >
              {option.name}
            </li>
          ))}
      </ul>
    </div>
  );
}
