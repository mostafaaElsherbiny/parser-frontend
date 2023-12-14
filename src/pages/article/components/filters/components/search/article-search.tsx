import "./search.scss";
import { Input } from "antd";

const { Search } = Input;

interface props {
  onSearchBox: (value: string) => void;
}

const ArticlesSearch = ({ onSearchBox }: props) => {
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
