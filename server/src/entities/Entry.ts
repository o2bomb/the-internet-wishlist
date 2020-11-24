import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { EntryTag } from "./EntryTag";
import { Heart } from "./Heart";
import { User } from "./User";

@ObjectType()
@Entity()
export class Entry extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  creatorId: number;

  @Field({ nullable: true })
  @ManyToOne(() => User, (user) => user.entries, { nullable: true })
  creator: User;

  @OneToMany(() => Heart, (heart) => heart.entry)
  hearts: Heart[];

  @OneToMany(() => EntryTag, (tag) => tag.entry)
  tags: EntryTag[];

  @Field()
  @Column()
  title!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  text: string;

  @Field()
  @Column({ type: "int", default: 0 })
  points!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Column("tsvector", { select: false })
  document_with_weights: any;
}
