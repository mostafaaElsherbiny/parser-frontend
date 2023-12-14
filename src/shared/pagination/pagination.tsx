import { Pagination as AntdPagination } from "antd";
import { useSearchParams } from "react-router-dom";
import { serializeQuery } from "@/utils/serializeQuery";

interface props {
  request: () => void;
  totalCount: string;
}

const Pagination = ({ request, totalCount }: props) => {
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    count: "10",
  });

  const handlePaginationChange = (value: number, query: string) => {
    console.log(serializeQuery(query, searchParams, value));
    setSearchParams(serializeQuery(query, searchParams, value));
    request();
  };

  const changePage = (page: number) => handlePaginationChange(page, "page");

  const size = Number(searchParams.get("count"));
  const page = Number(searchParams.get("page"));

  return (
    <>
      <AntdPagination
        total={Number(totalCount)}
        defaultCurrent={1}
        current={page}
        pageSize={size}
        onChange={changePage}
      />
    </>
  );
};

export default Pagination;
