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
export class Item {
  @PrimaryColumn()
  id: string;

  @Column()
  action_id: string;

  @Column()
  course_id: string;

  @Column()
  total_price: number

  @ManyToOne(() => Actions)
  @JoinColumn({ name: "action_id" })
  action: Actions;

  @ManyToOne(() => Courses)
  @JoinColumn({ name: "course_id" })
  course: Courses;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
