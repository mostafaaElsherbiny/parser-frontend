import { ReactElement } from "react";
import ArticleList from "./pages/article";
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
