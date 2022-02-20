import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryColumn,
    ManyToOne,
    JoinColumn,
    BeforeUpdate,
    BeforeInsert,
  } from "typeorm";
  import { v4 as uuid } from "uuid";
  import { Users } from "./User";
  import bcrypt from "bcrypt";
  
  @Entity("cards")
  export class Cards {
    @PrimaryColumn()
    id!: string;
  
    @Column()
    name!: string;
  
    @Column()
    cpf!: string;
  
    @Column()
    number!: string;

    @Column()
    exp_month!: string;

    @Column()
    exp_year!: string;

    @Column()
    user_id!: string;
  
    @CreateDateColumn()
    created_at!: Date;

    @CreateDateColumn()
    updated_at!: Date;
  
    @ManyToOne(() => Users)
    @JoinColumn({ name: "user_id" })
    user: Users;
  
    constructor() {
      if (!this.id) {
        this.id = uuid();
      }
    }
  }