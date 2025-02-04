import React, { createContext, useContext, useMemo } from "react";

// Default context values
const defaultContext = {
  value: null,
  handleValueChange: (selected) => console.log("selected:", selected),
  formatGroupLabel: null,
  formatOptionLabel: null,
  classNames: undefined,
};

export const SelectContext = createContext(defaultContext);

export const useSelectContext = () => useContext(SelectContext);

const SelectProvider = ({ value, handleValueChange, otherData = {}, children }) => {
  const store = useMemo(() => ({
    value,
    handleValueChange,
    formatGroupLabel: typeof otherData.formatGroupLabel === "function" ? otherData.formatGroupLabel : null,
    formatOptionLabel: typeof otherData.formatOptionLabel === "function" ? otherData.formatOptionLabel : null,
    classNames: otherData.classNames,
  }), [value, handleValueChange, otherData]);

  return <SelectContext.Provider value={store}>{children}</SelectContext.Provider>;
};

export default SelectProvider;
