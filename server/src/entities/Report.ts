import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn
} from "typeorm";
import { Entry } from "./Entry";
import { User } from "./User";

@ObjectType()
@Entity()
export class Report extends BaseEntity {
  @PrimaryColumn()
  creatorId: number;

  @ManyToOne(() => User, (user) => user.reports)
  creator: User;

  @PrimaryColumn()
  entryId: number;

  @ManyToOne(() => Entry, (entry) => entry.reports, {
    onDelete: "CASCADE", // if an entry is deleted, report is deleted
  })
  entry: Entry;

  @Field({ nullable: true })
  @Column({ nullable: true })
  reason?: string;
}
