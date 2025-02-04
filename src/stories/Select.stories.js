import React, { useState, useEffect, useCallback } from "react";
import { COLORS } from "../constants";
import Select from "../components/Select";
import '../index.css';

export default {
  title: "Components/Select",
  component: Select,
  argTypes: {
    primaryColor: {
      control: 'select',
      options: Object.values(COLORS),
    },
    formatGroupLabel: { table: { disable: true } },
    formatOptionLabel: { table: { disable: true } },
    classNames: { table: { disable: true } },
    menuIsOpen: { table: { disable: true } },
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
    onSearchInputChange: { table: { disable: true } },
  },
};

const data = [
  { label: "Option 1", value: "Option 1" },
  { label: "Option with icon", value: "Option with icon" },
  { label: "Long Long Option 3", value: "Long Long Option 3" },
  { label: "Long Long Long Option 4", value: "Long Long Long Option 4" },
  { label: "Long Long Long Long Option 5", value: "Long Long Long Long Option 5" },
  { label: "Long Long Long Long Long Option 6", value: "Long Long Long Long Long Option 6" },
];

const Template = (args) => {
  const [value, setValue] = useState(null);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setOptions(data);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (val) => setValue(val);

  return <Select {...args} options={options} value={value} onChange={handleChange} loading={loading} />;
};

export const Default = Template.bind({});
Default.args = {
  isMultiple: true,
  isSearchable: true,
  primaryColor: "teal", // Example of passing primary color prop
  loading: true,
  outlined: false,
  isDisabled: false,
  portal: false,
  options: data,
  label: "Label",
  placeholder: "Select",
  searchInputPlaceholder: "Search...",
  placeholder: "Select an option",
  noOptionsMessage: "No options found",
};