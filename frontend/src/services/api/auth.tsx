import axios from "axios";

const env = import.meta.env;

console.log(env);

export class AuthAPI {
    URL:string = `${env.VITE_API_URL}/auth`;

    async login(username:string, password:string) {
        const request = {
            username: username,
            password: password
        }
        const response = await axios.post(`${this.URL}/login/`, request);
        if (response.status != 200) {
            throw new Error(`${response.status} : ${response.statusText}`)
        }
        return response.data;
    }
}