import React, { useCallback, useEffect, useState } from "react";
import "./filters.scss";
import { Card, Col, Row, Select, Typography } from "antd";
import ArticlesDatepicker from "./components/datepicker";
import ArticlesSearch from "./components/search/article-search";
import ItemsAtPage from "../../../../shared/items-at-page/items-at-page";
import { useSearchParams } from "react-router-dom";
import { serializeQuery } from "../../../../utils/serializeQuery";
import { getCategoriesApi } from "../../../../api/article/article";
import filterIcon from "@assets/icons/filters.svg";

const { Text } = Typography;

interface props {}
const ArticleFilters: React.FC<props> = () => {
  const [searchParams, setSearchParams] = useSearchParams({});

  const onChange = (value: string, filter_by: string) => {
    const searchParams = new URLSearchParams({
      filter_by,
      filter_condition: "=",
    });
    setSearchParams(serializeQuery("filter_value", searchParams, value));
  };

  const onSearchBox = (value: string) => {
    const searchParams = new URLSearchParams({
      filter_by: "title",
      filter_condition: "like",
    });
    setSearchParams(serializeQuery("filter_value", searchParams, value));
  };
  const onSearch = (value: string) => {
    console.log("onSearch", value);
  };

  const [cats, setCats] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);
  const fetchData = useCallback(() => {
    getCategoriesApi()
      .then((res) => {
        const cats = res.data;
        setCats(cats);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, [setCats]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const sources = [
    {
      label: "NewsAPI",
      value: "news_api",
    },
    {
      label: "The Guardian",
      value: "guardian_api",
    },
    {
      label: "New York Times",
      value: "nytimes_api",
    },
  ];
  return (
    <div className={"articles__filters"}>
      <Card>
        <Row justify={"space-between"} align={"middle"}>
          <Col>
            <div className={"articles__filters--top"}>
              <img src={filterIcon} alt="" />
              <Text>Filter</Text>
            </div>
          </Col>
          <Col>
            <ArticlesDatepicker />
          </Col>
        </Row>
        <Row
          justify={"space-between"}
          style={{ margin: "50px 0" }}
          align={"middle"}
        >
          <Col span={10}>
            <Select
              showSearch
              placeholder="Categories"
              optionFilterProp="children"
              onChange={(value) => onChange(value, "category")}
              className={"departments__select"}
              onSearch={onSearch}
              style={{ width: "100%" }}
              size={"large"}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toString()
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              allowClear={true}
              options={cats}
            />
          </Col>
          <Col span={10}>
            <Select
              showSearch
              placeholder="sources"
              optionFilterProp="children"
              onChange={(value) => onChange(value, "source")}
              className={"select"}
              onSearch={onSearch}
              style={{ width: "100%" }}
              size={"large"}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toString()
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              allowClear={true}
              options={sources}
            />
          </Col>
          <Col span={10}>
            <ArticlesSearch onSearchBox={onSearchBox} />
          </Col>
        </Row>
        <Row justify={"space-between"} align={"middle"}>
          <Col span={10}>
            <ItemsAtPage />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ArticleFilters;
