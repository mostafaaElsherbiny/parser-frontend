import React, { useCallback, useEffect, useState } from "react";
import "./article-filters.scss";
import { Card, Col, Row, Select, Typography } from "antd";
import ArticlesDatepicker from "./components/articles-datepicker";
import ArticlesSearch from "./components/articles-search/article-search";
import ItemsAtPage from "../../../../shared/items-at-page/items-at-page";
import { useSearchParams } from "react-router-dom";
import { serializeQuery } from "../../../../utils/serializeQuery";
import { getCategoriesApi } from "../../../../api/article/article";

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
              <svg
                width="26"
                height="21"
                viewBox="0 0 26 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24.9962 0.351502C24.909 0.13905 24.7013 0 24.4729 0L0.564462 0.000189183C0.334982 0.000189183 0.128206 0.139239 0.042328 0.351692C-0.0446976 0.564144 0.00505881 0.80592 0.167754 0.966329L9.69413 10.3663V20.4351C9.69413 20.6362 9.80139 20.8227 9.97544 20.9255C10.0636 20.9764 10.1608 21 10.259 21C10.3551 21 10.4522 20.9764 10.5392 20.9277L15.0594 18.3513C15.2359 18.2508 15.3443 18.0633 15.3443 17.8598V10.3665L24.8711 0.968019C25.0325 0.806458 25.0823 0.563543 24.9964 0.352026L24.9962 0.351502Z"
                  fill="#357EEC"
                />
              </svg>
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
