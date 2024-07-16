import { AccountInterface, ProfileInterface } from "../../components/entity/account";
import { AuthorizedAPIRequest } from ".";

const env = import.meta.env;

export class AccountAPI extends AuthorizedAPIRequest{
    URL:string = `${env.VITE_API_URL}/accounts`;

    constructor(token: string) {
        super(token);
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

        const response = await this.makeRequest(url, 'get');
        return response.data;
    }

    async getById(id: string): Promise<AccountInterface> {
        const url = `${this.URL}/${id}`;

        const response = await this.makeRequest(url, 'get');
        return response.data;
    }

    async delete(id: string): Promise<AccountInterface> {
        const url = `${this.URL}/${id}`;
        
        const response = await this.makeRequest(url, 'delete');
        return response.data;        
    }

    async create(account: AccountInterface): Promise<AccountInterface> {
        const url = `${this.URL}/`;

        const response = await this.makeRequest(url, 'post', account);
        return response.data;
    }

    async update(id: string, account: AccountInterface): Promise<AccountInterface> {
        const url = `${this.URL}/${id}`;

        const response = await this.makeRequest(url, 'put', account);
        return response.data;
    }

    async updateProfile(profile: ProfileInterface): Promise<AccountInterface> {
        const url = `${this.URL}/profile`;

        const response = await this.makeRequest(url, 'put', profile);
        return response.data;
    }

    async getProfile(): Promise<AccountInterface> {
        const url = `${this.URL}/profile`;

        const response = await this.makeRequest(url, 'get');
        return response.data;
    }
    
}