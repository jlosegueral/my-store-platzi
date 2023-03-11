import { Category } from "./index.models";

export interface Product {
  id:          string;
  title:       string;
  price:       number;
  description: string;
  category:    Category;
  images:      string[];
  taxes?:       number;
}