import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { COLORS, DEFAULT_THEME, THEME_DATA } from "../constants";
import useOnClickOutside from "../hooks/use-onclick-outside";
import { ChevronIcon, CloseIcon } from "./Icons";
import Options from "./Options";
import SearchInput from "./SearchInput";
import SelectProvider from "./SelectProvider";
import Spinner from "./Spinner";

const Select = ({
  options = [],
  value = null,
  label = "Label",
  onChange,
  onSearchInputChange,
  placeholder = "Select...",
  searchInputPlaceholder = "Search...",
  isMultiple = false,
  isSearchable = false,
  isDisabled = false,
  loading = false,
  menuIsOpen = false,
  outlined = false,
  portal = false,
  noOptionsMessage = "No options found",
  primaryColor = DEFAULT_THEME,
  formatGroupLabel,
  formatOptionLabel,
  classNames,
}) => {
  const [open, setOpen] = useState(menuIsOpen);
  const [list, setList] = useState(options);
  const [inputValue, setInputValue] = useState("");
  const ref = useRef(null);
  const searchBoxRef = useRef(null);

  useEffect(() => {
    const formatItem = (item) => ({ ...item, disabled: "disabled" in item ? item.disabled : false });
    setList(
      options.map((item) => ("options" in item ? { ...item, options: item.options.map(formatItem) } : formatItem(item)))
    );
  }, [options]);

  useEffect(() => {
    if (isSearchable) {
      open ? searchBoxRef.current?.select() : setInputValue("");
    }
  }, [open, isSearchable]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useOnClickOutside(ref, () => setOpen(false));

  const toggleDropdown = useCallback(() => {
    if (!isDisabled) setOpen((prev) => !prev);
  }, [isDisabled]);

  const handleKeyDown = useCallback((e) => {
    if (["Enter", "Space"].includes(e.code) && !isDisabled) {
      e.preventDefault();
      toggleDropdown();
    }
  }, [isDisabled, toggleDropdown]);

  const handleValueChange = useCallback(
    (selected) => {
      if (selected !== value) {
        if (!isMultiple) {
          setOpen(false);
          onChange(selected);
        } else {
          onChange(value === null || !Array.isArray(value) ? [selected] : [...value, selected]);
        }
      }
    },
    [isMultiple, onChange, value]
  );

  const removeItem = useCallback(
    (e, item) => {
      e.stopPropagation();
      if (isMultiple && Array.isArray(value)) {
        const newValue = value.filter((current) => current.value !== item.value);
        onChange(newValue.length ? newValue : null);
      }
    },
    [isMultiple, onChange, value]
  );

  const getSelectClass = useCallback(() => {
    const ringColor = COLORS.includes(primaryColor) ? THEME_DATA.ring[primaryColor] : THEME_DATA.ring[DEFAULT_THEME];
    const borderFocus = COLORS.includes(primaryColor) ? THEME_DATA.borderFocus[primaryColor] : THEME_DATA.borderFocus[DEFAULT_THEME];
    const baseClass = `flex text-sm text-gray-500 border border-gray-300 rounded shadow-sm transition-all duration-300
      ${isDisabled ? "bg-gray-200" : `hover:border-gray-400 ${borderFocus} focus:ring ${ringColor}`}`;

    if (outlined) {
      return `${baseClass} bg-neutral-200 border-2 ${isDisabled ? "border-neutral-100" : "border-neutral-200"}`;
    }

    return baseClass;
  }, [classNames, isDisabled, primaryColor, outlined]);

  const getTagItemClass = useCallback((item) => {
    return classNames?.tagItem?.({ item, isDisabled }) ?? `bg-gray-100 border rounded-md flex space-x-1 ${isDisabled ? "border-gray-500 px-1" : "pl-1"}`;
  }, [classNames, isDisabled]);

  const dropdownContent = (
    <div className={classNames?.menu ?? "absolute z-[1050] w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700"}>
      {isSearchable && <SearchInput ref={searchBoxRef} value={inputValue} placeholder={searchInputPlaceholder} onChange={(e) => { onSearchInputChange?.(e); setInputValue(e.target.value); }} />}
      <Options list={list} noOptionsMessage={noOptionsMessage} text={inputValue} isMultiple={isMultiple} value={value} primaryColor={primaryColor} />
    </div>
  );

  return (
    <SelectProvider value={value} handleValueChange={handleValueChange} otherData={{ formatGroupLabel, formatOptionLabel, classNames }}>
      <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-2 sm:gap-4 items-start sm:items-center w-full">
        <label className="text-gray-600 text-sm font-medium">{label}</label>
        <div className="relative" ref={ref}>
          <div aria-expanded={open} onKeyDown={handleKeyDown} onClick={toggleDropdown} className={getSelectClass()}>
            <div className="grow pl-2.5 py-2 pr-2 flex flex-wrap gap-1 w-full">
              {!isMultiple ? (
                <p className="truncate cursor-default select-none">
                  {value && !Array.isArray(value) ? value.label : placeholder}
                </p>
              ) : (
                <>
                  {value == null && <p className="truncate cursor-default select-none">{placeholder}</p>}
                  {Array.isArray(value) &&
                    value.map((item, index) => (
                      <div key={index} className={getTagItemClass(item)}>
                        <p className={classNames?.tagItemText ?? "text-gray-600 truncate cursor-default select-none"}>{item.label}</p>
                        {!isDisabled && (
                          <div
                            role="button"
                            tabIndex={0}
                            onClick={(e) => removeItem(e, item)}
                            className={classNames?.tagItemIconContainer ?? "flex items-center px-1 cursor-pointer rounded-r-sm hover:bg-red-200 hover:text-red-600"}
                          >
                            <CloseIcon className={classNames?.tagItemIcon ?? "w-5 h-5 mt-0.5"} />
                          </div>
                        )}
                      </div>
                    ))}
                </>
              )}
            </div>
            <div className="flex flex-none items-center py-1.5">
              {loading && <div className="px-1.5"><Spinner primaryColor={primaryColor} /></div>}
              <div className="px-1.5">
                <ChevronIcon className={`transition duration-300 w-6 h-6 p-0.5${open ? " transform rotate-90 text-gray-500" : " text-gray-300"}`} />
              </div>
            </div>
          </div>
          {open && !isDisabled && (portal ? createPortal(dropdownContent, document.body) : dropdownContent)}
        </div>
      </div>
    </SelectProvider>
  );
};

export default Select;
