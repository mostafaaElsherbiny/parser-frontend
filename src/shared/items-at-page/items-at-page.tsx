import React from "react";
import { Row, Select, Typography } from "antd";
import { useSearchParams } from "react-router-dom";
import { serializeQuery } from "@/utils/serializeQuery";

const { Text } = Typography;


const options = [
  { value: "10", label: "10" },
  { value: "25", label: "25" },
  { value: "50", label: "50" },
  { value: "100", label: "100" },
];

const ItemsAtPage = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    count: "10",
  });

  const handleChange = (value: string) => {
    const searchParams = new URLSearchParams({ page: "1" });
    setSearchParams(serializeQuery("count", searchParams, value));
  };

  return (
    <Row align={"middle"}>
      <Text style={{ marginRight: "10px" }}>Show</Text>
      <Select
        size={"large"}
        defaultValue="10"
        style={{ width: 120 }}
        onChange={handleChange}
        options={options}
      />
      <Text style={{ marginLeft: "10px" }}>entries</Text>
    </Row>
  );
};

export default ItemsAtPage;
