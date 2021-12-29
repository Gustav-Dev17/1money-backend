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

@Entity("purchases")
export class Purchases {
  @PrimaryColumn()
  id: string;

  @Column()
  payment: string;

  @Column()
  situation: string;

  @Column()
  discount: number;

  @Column()
  total_price: number;

  @Column()
  final_price: number;

  @CreateDateColumn()
  bought_at: Date;

  @ManyToOne(() => Users)
  @JoinColumn({ name: "user_id" })
  user: Users;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}