import { GroupRepositoryInterface, GroupInterface } from "../interfaces/group";
import { Group } from "../models/Group";
import { Account } from "../models/Account";
import { Dashboard } from "../models/Dashboard";
import { dbDataSource } from "../configs/db.config";
import {v4 as uuidv4} from 'uuid';
import { dbUtils } from '../utils/db';

export class GroupService implements GroupRepositoryInterface {
    async findAll(
        page: number = 1,
        amount: number = 10,
        search: string = '',
        search_by: string[] = ['name'],
        sort: string = 'ASC',
        sort_by: string[] = ['created_at']
    ): Promise<GroupInterface[]> {
        const groupRepository = dbDataSource.getRepository(Group);
        
        const groups = await groupRepository.find({
            skip: dbUtils.skipPage(page, amount),
            take: amount,
            where: dbUtils.whereConditions(search_by, search),
            order: dbUtils.orderConditions(sort_by, sort),
        });
        
        return groups;
    }
    async create(group: GroupInterface): Promise<GroupInterface> {
        const newGroup = new Group();
        newGroup.id = uuidv4();
        newGroup.name = group.name;
        
        const groupRepository = dbDataSource.getRepository(Group);
        
        await groupRepository.save(newGroup);
        
        return newGroup;
    }
    async update(id: string, group: GroupInterface): Promise<GroupInterface> {
        const groupRepository = dbDataSource.getRepository(Group);
        
        const groupToUpdate = await groupRepository.findOneBy({ id });
        if(!groupToUpdate) {
            throw new Error("Group not found");
        }
        groupToUpdate.name = group.name;
        await groupRepository.save(groupToUpdate);
        
        return groupToUpdate;
        
    }
    async delete(id: string): Promise<GroupInterface> {
        const groupRepository = dbDataSource.getRepository(Group);
        const groupToDelete = await groupRepository.findOneBy({ id });
        if(!groupToDelete){
            throw new Error("Group not found");
        }
        await groupRepository.delete(groupToDelete.id);
        
        return groupToDelete;
    }
    async findById(id: string): Promise<GroupInterface | null> {
        const groupRepository = dbDataSource.getRepository(Group);
        const group = await groupRepository.findOneBy({ id });
        if(!group){
            throw new Error("Group not found");
        }
        
        return group;
    }
    async findByName(name: string): Promise<GroupInterface | null> {
        const groupRepository = dbDataSource.getRepository(Group);
        const group = await groupRepository.findOneBy({ name });
        if(!group){
            throw new Error("Group not found");
        }
        
        return group;    
    }
    async addAccount(accountId: string, groupId: string): Promise<GroupInterface> {
        const accountRepository = dbDataSource.getRepository(Account);
        const accountToAdd = await accountRepository.findOneBy( {id: accountId} );
        if(!accountToAdd){
            throw new Error("Account not found");
        }
        const groupRepository = dbDataSource.getRepository(Group);
        const group = await groupRepository.findOneBy( {id: groupId} );
        if(!group){
            throw new Error("Group not found");
        }
        
        await groupRepository
              .createQueryBuilder()
              .relation(Group, 'accounts')
              .of(group)
              .add(accountToAdd);
        
        const accountsInGroup = await groupRepository.findOne({
            relations: {
                accounts: true,
            },
            where: { id: group.id }
        });
        
        return accountsInGroup;
    }
    async deleteAccount(accountId: string, groupId: string): Promise<GroupInterface> {
        const accountRepository = dbDataSource.getRepository(Account);
        const accountToDelete = await accountRepository.findOneBy( {id: accountId} );
        if(!accountToDelete){
            throw new Error("Account not found");
        }
        const groupRepository = dbDataSource.getRepository(Group);
        const group = await groupRepository.findOne({
            relations: {
                accounts: true,
            },
            where: { id: groupId }
        });
        
        if(!group){
            throw new Error("Group not Found");
        }
        group.accounts = group.accounts.filter((account) => {
            return account.id !== accountId;
        });
        await groupRepository.manager.save(group);

        const accountsInGroup = await groupRepository.findOne({
            relations: {
                accounts: true,
            },
            where: { id: group.id }
        });
        
        return accountsInGroup;
    }
    async listAccount(id: string): Promise<GroupInterface> {
        const groupRepository = dbDataSource.getRepository(Group);
        const group = await groupRepository.findOneBy( { id } );
        if(!group){
            throw new Error("Group not found");
        }
        const accountsInGroup = await groupRepository.findOne({
            relations: {
                accounts: true,
            },
            where: { id: group.id }
        });
        
        return accountsInGroup;
    }
    async addDashboard(dashboardId: string, groupId: string): Promise<GroupInterface> {
        const dashboardRepository = dbDataSource.getRepository(Dashboard);
        const dashboardToAdd = await dashboardRepository.findOneBy( {id: dashboardId} );
        if(!dashboardToAdd){
            throw new Error("Dashboard not found");
        }
        const groupRepository = dbDataSource.getRepository(Group);
        const group = await groupRepository.findOneBy( {id: groupId} );
        if(!group){
            throw new Error("Group not found");
        }
        
        await groupRepository
              .createQueryBuilder()
              .relation(Group, 'dashboards')
              .of(group)
              .add(dashboardToAdd);
        
        const dashboardsInGroup = await groupRepository.findOne({
            relations: {
                dashboards: true,
            },
            where: { id: group.id }
        });
        
        return dashboardsInGroup;
    }
    async deleteDashboard(dashboardId: string, groupId: string): Promise<GroupInterface> {
        const dashboardRepository = dbDataSource.getRepository(Dashboard);
        const dashboardToDelete = await dashboardRepository.findOneBy( {id: dashboardId} );
        if(!dashboardToDelete){
            throw new Error("Dashboard not found");
        }
        const groupRepository = dbDataSource.getRepository(Group);
        const group = await groupRepository.findOne({
            relations: {
                dashboards: true,
            },
            where: { id: groupId }
        });
        
        if(!group){
            throw new Error("Group not Found");
        }
        group.dashboards = group.dashboards.filter((dashboard) => {
            return dashboard.id !== dashboardId;
        });
        await groupRepository.manager.save(group);

        const dashboardsInGroup = await groupRepository.findOne({
            relations: {
                dashboards: true,
            },
            where: { id: group.id }
        });
        
        return dashboardsInGroup;
    }
    async listDashboard(id: string): Promise<GroupInterface> {
        const groupRepository = dbDataSource.getRepository(Group);
        const group = await groupRepository.findOneBy( { id } );
        if(!group){
            throw new Error("Group not found");
        }
        const dashboardsInGroup = await groupRepository.findOne({
            relations: {
                dashboards: true,
            },
            where: { id: group.id }
        });
        
        return dashboardsInGroup;
    }
}