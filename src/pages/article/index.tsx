import React from "react";
import ArticleFilters from "./components/filters/filters";
import ArticleTable from "./components/table/article-table";

interface props {}

const ArticleList: React.FC<props> = () => {
  return (
    <>
      <ArticleFilters />
      <ArticleTable />
    </>
  );
};

export default ArticleList;
