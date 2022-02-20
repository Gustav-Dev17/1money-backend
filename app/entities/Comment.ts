import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Users } from "./User";
import { Lessons } from "./Lesson";

@Entity("comments")
export class Comments {
  @PrimaryColumn()
  id!: string;

  @Column()
  text!: string;

  @Column()
  lesson_id!: string;

  @Column()
  user_id!: string;

  @CreateDateColumn()
  created_at!: Date;

  @CreateDateColumn()
  updated_at!: Date;

  @ManyToOne(() => Lessons)
  @JoinColumn({ name: "lesson_id" })
  lesson: Lessons;

  @ManyToOne(() => Users)
  @JoinColumn({ name: "user_id" })
  user: Users;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}