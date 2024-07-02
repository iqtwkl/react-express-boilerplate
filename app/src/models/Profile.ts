import {
    Column,
    Entity,
    OneToOne,
    JoinColumn,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import { Account } from "./Account";

@Entity()
export class Profile {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    fullName: string;

    @Column({ nullable: true })
    bio: string;

    @Column({ nullable: true })
    avatarUrl: string;

    @Column()
    accountId: string;

    @OneToOne(() => Account, account => account.profile)
    @JoinColumn({ name: "accountId" })
    account: Account;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
