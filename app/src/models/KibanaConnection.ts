import {
    OneToMany,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

import { Dashboard } from "./Dashboard";
  
@Entity()
export class KibanaConnection {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column()
    username: string;
  
    @Column({unique: true})
    connection_name: string;
  
    @Column()
    password: string;

    @OneToMany(() => Dashboard, (dashboard) => dashboard.kibana)
    dashboards: Dashboard[]
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
}