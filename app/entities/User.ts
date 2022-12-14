import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  BeforeInsert,
} from "typeorm";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

export enum UserType {
  ADMIN = "A",
  USER = "U",
}

@Entity("users")
export class Users {
  @PrimaryColumn()
  id!: string;

  @Column({
    name: "usertype",
    type: "enum",
    enum: UserType,
    default: UserType.USER,
  })
  role!: UserType;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  picture!: string;

  @Column()
  key!: string;

  @CreateDateColumn()
  created_at!: Date;

  @CreateDateColumn()
  updated_at!: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
