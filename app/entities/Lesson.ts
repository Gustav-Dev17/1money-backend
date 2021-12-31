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

@Entity("lessons")
export class Lessons {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  sequence: string;

  @Column()
  duration: string;

  @Column()
  video: string;

  @Column()
  key: string;

  @Column()
  resource: string;

  @Column()
  course_id: string;

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
