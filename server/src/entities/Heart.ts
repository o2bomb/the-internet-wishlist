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
  creatorId: number;

  @ManyToOne(() => User, (user) => user.hearts)
  creator: User;

  @PrimaryColumn()
  entryId: number;

  @ManyToOne(() => Entry, (entry) => entry.hearts, {
    onDelete: "CASCADE", // if an entry is deleted, heart is deleted
  })
  entry: Entry;
}
