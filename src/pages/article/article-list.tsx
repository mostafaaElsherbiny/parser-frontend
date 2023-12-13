import React from "react";
import ArticleFilters from "./components/article-filters/article-filters";
import ArticleTable from "./components/article-table/article-table";

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
