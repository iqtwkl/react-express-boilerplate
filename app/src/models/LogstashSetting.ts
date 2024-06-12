import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
  
@Entity()
export class LogstashSetting {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column({unique: true})
    username: string;
  
    @Column({unique: true})
    connection_name: string;
  
    @Column()
    password: string;

    @Column()
    ip: string;

    @Column()
    directory: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
}