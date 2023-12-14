import { useState } from "react";
import { AutoComplete } from "antd";

const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat),
});

const SearchAutoComplete = () => {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const [anotherOptions, setAnotherOptions] = useState<{ value: string }[]>([]);

  const getPanelValue = (searchText: string) =>
    !searchText
      ? []
      : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

  const onSelect = (data: string) => {
    console.log("onSelect", data);
  };

  const onChange = (data: string) => {
    setValue(data);
  };
  return (
    <>
      <AutoComplete
        value={value}
        style={{ flex: "0 0 auto", width: "300px" }}
        onSelect={onSelect}
        size={"large"}
        options={options}
        onChange={onChange}
        onSearch={(text) => setOptions(getPanelValue(text))}
        placeholder="Search"
      />
    </>
  );
};

export default SearchAutoComplete;
