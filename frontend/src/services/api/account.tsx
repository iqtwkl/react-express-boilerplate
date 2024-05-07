import axios from "axios";
import { AccountInterface } from "../../components/entity/account";

const env = import.meta.env;

export class AccountAPI {
    URL:string = `${env.VITE_API_URL}/accounts`;
    config:object = {};

    constructor(token: string) {
        this.config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        } ;
    }

    async getAll(
        page = 1, 
        per_page = 10, 
        search = "", 
        search_by = "", 
        sort_by = "", 
        descending = undefined
    ): Promise<AccountInterface[]> {
        let url = `${this.URL}/?page=${page}&per_page=${per_page}`;
        
        if (search != "") {
            url = `${url}&search=${search}`;
        }
        if (search_by != "") {
            url = `${url}&search_by=${search_by}`;
        }
        if (sort_by != "") {
            url = `${url}&sort_by=${sort_by}`;
        }
        if (descending != undefined) {
            url = `${url}&descending=${descending}`;
        }

        try {
            const response = await axios.get(url, this.config);
            if (response.status !== 200) {
                throw new Error(`${response.status} : ${response.statusText}`);
            }
            return response.data; // Pastikan Anda mengembalikan respons data, bukan hanya respons
        } catch (error: Error) {
            throw new Error(`Failed to fetch data: ${error.message}`);
        }
    }

    async getById(id:number): Promise<AccountInterface> {
        let url = `${this.URL}/${id}`;

        const response = await axios.get(url);
        if (response.status != 200) {
            throw Error(`${response.status} : ${response.statusText}`)
        }
        return response.data;
    }

    async delete(id:number): Promise<AccountInterface> {
        let url = `${this.URL}/${id}`;

        const response = await axios.delete(url);
        if (response.status != 200) {
            throw Error(`${response.status} : ${response.statusText}`)
        }
        return response.data;
    }

    async create(account: AccountInterface): Promise<AccountInterface> {
        let url = `${this.URL}/`;

        const response = await axios.post(url, account);
        if (response.status != 200) {
            throw Error(`${response.status} : ${response.statusText}`)
        }
        return response.data;
    }

    async update(id: number, account: AccountInterface): Promise<AccountInterface> {
        let url = `${this.URL}/${id}`;

        const response = await axios.put(url, account);
        if (response.status != 200) {
            throw Error(`${response.status} : ${response.statusText}`)
        }
        return response.data;
    }
    
}