import axios from "axios";
import { LoginResponseInterface } from "../../components/entity/loginResponse";

const env = import.meta.env;

console.log(env);

export class AuthAPI {
    URL:string = `${env.VITE_API_URL}/auth`;

    async login(username:string, password:string): Promise<LoginResponseInterface> {
        const request = {
            username: username,
            password: password
        }
        const response = await axios.post(`${this.URL}/login/`, request);
        if (response.status != 200) {
            throw new Error(`${response.status} : ${response.data}`)
        }
        return response.data;
    }
}