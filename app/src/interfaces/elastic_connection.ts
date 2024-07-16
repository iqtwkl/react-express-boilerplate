export interface ElasticConnectionInterface {
    id: string;
    username: string;
    connection_name: string;
    password: string;
    index: string;
}

export interface ElasticConnectionRepositoryInterface {
    findAll(
        page: number,
        pageSize: number,
        searchTerm: string,
        searchBy: string[],
        sort: string,
        sortBy: string[]
    ): Promise<ElasticConnectionInterface[]>;
    create(elastic_connection: ElasticConnectionInterface): Promise<ElasticConnectionInterface>;
    update(id: string, elastic_connection: ElasticConnectionInterface): Promise<ElasticConnectionInterface>;
    delete(id: string): Promise<ElasticConnectionInterface>;
    findById(id: string): Promise<ElasticConnectionInterface | null>;
    findByName (connection_name: string): Promise<ElasticConnectionInterface | null>;
}