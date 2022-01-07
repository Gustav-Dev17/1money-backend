import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Users } from "./User";

export enum ActionSituation {
  CO = "CO",
  CA = "CA",
  FA = "FA",
}

@Entity("actions")
export class Actions {
  @PrimaryColumn()
  id: string;

  @Column()
  payment: string;

  @Column({
    name: "situation",
    type: "enum",
    enum: ActionSituation,
  })
  situation: ActionSituation;

  @Column()
  discount: number;

  @Column()
  total_price: number;

  @Column()
  final_price: number;

  @CreateDateColumn()
  bought_at: Date;

  @Column()
  user_id: string;

  @ManyToOne(() => Users)
  @JoinColumn({ name: "user_id" })
  user: Users;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}