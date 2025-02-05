# React Select Dropdown

![{BAE8F95F-FACC-44A6-9213-AE01D0FCD93A}](https://github.com/user-attachments/assets/5d803cde-00c7-442d-ad06-e5144cf4b583)


## Features

- Single or Multiple Selection
- Searchable Dropdown
- Customization option rendering
- Portal Support
- Optional deactivation of an option
- Select Theme Color
- Group options

## Demo

Website [here](https://site-react-select-dropdown-tailwind.vercel.app/)
Storybook [here](https://react-select-dropdown-tailwind.vercel.app/)

## Install

```bash
npm i react-select-dropdown-tailwind
```

## Usage

```javascript
import Select from "react-select-dropdown-tailwind";
import { useState } from "react";

const data = [
  { label: "Option 1", value: "Option 1" },
  { label: "Option 2", value: "Option 2" },
];

const App = () => {
  const [selectValues, setSelectValues] = useState(null);

  const handleChange = value => {
    console.log("value:", value);
    setSelectValues(value);
  };

  return (
    <Select
      options={data}
      value={selectValues}
      onChange={handleChange}
      placeholder="Select option"
    />
  );
};

export default App;
```

## Theming options

Theme color from [Tailwind Colors](https://tailwindcss.com/docs/colors)

To change the default theme, simply add the `primaryColor` props to your select field with the theme value. By default, the `primaryColor` is set to `teal`

## Props

This table shows all the options available in react-tailwindcss-select.

| Option                                        | Type       | Default            | Description                                                                            |
|-----------------------------------------------|------------|--------------------|----------------------------------------------------------------------------------------|
| [`classNames`](#classNames)                   | `Object`   | `undefined`        | This prop allows you to style most of the components used.             |
| `isDisabled`                                  | `Boolean`  | `false`            | Indicates if you can disable the select field.                                         |
| `isMultiple`                                  | `Boolean`  | `false`            | Indicates if you can do a multiple selection.                                          |
| `isSearchable`                                | `Boolean`  | `false`            | Indicates if you can search the elements of the select field.                          |
| [`formatGroupLabel`](#formatGroupLabel)       | `Function` | `null`             | Allows you to use a custom rendering template for each subgroup title                  |
| [`formatOptionLabel`](#formatOptionLabel)     | `Function` | `null`             | Allows you to use a custom rendering template for each option in the list              |
| `loading`                                     | `Boolean`  | `false`            | Indicates if you want a loader to appear in the field.                                 |
| `menuIsOpen`                                  | `Boolean`  | `false`            | Indicates if you want the options menu to be displayed by default.                     |
| `noOptionsMessage`                            | `String`   | `No results found` | Default message when there is no option in the select field.                           |
| [`onChange`](#onChange)                       | `Function` |                    | This callback, if present, is triggered when the select field value is modified.       |
| [`onSearchInputChange`](#onSearchInputChange) | `Function` |                    | This callback, if present, is triggered when the search input field value is modified. |
| [`options`](#options)                         | `Array`    | `[]`               | All options or options groups available in the selection field.                        |
| `placeholder`                                 | `String`   | `Select...`        | The placeholder shown for the select field.                                            |
| `primaryColor`                                | `String`   | `teal`             | Default theme of the field.                                                            |
| `searchInputPlaceholder`                      | `String`   | `Search...`        | The placeholder shown for the search input field.                                      |
| [`value`](#value)                             | `Object`   | `null`             | Current value of select field.                                                         |

### onChange

This callback, if present, is triggered when the select field value is modified. This callback takes
as a parameter the current value(s) selected. These values respect the same structure as the
elements of the options.

```js
currentValue => {
    console.log("currentValue:", currentValue);
};
```

### onSearchInputChange

This callback, if present, is triggered when the search input field value is modified. This callback takes
as parameter a `React.ChangeEvent<HTMLInputElement>`.

```js
e => {
    console.log("value:", e.target.value);
};
```

### options

All options are available in the select field. Each option element must have a `value` property that
serves as an identifier for the element, a `label` property that is the text that is displayed in
the options list, and an optional `disabled` property to specify whether the element is active.

#### item

```js
// default element
const options = [{ value: "option-1", label: "Option 1" }];
// default element with `disabled`
const options = [{ value: "option-1", label: "Option 1", disabled: true }];
```

#### Group item

If you want to group options you can use the following code.

```js
const options = [
    {
        label: "Title 1",
        options: [
            { value: "option-1", label: "Option 1" },
            { value: "option-2", label: "Option 2" }
        ]
    },
    {
        label: "Title 2",
        options: [
            { value: "option-3", label: "Option 3" },
            { value: "option-4", label: "Option 4" }
        ]
    },
];
```

### value

The current value of the select field. These objects must follow the same structure as an `options`
element. Thus, the following would work:

```js
// default element Simple Select
const value = { value: "option-1", label: "Option 1" };
// default element with `disabled` Simple Select
const value = { value: "option-1", label: "Option 1", disabled: true };
// default element Multiple Select
const value = [{ value: "option-1", label: "Option 1" }];
// default element with `disabled` Multiple Select
const value = [{ value: "option-1", label: "Option 1", disabled: true }];
```

### formatGroupLabel

`formatGroupLabel` allows you to use a custom rendering template for each subgroup title.

### formatOptionLabel

`formatOptionLabel` allows you to use a custom rendering template for each option in the list.

### classNames

Each key takes a callback function or a string. If a key is not filled in, the default classes of the component will be used.

#### All keys

```javascript
  classNames?: {
      menu?: string;
      tagItem?: (value?: { item?: Option, isDisabled?: boolean }) => string;
      tagItemText?: string;
      tagItemIconContainer?: string;
      tagItemIcon?: string;
      list?: string;
      listGroupLabel?: string;
      listItem?: (value?: { isSelected?: boolean }) => string;
      listDisabledItem?: string;
      searchContainer?: string;
      searchBox?: string;
      searchIcon?: string;
      deleteIcon?: string;
  };
```

## License

This project is licensed under the MIT License. See the [LICENSE](https://choosealicense.com/licenses/mit/) for more details.
