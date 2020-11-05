import {
  BaseEntity,
  Entity,
  ManyToOne,
  PrimaryColumn
} from "typeorm";
import { Entry } from "./Entry";
import { User } from "./User";

@Entity()
export class Heart extends BaseEntity {
  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => User, (user) => user.hearts)
  user: User;

  @PrimaryColumn()
  entryId: number;

  @ManyToOne(() => Entry, (entry) => entry.hearts, {
    onDelete: "CASCADE", // if an entry is deleted, heart is deleted
  })
  entry: Entry;
}
