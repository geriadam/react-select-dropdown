import React, { useCallback, useMemo } from "react";

import { COLORS, DEFAULT_THEME, THEME_DATA } from "../constants";

import DisabledItem from "./DisabledItem";
import { useSelectContext } from "./SelectProvider";

const getStyle = (primaryColor, styleType) => {
  if (COLORS.includes(primaryColor)) {
    return THEME_DATA[styleType][primaryColor];
  }
  return THEME_DATA[styleType][DEFAULT_THEME];
};

const Item = ({ item, primaryColor }) => {
  const { classNames, value, handleValueChange, formatOptionLabel } = useSelectContext();

  const isSelected = useMemo(() => value !== null && !Array.isArray(value) && value.value === item.value, [item.value, value]);

  const textHoverColor = useMemo(() => getStyle(primaryColor, "textHover"), [primaryColor]);
  const bgColor = useMemo(() => getStyle(primaryColor, "bg"), [primaryColor]);
  const bgHoverColor = useMemo(() => getStyle(primaryColor, "bgHover"), [primaryColor]);

  const getItemClass = useCallback(() => {
    const baseClass = "block transition duration-200 px-4 py-2 cursor-pointer select-none truncate rounded";
    const selectedClass = isSelected ? `text-white ${bgColor}` : `text-gray-500 ${bgHoverColor} ${textHoverColor}`;

    return classNames?.listItem ? classNames.listItem({ isSelected }) : `${baseClass} ${selectedClass}`;
  }, [bgColor, bgHoverColor, classNames, isSelected, textHoverColor]);

  const handleItemClick = () => {
    handleValueChange(item);
  }

  const handleKeyDown = (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      handleValueChange(item);
    }
  };

  return (
    <>
      {formatOptionLabel ? (
        <div onClick={handleItemClick}>
          {formatOptionLabel({ ...item, isSelected })}
        </div>
      ) : (
        item.disabled ? (
          <DisabledItem>{item.label}</DisabledItem>
        ) : (
          <li
            tabIndex={0}
            onKeyDown={handleKeyDown}
            aria-selected={isSelected}
            role="option"
            onClick={handleItemClick}
            className={getItemClass()}
          >
            {item.highlight ?? item.label}
          </li>
        )
      )}
    </>
  );
};

export default Item;
