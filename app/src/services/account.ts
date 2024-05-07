import { AccountRepositoryInterface, AccountInterface } from "../interfaces/account";
import { Account } from "../models/Account";
import { dbDataSource } from "../configs/db.config";
import { encrypt } from "../utils/encriptor";
import {v4 as uuidv4} from 'uuid';
import { dbUtils } from '../utils/db'

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
        newAccount.password = hashPassword;

        // create account process
        const accountRepository = dbDataSource.getRepository(Account);
        
        await accountRepository.save(newAccount);

        return newAccount;
    }
    async update(id: string, account: AccountInterface): Promise<AccountInterface> {
        const accountRepository = dbDataSource.getRepository(Account);
        const accountToUpdate = await accountRepository.findOneBy({ id });
        if (!accountToUpdate) {
            throw new Error("User not found");
        }
        accountToUpdate.username = account.username;
        accountToUpdate.email = account.email;
        accountToUpdate.password = account.password;
        await accountRepository.save(accountToUpdate);

        return accountToUpdate;
    }
    async delete(id: string): Promise<AccountInterface> {
        const accountRepository = dbDataSource.getRepository(Account);
        const accountToDelete = await accountRepository.findOneBy({ id });
        if (!accountToDelete) {
            throw new Error("User not found");
        }
        await accountRepository.delete(accountToDelete);

        return accountToDelete;
    }
    async findById(id: string): Promise<AccountInterface | null> {
        const accountRepository = dbDataSource.getRepository(Account);
        const account = await accountRepository.findOneBy({ id })

        return account;
    }
    async findByUsername(username: string): Promise<AccountInterface | null> {
        const accountRepository = dbDataSource.getRepository(Account);
        const account = await accountRepository.findOneBy({ username });
        
        return account;
    }
    
}