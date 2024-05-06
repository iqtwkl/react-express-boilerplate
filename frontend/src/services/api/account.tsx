import axios from "axios";

const env = import.meta.env;

export interface AccountInterface {
    username: string;
    email: string;
    password: string;
}

export class AccountAPI {
    URL:string = `${env.VITE_API_URL}/accounts`;

    async getAll(
        page = 1, 
        per_page = 10, 
        search = "", 
        search_by = "", 
        sort_by = "", 
        descending = undefined
    ) {
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

        const response = await axios.get(url);
        if (response.status != 200) {
            throw Error(`${response.status} : ${response.statusText}`)
        }
        return response.data;
    }

    async getById(id:number) {
        let url = `${this.URL}/${id}`;

        const response = await axios.get(url);
        if (response.status != 200) {
            throw Error(`${response.status} : ${response.statusText}`)
        }
        return response.data;
    }

    async delete(id:number) {
        let url = `${this.URL}/${id}`;

        const response = await axios.delete(url);
        if (response.status != 200) {
            throw Error(`${response.status} : ${response.statusText}`)
        }
        return response.data;
    }

    async create(account: AccountInterface) {
        let url = `${this.URL}/`;

        const response = await axios.post(url, account);
        if (response.status != 200) {
            throw Error(`${response.status} : ${response.statusText}`)
        }
        return response.data;
    }

    async update(id: number, account: AccountInterface) {
        let url = `${this.URL}/${id}`;

        const response = await axios.put(url, account);
        if (response.status != 200) {
            throw Error(`${response.status} : ${response.statusText}`)
        }
        return response.data;
    }
    
}