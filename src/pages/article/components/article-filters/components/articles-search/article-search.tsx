import React from "react";
import "./article-search.scss";
import { Input } from "antd";

const { Search } = Input;

interface props {
  onSearchBox: (value: string) => void;
}

const ArticlesSearch: React.FC<props> = ({ onSearchBox }) => {
  const onSearch = (value: string) => {
    onSearchBox(value);
  };
  return (
    <Search
      placeholder="Search"
      size={"large"}
      allowClear
      onSearch={onSearch}
    />
  );
};

export default ArticlesSearch;
