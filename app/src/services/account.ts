import { AccountRepositoryInterface, AccountInterface } from "../interfaces/account";
import { Account } from "../models/Account";
import { dbDataSource } from "../configs/db.config";
import { encrypt } from "../utils/encriptor";
import {v4 as uuidv4} from 'uuid';

export class AccountService implements AccountRepositoryInterface {
    async findAll(): Promise<AccountInterface[]> {
        const accountRepository = dbDataSource.getRepository(Account);
        const accounts = await accountRepository.find();
        
        accounts.forEach(function(v){ delete v.password });

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

        delete newAccount.password;

        return newAccount;
    }
    async update(id: string, user: AccountInterface): Promise<AccountInterface> {
        const accountRepository = dbDataSource.getRepository(Account);
        const accountToUpdate = await accountRepository.findOneBy({ id });
        if (!accountToUpdate) {
            throw new Error("User not found");
        }
        accountToUpdate.username = user.username;
        accountToUpdate.email = user.email;
        accountToUpdate.password = user.password;
        await accountRepository.save(accountToUpdate);

        delete accountToUpdate.password;

        return accountToUpdate;
    }
    async delete(id: string): Promise<AccountInterface> {
        const accountRepository = dbDataSource.getRepository(Account);
        const accountToDelete = await accountRepository.findOneBy({ id });
        if (!accountToDelete) {
            throw new Error("User not found");
        }
        await accountRepository.delete(accountToDelete);

        delete accountToDelete.password;

        return accountToDelete;
    }
    async findById(id: string): Promise<AccountInterface | null> {
        const accountRepository = dbDataSource.getRepository(Account);
        const account = await accountRepository.findOneBy({ id })

        delete account.password;

        return account;
    }
    async findByUsername(username: string): Promise<AccountInterface | null> {
        const accountRepository = dbDataSource.getRepository(Account);
        const account = await accountRepository.findOneBy({ username });
        
        return account;
    }
    
}