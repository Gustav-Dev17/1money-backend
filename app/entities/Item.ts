import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Courses } from "./Course";
import { Actions } from "./Action";

@Entity("items")
export class Lessons {
  @PrimaryColumn()
  id: string;

  @Column()
  action_id: string;

  @Column()
  course_id: string;

  @ManyToOne(() => Actions)
  @JoinColumn({ name: "action_id" })
  action: Actions;

  @ManyToOne(() => Courses)
  @JoinColumn({ name: "course_id" })
  course: Courses;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
