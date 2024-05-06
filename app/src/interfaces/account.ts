export interface AccountInterface {
    id: string;
    username: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
}

export interface AccountSessionInterface {
    id: string;
}

export interface AccountRepositoryInterface {
    findAll(
        page: number,
        pageSize: number,
        searchTerm: string,
        searchBy: string[],
        sort: string,
        sortBy: string[]
    ): Promise<AccountInterface[]>;
    create(account: AccountInterface): Promise<AccountInterface>;
    update(id: string, account: AccountInterface): Promise<AccountInterface>;
    delete(id: string): Promise<AccountInterface>;
    findById(id: string): Promise<AccountInterface | null>;
    findByUsername(username: string): Promise<AccountInterface | null>;
}