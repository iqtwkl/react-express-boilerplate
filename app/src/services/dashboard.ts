import { DashboardRepositoryInterface, DashboardInterface } from "../interfaces/dashboard";
import { KibanaConnection } from "../models/KibanaConnection";
import { Dashboard } from "../models/Dashboard";
import { dbDataSource } from "../configs/db.config";
import {v4 as uuidv4} from 'uuid';
import { dbUtils } from '../utils/db';

export class DashboardService implements DashboardRepositoryInterface {
    async findAll(
        page: number = 1,
        amount: number = 10,
        search: string = '',
        search_by: string[] = ['title'],
        sort: string = 'ASC',
        sort_by: string[] = ['created_at']
    ): Promise<DashboardInterface[]> {
        const dashboardRepository = dbDataSource.getRepository(Dashboard);
        const dashboards = await dashboardRepository.find({
            skip: dbUtils.skipPage(page, amount),
            take: amount,
            where: dbUtils.whereConditions(search_by, search),
            order: dbUtils.orderConditions(sort_by, sort),
        });

        return dashboards;
    }
    async findById(id: string): Promise<DashboardInterface | null> {
        const dashboardRepository = dbDataSource.getRepository(Dashboard);
        const dashboard = await dashboardRepository.findOneBy({ id })
        
        return dashboard;    
    }
    async findByTitle(title: string): Promise<DashboardInterface | null> {
        const dashboardRepository = dbDataSource.getRepository(Dashboard);
        const dashboard = await dashboardRepository.findOneBy({ title })
        
        return dashboard;
    }
    async create(kibanaId: string, dashboard: DashboardInterface): Promise<DashboardInterface> {
        const kibanaRepository = dbDataSource.getRepository(KibanaConnection);
        const kibana = await kibanaRepository.findOneBy({ id: kibanaId });
        if(!kibana){
            throw new Error("Kibana Connection not found")
        }
        const dashboardRepository = dbDataSource.getRepository(Dashboard);
        const newDashboard = new Dashboard();
        newDashboard.id = uuidv4();
        newDashboard.title = dashboard.title;
        newDashboard.url = dashboard.url;
        newDashboard.kibana = kibana;
        
        dashboardRepository.save(newDashboard);

        return newDashboard;
    }
    async update(id: string, kibanaId: string, dashboard: DashboardInterface): Promise<DashboardInterface> {
        const kibanaRepository = dbDataSource.getRepository(KibanaConnection);
        const kibana = await kibanaRepository.findOneBy({ id: kibanaId });
        if(!kibana){
            throw new Error("Kibana Connection not found")
        }
        const dashboardRepository = dbDataSource.getRepository(Dashboard);
        const dashboardToUpdate = await dashboardRepository.findOneBy({ id });
        if(!dashboardToUpdate){
            throw new Error("Dashboard not found");
        }
        dashboardToUpdate.title = dashboard.title;
        dashboardToUpdate.url = dashboard.url;
        dashboardToUpdate.kibana = kibana;
        dashboardRepository.save(dashboardToUpdate);

        return dashboardToUpdate;
    }
    async delete(id: string): Promise<DashboardInterface> {
        const dashboardRepository = dbDataSource.getRepository(Dashboard);
        const dashboardToDelete = await dashboardRepository.findOneBy({ id });
        if(!dashboardToDelete){
            throw new Error("Dashboard not found");
        }
        await dashboardRepository.delete(dashboardToDelete.id);
        
        return dashboardToDelete;    
    }
}