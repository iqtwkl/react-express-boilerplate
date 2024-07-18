import { AuthorizedAPIRequest } from ".";
import { GroupInterface } from "../../components/entity/group";

const env = import.meta.env;

export class GroupAPI extends AuthorizedAPIRequest{
    URL:string = `${env.VITE_API_URL}/group`;

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
    ): Promise<GroupInterface[]> {
        let url = `${this.URL}s/?page=${page}&per_page=${per_page}`;
        
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

    async getById(id: string): Promise<GroupInterface> {
        const url = `${this.URL}/${id}`;

        const response = await this.makeRequest(url, 'get');
        return response.data;
    }

    async delete(id: string): Promise<GroupInterface> {
        const url = `${this.URL}/${id}`;
        
        const response = await this.makeRequest(url, 'delete');
        return response.data;        
    }

    async create(account: GroupInterface): Promise<GroupInterface> {
        const url = `${this.URL}/`;

        const response = await this.makeRequest(url, 'post', account);
        return response.data;
    }

    async update(id: string, account: GroupInterface): Promise<GroupInterface> {
        const url = `${this.URL}/${id}`;

        const response = await this.makeRequest(url, 'put', account);
        return response.data;
    }

    async getByName(name: string): Promise<GroupInterface> {
        const url = `${this.URL}/name/${name}`;

        const response = await this.makeRequest(url, 'get');
        return response.data;
    }

    async getAccounts(id: string): Promise<GroupInterface> {
        const url = `${this.URL}/${id}/accounts`;

        const response = await this.makeRequest(url, 'get');
        return response.data;
    }

    async getDashboards(id: string): Promise<GroupInterface> {
        const url = `${this.URL}/${id}/dashboards`;

        const response = await this.makeRequest(url, 'get');
        return response.data;
    }

    async addAccount(id: string, accountId: string): Promise<GroupInterface> {
        const url = `${this.URL}/${id}/account`;

        const response = await this.makeRequest(url, 'post', {accountId: accountId});
        return response.data;
    }

    async deleteAccount(id: string, accountId: string): Promise<GroupInterface> {
        const url = `${this.URL}/${id}/account`;

        const response = await this.makeRequest(url, 'delete', {accountId: accountId});
        return response.data;
    }

    async addDashboard(id: string, dashboardId: string): Promise<GroupInterface> {
        const url = `${this.URL}/${id}/dashboard`;

        const response = await this.makeRequest(url, 'post', {dashboardId: dashboardId});
        return response.data;
    }

    async deleteDashboard(id: string, dashboardId: string): Promise<GroupInterface> {
        const url = `${this.URL}/${id}/dashboard`;

        const response = await this.makeRequest(url, 'delete', {dashboardId: dashboardId});
        return response.data;
    }
    
}