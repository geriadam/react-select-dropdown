import React, { useContext } from "react";

import { SearchIcon, CloseSolidIcon } from "./Icons";
import { SelectContext } from "./SelectProvider";

const SearchInput = React.forwardRef(function SearchInput(
  { placeholder = "", value = "", onChange, name = "" },
  ref
) {
  const { classNames } = useContext(SelectContext);

  const clearValue = () => {
    onChange({ target: { value: "" } });
  };

  return (
    <div className={classNames?.searchContainer || "relative py-1 px-4"}>
      <SearchIcon className={classNames?.searchIcon || "absolute w-5 h-5 mt-2.5 pb-0.5 ml-2 text-gray-500"} />

      <input
        ref={ref}
        className={classNames?.searchBox || "w-full py-2 pl-8 pr-10 text-sm text-gray-500 bg-gray-100 border border-gray-200 rounded focus:border-gray-200 focus:ring-0 focus:outline-none"}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />

      {value && (
        <div onClick={clearValue}>
          <CloseSolidIcon
            className={classNames?.deleteIcon || "absolute right-2 mr-4 top-1/2 transform -translate-y-1/2 w-5 h-5 p-0.5 cursor-pointer"}

          />
        </div>
      )}
    </div>
  );
});

export default SearchInput;
