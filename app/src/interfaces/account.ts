export interface AccountInterface {
    id: string;
    username: string;
    email: string;
    password: string;
    is_admin: number;
    created_at: Date;
    updated_at: Date;
    profile: ProfileInterface;
}

export interface ProfileInterface {
    id: string;
    fullName: string;
    bio: string;
    avatarUrl:string;
    created_at: Date;
    updated_at: Date;
}

export interface AccountSessionInterface {
    id: string;
    username: string;
    fullName: string;
    email: string;
    is_admin: boolean;
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