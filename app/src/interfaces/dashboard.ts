export interface DashboardInterface {
    id: string;
    title: string;
    url: string;
}

export interface DashboardRepositoryInterface {
    findAll(
        page: number,
        pageSize: number,
        searchTerm: string,
        searchBy: string[],
        sort: string,
        sortBy: string[]
    ): Promise<DashboardInterface[]>;
    create(kibanaId: string, dashboard: DashboardInterface): Promise<DashboardInterface>;
    update(id: string, kibanaId: string, dashboard: DashboardInterface): Promise<DashboardInterface>;
    delete(id: string): Promise<DashboardInterface>;
    findById(id: string): Promise<DashboardInterface | null>;
    findByTitle(title: string): Promise<DashboardInterface | null>;
}