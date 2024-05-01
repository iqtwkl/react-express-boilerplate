import { Request } from "express";
import { PaginationSortingSearchParameter } from "../interfaces/request";

export class RequestUtils {
    static parsePaginationQueryString(req: Request): PaginationSortingSearchParameter {
        const { 
            page, 
            amount, 
            search, 
            search_by, 
            sort, 
            sort_by 
        } = req.query;

        // Konversi nilai page dan amount menjadi tipe data number, dan atur nilai default jika tidak diberikan
        const pageNumber = page ? parseInt(String(page), 10) : 1;
        const amountNumber = amount ? parseInt(String(amount), 10) : 10;

        // Konversi nilai search menjadi string, dan atur nilai default jika tidak diberikan
        const searchString = search ? String(search) : '';

        // Konversi nilai search_by menjadi array dari string, dan atur nilai default jika tidak diberikan
        const searchByArray: string[] = Array.isArray(search_by) ? search_by.map(String) : undefined;
        
        // Konversi nilai sort menjadi string, dan atur nilai default jika tidak diberikan
        const sortString = sort ? String(sort) : 'ASC';

        // Konversi nilai sort_by menjadi array dari string, dan atur nilai default jika tidak diberikan
        const sortByArray: string[] = Array.isArray(sort_by) ? sort_by.map(String) : undefined;

        // Buat objek PaginationSortingSearchParameter dari nilai-nilai yang telah diubah
        const parsedRequest: PaginationSortingSearchParameter = {
            page: pageNumber, 
            amount: amountNumber, 
            search: searchString, 
            search_by: searchByArray, 
            sort: sortString, 
            sort_by: sortByArray
        };

        return parsedRequest;
    }
}