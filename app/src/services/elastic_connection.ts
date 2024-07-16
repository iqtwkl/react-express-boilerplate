import { ElasticConnectionRepositoryInterface, ElasticConnectionInterface } from "../interfaces/elastic_connection";
import { ElasticConnection } from "../models/ElasticConnection";
import { dbDataSource } from "../configs/db.config";
import {v4 as uuidv4} from 'uuid';
import { dbUtils } from '../utils/db';

export class ElasticConnectionService implements ElasticConnectionRepositoryInterface {
    async findAll(
        page: number = 1,
        amount: number = 10,
        search: string = '',
        search_by: string[] = ['connection_name'],
        sort: string = 'ASC',
        sort_by: string[] = ['created_at']
    ): Promise<ElasticConnectionInterface[]> {
        const elasticConnectionRepository = dbDataSource.getRepository(ElasticConnection);
        const ElasticConnections = await elasticConnectionRepository.find({
            skip: dbUtils.skipPage(page, amount),
            take: amount,
            where: dbUtils.whereConditions(search_by, search),
            order: dbUtils.orderConditions(sort_by, sort),
        });

        return ElasticConnections;
    }
    async create(elastic_connection: ElasticConnectionInterface): Promise<ElasticConnectionInterface> {
        const newElasticConnection = new ElasticConnection();
        newElasticConnection.id = uuidv4();
        newElasticConnection.connection_name = elastic_connection.connection_name;
        newElasticConnection.username = elastic_connection.username;
        newElasticConnection.password = elastic_connection.password;
        newElasticConnection.index = elastic_connection.index;
        
        const elasticConnectionRepository = dbDataSource.getRepository(ElasticConnection);
        
        await elasticConnectionRepository.save(newElasticConnection);
        
        return newElasticConnection;
    }
    async update(id: string, elastic_connection: ElasticConnectionInterface): Promise<ElasticConnectionInterface> {
        const elasticConnectionRepository = dbDataSource.getRepository(ElasticConnection);
        
        const elasticConnectionToUpdate = await elasticConnectionRepository.findOneBy({ id });
        if(!elasticConnectionToUpdate) {
            throw new Error("Elastic Connection not found");
        }
        elasticConnectionToUpdate.connection_name = elastic_connection.connection_name;
        elasticConnectionToUpdate.username = elastic_connection.username;
        elasticConnectionToUpdate.password = elastic_connection.password;
        elasticConnectionToUpdate.index = elastic_connection.index;
        await elasticConnectionRepository.save(elasticConnectionToUpdate);
        
        return elasticConnectionToUpdate;
    }
    async delete(id: string): Promise<ElasticConnectionInterface> {
        const elasticConnectionRepository = dbDataSource.getRepository(ElasticConnection);
        const elasticConnectionToDelete = await elasticConnectionRepository.findOneBy({ id });
        if(!elasticConnectionToDelete){
            throw new Error("Elastic Connection not found");
        }
        await elasticConnectionRepository.delete(elasticConnectionToDelete.id);
        
        return elasticConnectionToDelete;
    }
    async findById(id: string): Promise<ElasticConnectionInterface | null> {
        const elasticConnectionRepository = dbDataSource.getRepository(ElasticConnection);
        const elasticConnection = await elasticConnectionRepository.findOneBy({ id });
        if(!elasticConnection){
            throw new Error("Elastic Connection not found");
        }
        
        return elasticConnection;
    }
    async findByName(connection_name: string): Promise<ElasticConnectionInterface | null> {
        const elasticConnectionRepository = dbDataSource.getRepository(ElasticConnection);
        const elasticConnection = await elasticConnectionRepository.findOneBy({ connection_name });
        if(!elasticConnection){
            throw new Error("Elastic Connection not found");
        }
        
        return elasticConnection;  
    }
    
}