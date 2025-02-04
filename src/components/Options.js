import React, { useCallback, useContext, useMemo } from "react";
import { DEFAULT_THEME, THEME_DATA } from "../constants";

import DisabledItem from "./DisabledItem";
import GroupItem from "./GroupItem";
import Item from "./Item";
import { SelectContext } from "./SelectProvider";

const Options = ({
  list,
  noOptionsMessage,
  text,
  isMultiple,
  value,
  primaryColor = DEFAULT_THEME,
}) => {
  const { classNames } = useContext(SelectContext);

  const highlightText = useCallback((label, query) => {
    if (!query) return label;
    const regex = new RegExp(`(${query})`, "gi");
    return label.split(regex).map((part, i) =>
      regex.test(part) ? (
        <span key={i} className={`${THEME_DATA.bg[primaryColor]} font-bold`}>{part}</span>
      ) : (
        part
      )
    );
  }, [primaryColor]);

  const filterItemByText = useCallback((item) => {
    return item.label.toLowerCase().includes(text.toLowerCase());
  }, [text]);

  const filterByText = useCallback(() => {
    return list
      .map(item => {
        if ("options" in item) {
          return {
            label: item.label,
            options: item.options.filter(filterItemByText).map(option => ({
              ...option,
              highlight: highlightText(option.label, text),
              label: option.label,
            })),
          };
        }

        return filterItemByText(item) ? {
          ...item,
          highlight: highlightText(item.label, text),
          label: item.label,
        } : null;
      })
      .filter(Boolean);
  }, [list, highlightText, filterItemByText]);

  const removeValues = useCallback((array) => {
    if (!isMultiple || !Array.isArray(value)) return array;

    const valueIds = value.map(item => item.value);
    const filterItem = (item) => !valueIds.includes(item.value);

    return array
      .map(item => {
        if ("options" in item) {
          return {
            label: item.label,
            options: item.options.filter(filterItem),
          };
        }
        return filterItem(item) ? item : null;
      })
      .filter(Boolean);
  }, [isMultiple, value]);

  const filterResult = useMemo(() => {
    const filteredByText = filterByText();
    return removeValues(filteredByText);
  }, [filterByText, removeValues]);

  const renderGroupItem = (item, index) => (
    <>
      <GroupItem primaryColor={primaryColor} item={item} />
      {index + 1 < filterResult.length && <hr className="my-1" />}
    </>
  );

  const renderItem = (item) => <Item primaryColor={primaryColor} item={item} />;

  return (
    <div role="options" className={classNames?.list || "max-h-72 overflow-y-auto"}>
      {filterResult.length > 0 ? (
        filterResult.map((item, index) => (
          <React.Fragment key={index}>
            {"options" in item ? renderGroupItem(item, index) : renderItem(item)}
          </React.Fragment>
        ))
      ) : (
        <DisabledItem>{noOptionsMessage}</DisabledItem>
      )}
    </div>
  );
};

export default Options;
