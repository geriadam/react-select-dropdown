import React from "react";
import Item from "./Item";
import { useSelectContext } from "./SelectProvider";

const GroupItem = ({ item, primaryColor }) => {
  const { classNames, formatGroupLabel } = useSelectContext();

  const groupLabelClass = classNames?.listGroupLabel || "pr-2 py-2 cursor-default select-none truncate font-bold text-gray-700";

  return item.options.length > 0 ? (
    <>
      {formatGroupLabel ? (
        formatGroupLabel(item)
      ) : (
        <div className={groupLabelClass}>
          {item.label}
        </div>
      )}

      {item.options.map((option, index) => (
        <Item key={index} primaryColor={primaryColor} item={option} />
      ))}
    </>
  ) : null;
};

export default GroupItem;
