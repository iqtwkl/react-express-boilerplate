import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
  
@Entity()
export class Account {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column()
    username: string;
  
    @Column()
    email: string;
  
    @Column()
    password: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
}