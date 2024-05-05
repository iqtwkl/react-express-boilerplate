import {
    ManyToOne,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

import { KibanaConnection } from "./KibanaConnection";
  
@Entity()
export class Dashboard {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column({unique: true})
    name: string;
  
    @ManyToOne(() => KibanaConnection, (kibana) => kibana.dashboards)
    kibana: KibanaConnection;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
}