import { Category, Filters, SortBy } from "../models";

export type TFiltersType = Filters.category | Filters.sort;

export type TCategory = Category.all | Category.phones | Category.laptops | Category.tablets;

export type TSortBy = SortBy.name | SortBy.price;

export interface IProduct {
  id: number;
  name: string;
  price: number;
  category: 'phones' | 'laptops' | 'tablets';
  image: string;
  description: string;
};

export interface ICartItem extends IProduct {
  quantity: number;
};

export interface IUser {
  id: number;
  name: string;
  email: string;
};

export interface IAppState {
  products: IProduct[];
  cart: ICartItem[];
  user: IUser | null;
  loading: boolean;
  error: string | null;
};

export interface IGeneralQuery {
  search?: string;
  category?: TCategory;
  sort?: TSortBy;
}