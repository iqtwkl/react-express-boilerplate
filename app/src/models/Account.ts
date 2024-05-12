import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToMany,
} from "typeorm";

import { Group } from "./Group";
import { Dashboard } from "./Dashboard";
  
@Entity()
export class Account {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column({unique: true})
    username: string;
  
    @Column({unique: true})
    email: string;
  
    @Column()
    password: string;

    @ManyToMany(() => Group, (group) => group.accounts)
    groups: Group[];
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
}