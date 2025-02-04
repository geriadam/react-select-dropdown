import React, { useContext } from "react";
import { SelectContext } from "./SelectProvider";

const DisabledItem = ({ children }) => {
  const { classNames = {} } = useContext(SelectContext);

  const defaultClass = "px-4 py-2 cursor-not-allowed truncate text-gray-400 select-none";
  const listDisabledItemClass = classNames.listDisabledItem || defaultClass;

  return <div className={listDisabledItemClass}>{children}</div>;
};

export default DisabledItem;
