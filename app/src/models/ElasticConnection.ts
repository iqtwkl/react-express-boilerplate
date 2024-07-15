import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
  
@Entity()
export class ElasticConnection {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column()
    username: string;
  
    @Column({unique: true})
    connection_name: string;
  
    @Column()
    password: string;

    @Column()
    index: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
}