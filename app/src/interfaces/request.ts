import { Request } from "express";


export interface CustomRequest extends Request {
  currentUser?: any;
  file?: any;
}

export interface PaginationSortingSearchParameter {
  page: number,
  amount: number,
  search: string,
  search_by: string[],
  sort: string,
  sort_by: string[]
}