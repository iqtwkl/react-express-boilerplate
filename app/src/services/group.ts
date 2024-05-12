import { GroupRepositoryInterface, GroupInterface } from "../interfaces/group";
import { AccountRepositoryInterface, AccountInterface } from "../interfaces/account";
import { Group } from "../models/Group";
import { Account } from "../models/Account";
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
        await groupRepository.delete(groupToDelete);
        
        return groupToDelete;
    }
    async findById(id: string): Promise<GroupInterface | null> {
        const groupRepository = dbDataSource.getRepository(Group);
        const group = await groupRepository.findOneBy({ id });
        
        return group;
    }
    async findByName(name: string): Promise<GroupInterface | null> {
        const groupRepository = dbDataSource.getRepository(Group);
        const group = await groupRepository.findOneBy({ name });
        
        return group;    
    }
    async addAccount(accountId: string, groupId: string): Promise<AccountInterface[]> {
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
        
        group.accounts = [accountToAdd];
        await groupRepository.manager.save(group);
        
        const accounts = await accountRepository.find({
            relations: {
                groups: true,
            },
            where: { groups: group },
        });
        
        return accounts;
    }
    async deleteAccount(accountId: string, groupId: string): Promise<AccountInterface[]> {
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

        const accounts = await accountRepository.find({
            relations: {
                groups: true,
            },
            where: { groups: group },
        });
        
        return accounts;
    }
    async listAccount(groupId: string): Promise<AccountInterface[]> {
        const groupRepository = dbDataSource.getRepository(Group);
        const group = await groupRepository.findOneBy( {id: groupId} );
        if(!group){
            throw new Error("Group not found");
        }
        const accountRepository = dbDataSource.getRepository(Account);
        const accounts = await accountRepository.find({
            relations: {
                groups: true,
            },
            where: { groups: group },
        });
        
        return accounts;
    }
}