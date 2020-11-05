import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { EntryTag } from "./EntryTag";

@ObjectType()
@Entity()
export class Tag extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => EntryTag, (tag) => tag.tag)
  entries: EntryTag[];

  @Field()
  @Column({ unique: true })
  name!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
}
