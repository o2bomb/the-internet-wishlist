import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EntryTag } from "./EntryTag";
import { User } from "./User";

@ObjectType()
@Entity()
export class Tag extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  creatorId: number;

  @Field({ nullable: true })
  @ManyToOne(() => User, (user) => user.tags, { nullable: true })
  creator: User;

  @OneToMany(() => EntryTag, (tag) => tag.tag)
  entries: EntryTag[];

  @Field()
  @Column()
  displayName!: string;

  @Field()
  @Column({ unique: true })
  name!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
}
