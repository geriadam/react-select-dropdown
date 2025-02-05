import Select from "react-select-dropdown";
import { useCallback, useEffect, useState } from "react";

const data = [
  { label: "Option 1", value: "Option 1" },
  { label: "Option with icon", value: "Option with icon" },
  { label: "Long Long Option 3", value: "Long Long Option 3" },
  { label: "Long Long Long Option 4", value: "Long Long Long Option 4" },
  { label: "Long Long Long Long Option 5", value: "Long Long Long Long Option 5" },
  { label: "Long Long Long Long Long Option 6", value: "Long Long Long Long Long Option 6" },
];

const App = () => {
  console.log("as")
  const [selectValues, setSelectValues] = useState({
    firstSelect: null,
    secondSelect: null,
    thirdSelect: null,
  });

  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const selectConfig = {
    isMultiple: true,
    isSearchable: true,
    isDisabled: false,
    primaryColor: "teal",
  };

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setOptions(data);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filterOptions = useCallback((data) => {
    return data.filter((item) => !("options" in item));
  }, []);

  const handleSelectChange = (key, value) => {
    setSelectValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="p-4 space-y-4">
      {/* First Select */}
      <Select
        {...selectConfig}
        options={filterOptions(options)}
        value={selectValues.firstSelect}
        onChange={(value) => handleSelectChange("firstSelect", value)}
        loading={loading}
        isMultiple={false}
        isSearchable={false}
        placeholder="Select first option"
      />

      {/* Second Select */}
      <Select
        {...selectConfig}
        options={filterOptions(options)}
        value={selectValues.secondSelect}
        onChange={(value) => handleSelectChange("secondSelect", value)}
        loading={loading}
        isSearchable={false}
        placeholder="Select second option"
      />

      {/* Third Select */}
      <Select
        {...selectConfig}
        options={filterOptions(options)}
        value={selectValues.thirdSelect}
        onChange={(value) => handleSelectChange("thirdSelect", value)}
        loading={loading}
        outlined={true}
        placeholder="Select third option"
      />
    </div>
  );
};

export default App;
