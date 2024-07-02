import {
    Column,
    CreateDateColumn,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Profile } from "./Profile";
  
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
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;

    @OneToOne(() => Profile, profile => profile.account)
    profile: Profile;
}