import { Account } from '../../../models/Account';
import { faker } from '@faker-js/faker';
import { AccountService } from "../../../services/account"
import { Profile } from '../../../models/Profile';

export const createAccountSeed = async () => {
    const service = new AccountService();

    const account = new Account();
    account.username = faker.internet.userName();
    account.email = faker.internet.exampleEmail();
    account.password = "somepassword";

    const profile = new Profile();
    profile.fullName = faker.person.fullName();
    profile.bio = faker.lorem.sentence();
    profile.avatarUrl = faker.image.avatar();      

    account.profile = profile;
    try {
        var createdAccount = await service.create(account);
        createdAccount = await service.addProfile(createdAccount, profile);
        console.log(`account added ${createdAccount.username}: ${createdAccount.profile.fullName}`);
    } catch (error) {
        console.error('Error creating account:', error);
    }
    
};// console.log(createdAccount);