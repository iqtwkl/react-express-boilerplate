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
    findAll(): Promise<AccountInterface[]>;
    create(user: AccountInterface): Promise<AccountInterface>;
    update(id: string, user: AccountInterface): Promise<AccountInterface>;
    delete(id: string): Promise<AccountInterface>;
    findById(id: string): Promise<AccountInterface | null>;
    findByUsername(username: string): Promise<AccountInterface | null>;
}