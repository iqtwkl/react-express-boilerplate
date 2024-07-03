import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
} from "typeorm";

import { Dashboard } from "./Dashboard";
import { Account } from "./Account"; 


@Entity()
export class Group {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column({unique: true})
    name: string;

    @ManyToMany(() => Dashboard, (dashboard) => dashboard.groups)
    @JoinTable()
    dashboards: Dashboard[]
  
    @ManyToMany(() => Account, (account) => account.groups)
    @JoinTable()
    accounts: Account[]

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
}