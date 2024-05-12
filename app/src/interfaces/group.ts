import { AccountInterface } from "./account";

export interface GroupInterface {
    id: string;
    name: string;
}

export interface GroupRepositoryInterface {
    findAll(
        page: number,
        pageSize: number,
        searchTerm: string,
        searchBy: string[],
        sort: string,
        sortBy: string[]
    ): Promise<GroupInterface[]>;
    create(group: GroupInterface): Promise<GroupInterface>;
    update(id: string, group: GroupInterface): Promise<GroupInterface>;
    delete(id: string): Promise<GroupInterface>;
    findById(id: string): Promise<GroupInterface | null>;
    findByName(name: string): Promise<GroupInterface | null>;
    addAccount(accountId: string, groupId: string): Promise<AccountInterface[]>;
    deleteAccount(accountId: string, groupId: string): Promise<AccountInterface[]>;
    listAccount(groupId: string): Promise<AccountInterface[]>;
}