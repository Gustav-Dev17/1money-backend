import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Users } from "./User";
import { Comments } from "./Comment";

@Entity("answers")
export class Answers {
  @PrimaryColumn()
  id!: string;

  @Column()
  text!: string;

  @Column()
  comment_id!: string;

  @Column()
  user_id!: string;

  @CreateDateColumn()
  created_at!: Date;

  @CreateDateColumn()
  updated_at!: Date;

  @ManyToOne(() => Comments)
  @JoinColumn({ name: "comment_id" })
  comment: Comments;

  @ManyToOne(() => Users)
  @JoinColumn({ name: "user_id" })
  user: Users;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}