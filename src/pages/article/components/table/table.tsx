import { useEffect, useState } from "react";
import { Table } from "antd";
import { useSearchParams } from "react-router-dom";
import { serializeQuery } from "@/utils/serializeQuery";
import Pagination from "@/shared/pagination/pagination";
import { useArticle } from "@/hooks/article";
import "./table.scss";

const ArticleTable = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    count: "10",
  });

  const [totalCount, setTotalCount] = useState<string>("10");

  const pageQuery = Number(searchParams.get("page"));
  const count = Number(searchParams.get("count"));
  const order = searchParams.get("sort")
    ? searchParams.get("sort")?.split(",")
    : null;
  const order_column = order ? order[0] : null;
  const order_type = order ? order[1] : null;
  const filterBy = searchParams.get("filter_by");
  const filterValue = searchParams.get("filter_value");
  const filterCondition = searchParams.get("filter_condition");
  const start_date = searchParams.get("start_date");
  const end_date = searchParams.get("end_date");
  const deleted = searchParams.get("deleted");
  const active = searchParams.get("active");

  const { data, isLoading, refetch } = useArticle(
    pageQuery,
    count,
    order_column ? order_column : undefined,
    order_type ? order_type : undefined,
    filterBy ? filterBy : undefined,
    filterValue ? filterValue : undefined,
    filterCondition ? filterCondition : undefined,
    start_date ? start_date : undefined,
    end_date ? end_date : undefined,
    deleted ? deleted : undefined,
    active ? active : undefined
  );

  const requestFunction = () => {
    console.log("request function");

    refetch();
  };
  useEffect(() => {
    if (data?.total) {
      setTotalCount(data?.total.toString());
    }
  }, [data]);

  const handleTableChange = (sorter: any) => {
    const sorterOrder = `${sorter.field},${
      sorter.order === "ascend" ? "asc" : "desc"
    }`;

    function sort() {
      if (sorter.order === undefined) {
        return null;
      }
      if (sorterOrder.split(",")[0] === "hireDateFormatted") {
        return "hireDate," + sorterOrder.split(",")[1];
      }
      return sorterOrder;
    }

    setSearchParams(serializeQuery("sort", searchParams, sort()));
  };

  const columns = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
      sorter: true,
    },

    {
      key: "title",
      dataIndex: "title",
      title: "title",
      sorter: true,
      render: (text: string) => {
        if (text) {
          return text.slice(0, 20) + "...";
        }
      },
    },
    {
      key: "description",
      dataIndex: "description",
      title: "description",
      sorter: true,
      render: (text: string) => {
        if (text) {
          return text.slice(0, 20) + "...";
        }
      },
    },
    {
      key: "category",
      dataIndex: "category",
      title: "category",
      sorter: true,
    },
    {
      key: "source",
      dataIndex: "source",
      title: "source",
      sorter: true,
      render: (text: string) => {
        if (text) {
          return text.replace(/_/g, " ");
        }
      },
    },
    {
      key: "created_at",
      dataIndex: "created_at",
      title: "created_at",
      sorter: true,
      render: (text: string) => {
        if (text) {
          return new Date(text).toLocaleDateString();
        }
      },
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        onChange={(sorter) => handleTableChange(sorter)}
        dataSource={data?.data}
        loading={isLoading}
        rowKey={"id"}
        scroll={{ x: true }}
        pagination={false}
        footer={() => (
          <div className={"article-table__pagination"}>
            <Pagination request={requestFunction} totalCount={totalCount} />
          </div>
        )}
      />
    </>
  );
};

export default ArticleTable;
