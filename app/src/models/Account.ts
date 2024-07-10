import {
    Column,
    CreateDateColumn,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToMany,
} from "typeorm";

import { Profile } from "./Profile";
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

    @Column()
    is_admin: number;

    @ManyToMany(() => Group, (group) => group.accounts)
    groups: Group[];
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;

    @OneToOne(() => Profile, profile => profile.account, { onDelete: 'CASCADE' })
    profile: Profile;
}