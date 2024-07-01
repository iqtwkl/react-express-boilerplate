import { dbDataSource } from "../../../configs/db.config";
import { Account } from "../../../models/Account";
import { createAccountSeed } from "../factories/account.factory"; 

export default class InitialDatabaseSeed {
    static async run(): Promise<void> {
        try {
            await dbDataSource.initialize();
            await createAccountSeed();
            console.log('Database seeding completed');
            process.exit(0);
        } catch (err) {
            console.error('Database seeding failed:', err);
            process.exit(1);
        }
    }

}

InitialDatabaseSeed.run();