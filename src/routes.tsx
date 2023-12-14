import React, { ReactElement } from "react";
import ArticleList from "./pages/article/article-list";
import RegisterPage from "./pages/register";
interface IRoute {
  path: string;
  component: ReactElement | any;
}

export const routes: IRoute[] = [
  {
    path: "/*",
    component: <ArticleList />,
  },
];
