import axios, { AxiosError, AxiosResponse } from "axios";
import { ApplicationError } from "../../components/common/error";

export class AuthorizedAPIRequest {
    config:object = {};

    constructor(token: string) {
        this.config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        } ;
    }

    async makeRequest(url: string, method: 'get' | 'post' | 'put' | 'delete', data?: object): Promise<AxiosResponse> {
        try {
            let response;
            switch (method) {
              case 'get':
                response = await axios.get(url, this.config);
                break;
              case 'post':
                response = await axios.post(url, data, this.config);
                break;
              case 'put':
                response = await axios.put(url, data, this.config);
                break;
              case 'delete':
                response = await axios.delete(url, this.config);
                break;
              default:
                throw new ApplicationError(500, 'Invalid method');
            }
            return response;
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response) {
                    throw new ApplicationError(error.response.status, error.response.statusText);
                } else if (error.request) {
                    throw new ApplicationError(400, error.message);
                } 
                throw new ApplicationError(500, error.message);
            } else if (error instanceof Error) {
                throw new ApplicationError(500, error.message);
            }
            throw new ApplicationError(500, 'something went wrong');
        }
    }
}