import { AccountRepositoryInterface, AccountInterface, ProfileInterface } from "../interfaces/account";
import { Account } from "../models/Account";
import { dbDataSource } from "../configs/db.config";
import { encrypt } from "../utils/encriptor";
import {v4 as uuidv4} from 'uuid';
import { dbUtils } from '../utils/db'
import { Profile } from "../models/Profile";

export class AccountService implements AccountRepositoryInterface {
    async findAll(
        page: number = 1,
        amount: number = 10,
        search: string = '',
        search_by: string[] = ['username', 'email'],
        sort: string = 'ASC',
        sort_by: string[] = ['created_at']
    ): Promise<AccountInterface[]> {
        const accountRepository = dbDataSource.getRepository(Account);

        const accounts = await accountRepository.find({
            skip: dbUtils.skipPage(page, amount),
            take: amount,
            where: dbUtils.whereConditions(search_by, search),
            order: dbUtils.orderConditions(sort_by, sort),
        });

        return accounts;
    }
    async create(account: AccountInterface): Promise<AccountInterface> {
        const hashPassword = await encrypt.encryptPassword(account.password);

        //new account object
        const newAccount = new Account();
        newAccount.id = uuidv4();
        newAccount.username = account.username;
        newAccount.email = account.email;
        newAccount.is_admin = account.is_admin;
        newAccount.password = hashPassword;
        newAccount.is_admin = account.is_admin;

        // create account process
        const accountRepository = dbDataSource.getRepository(Account);
        
        await accountRepository.save(newAccount);

        return newAccount;
    }
    async addProfile(account: AccountInterface, profile: ProfileInterface | null): Promise<AccountInterface> {
        const newProfile = new Profile();
        if (!profile) {
            newProfile.fullName = account.username;
            newProfile.bio = 'I am a Person';
            newProfile.avatarUrl = '/default-user.png';
            newProfile.accountId = account.id;
        } else {
            newProfile.fullName = profile.fullName;
            newProfile.bio = profile.bio;
            newProfile.avatarUrl = profile.avatarUrl;
            newProfile.accountId = account.id;
        }
    
        const profileRepository = dbDataSource.getRepository(Profile);
    
        await profileRepository.save(newProfile);
    
        return this.findById(account.id);
    }
    async updateProfile(account: AccountInterface, profile: ProfileInterface | null): Promise<AccountInterface> {
        const profileToUpdate = account.profile as Profile;
        if (!profileToUpdate) {
            throw new Error("Profile not found");
        }
        profileToUpdate.fullName = profile.fullName;
        profileToUpdate.bio = profile.bio;
        profileToUpdate.avatarUrl = profile.avatarUrl;
        profileToUpdate.accountId = account.id;
    
        const profileRepository = dbDataSource.getRepository(Profile);
    
        await profileRepository.save(profileToUpdate);
    
        return this.findById(account.id);
    }
    async update(id: string, account: AccountInterface): Promise<AccountInterface> {
        const accountRepository = dbDataSource.getRepository(Account);
        const accountToUpdate = await accountRepository.findOneBy({ id });
        if (!accountToUpdate) {
            throw new Error("Account not found");
        }
        accountToUpdate.username = account.username;
        accountToUpdate.email = account.email;
        accountToUpdate.is_admin = account.is_admin;
        accountToUpdate.password = account.password;
        await accountRepository.save(accountToUpdate);

        return accountToUpdate;
    }
    async delete(id: string): Promise<AccountInterface> {
        const accountRepository = dbDataSource.getRepository(Account);
        const accountToDelete = await accountRepository.findOneBy({ id });
        if (!accountToDelete) {
            throw new Error("Account not found");
        }
        await accountRepository.delete(accountToDelete.id);

        return accountToDelete;
    }
    async findById(id: string): Promise<AccountInterface | null> {
        const accountRepository = dbDataSource.getRepository(Account);
        const account = await accountRepository.findOne({
            relations: {
                profile: true,
            },
            where: { id }
        });
        

        return account;
    }
    async findByUsername(username: string): Promise<AccountInterface | null> {
        const accountRepository = dbDataSource.getRepository(Account);
        const account = await accountRepository.findOne({
            relations: {
                profile: true,
            },
            where: { username }
        });
        
        return account;
    }
    
}