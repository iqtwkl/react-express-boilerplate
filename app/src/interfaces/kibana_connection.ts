export interface KibanaConnectionInterface {
    id: string;
    username: string;
    connection_name: string;
    password: string;
}

export interface KibanaConnectionRepositoryInterface {
    findAll(
        page: number,
        pageSize: number,
        searchTerm: string,
        searchBy: string[],
        sort: string,
        sortBy: string[]
    ): Promise<KibanaConnectionInterface[]>;
    create(kibana_connection: KibanaConnectionInterface): Promise<KibanaConnectionInterface>;
    update(id: string, kibana_connection: KibanaConnectionInterface): Promise<KibanaConnectionInterface>;
    delete(id: string): Promise<KibanaConnectionInterface>;
    findById(id: string): Promise<KibanaConnectionInterface | null>;
    findByName (connection_name: string): Promise<KibanaConnectionInterface | null>;
}