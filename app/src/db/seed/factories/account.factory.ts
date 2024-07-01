import { Account } from '../../../models/Account';
import { faker } from '@faker-js/faker';
import { AccountService } from "../../../services/account"

export const createAccountSeed = async () => {
    const service = new AccountService();

    const account = new Account();
    account.username = faker.internet.userName();
    account.email = faker.internet.exampleEmail();
    account.password = "somepassword";

    const createdAccount = await service.create(account);
    console.log(`account added ${createdAccount.username}`);
};