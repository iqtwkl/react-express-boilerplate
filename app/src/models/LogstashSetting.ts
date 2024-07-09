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
  
    @Column()
    username: string;
  
    @Column({unique: true})
    connection_name: string;
  
    @Column()
    password: string;

    @Column()
    ip: string;

    @Column()
    directory: string;

    @Column()
    input_path: string;

    @Column()
    grok_pattern: string;

    @Column()
    elasticsearch_host: string;

    @Column()
    index_name: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
}