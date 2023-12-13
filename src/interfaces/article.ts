export interface IArticle {
  id: null;
  title: string;
  category: string;
  description: string;
}
export interface IArticleData {
  data: IArticle[];
  current_page: number;
  items_at_page: number;
  pages_count: number;
  total: number;
}
