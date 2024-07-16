import { KibanaConnectionRepositoryInterface, KibanaConnectionInterface } from "../interfaces/kibana_connection";
import { KibanaConnection } from "../models/KibanaConnection";
import { dbDataSource } from "../configs/db.config";
import {v4 as uuidv4} from 'uuid';
import { dbUtils } from '../utils/db';

export class KibanaConnectionService implements KibanaConnectionRepositoryInterface {
    async findAll(
        page: number = 1,
        amount: number = 10,
        search: string = '',
        search_by: string[] = ['connection_name'],
        sort: string = 'ASC',
        sort_by: string[] = ['created_at']
    ): Promise<KibanaConnectionInterface[]> {
        const kibanaConnectionRepository = dbDataSource.getRepository(KibanaConnection);
        const kibanaConnections = await kibanaConnectionRepository.find({
            skip: dbUtils.skipPage(page, amount),
            take: amount,
            where: dbUtils.whereConditions(search_by, search),
            order: dbUtils.orderConditions(sort_by, sort),
        });

        return kibanaConnections;
    }
    async create(kibana_connection: KibanaConnectionInterface): Promise<KibanaConnectionInterface> {
        const newKibanaConnection = new KibanaConnection();
        newKibanaConnection.id = uuidv4();
        newKibanaConnection.connection_name = kibana_connection.connection_name;
        newKibanaConnection.username = kibana_connection.username;
        newKibanaConnection.password = kibana_connection.password;
        
        const kibanaConnectionRepository = dbDataSource.getRepository(KibanaConnection);
        
        await kibanaConnectionRepository.save(newKibanaConnection);
        
        return newKibanaConnection;
    }
    async update(id: string, kibana_connection: KibanaConnectionInterface): Promise<KibanaConnectionInterface> {
        const kibanaConnectionRepository = dbDataSource.getRepository(KibanaConnection);
        
        const kibanaConnectionToUpdate = await kibanaConnectionRepository.findOneBy({ id });
        if(!kibanaConnectionToUpdate) {
            throw new Error("Kibana Connection not found");
        }
        kibanaConnectionToUpdate.connection_name = kibana_connection.connection_name;
        kibanaConnectionToUpdate.username = kibana_connection.username;
        kibanaConnectionToUpdate.password = kibana_connection.password;
        await kibanaConnectionRepository.save(kibanaConnectionToUpdate);
        
        return kibanaConnectionToUpdate;
    }
    async delete(id: string): Promise<KibanaConnectionInterface> {
        const kibanaConnectionRepository = dbDataSource.getRepository(KibanaConnection);
        const kibanaConnectionToDelete = await kibanaConnectionRepository.findOneBy({ id });
        if(!kibanaConnectionToDelete){
            throw new Error("Kibana Connection not found");
        }
        await kibanaConnectionRepository.delete(kibanaConnectionToDelete.id);
        
        return kibanaConnectionToDelete;
    }
    async findById(id: string): Promise<KibanaConnectionInterface | null> {
        const kibanaConnectionRepository = dbDataSource.getRepository(KibanaConnection);
        const kibanaConnection = await kibanaConnectionRepository.findOneBy({ id });
        if(!kibanaConnection){
            throw new Error("Kibana Connection not found");
        }
        
        return kibanaConnection;
    }
    async findByName(connection_name: string): Promise<KibanaConnectionInterface | null> {
        const kibanaConnectionRepository = dbDataSource.getRepository(KibanaConnection);
        const kibanaConnection = await kibanaConnectionRepository.findOneBy({ connection_name });
        if(!kibanaConnection){
            throw new Error("Kibana Connection not found");
        }
        
        return kibanaConnection;  
    }

}