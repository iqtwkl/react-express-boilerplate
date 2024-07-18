import { AccountInterface } from "./account";

export interface GroupInterface {
    id: string;
    name: string;
    accounts?: AccountInterface[];
}