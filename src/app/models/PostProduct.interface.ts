import { Product } from './index.models';

export interface PostProduct extends Omit<Product, 'id' | 'category'>{
    categoryId: number;

}