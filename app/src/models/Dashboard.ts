import {
    ManyToOne,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToMany,
} from "typeorm";

import { KibanaConnection } from "./KibanaConnection";
import { Group } from "./Group";
  
@Entity()
export class Dashboard {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column({unique: true})
    title: string;

    @Column({unique: true})
    url: string;
  
    @ManyToOne(() => KibanaConnection, (kibana) => kibana.dashboards)
    kibana: KibanaConnection;

    @ManyToMany(() => Group, (group) => group.dashboards)
    groups: Group[];
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
}