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
    addAccount(accountIds: string[], groupId: string): Promise<GroupInterface>;
    deleteAccount(accountIds: string[], groupId: string): Promise<GroupInterface>;
    listAccount(id: string): Promise<GroupInterface>;
    addDashboard(dashboardIds: string[], groupId: string): Promise<GroupInterface>;
    deleteDashboard(dashboardIds: string[], groupId: string): Promise<GroupInterface>;
    listDashboard(id: string): Promise<GroupInterface>;
}