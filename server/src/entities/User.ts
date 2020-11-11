import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Entry } from "./Entry";
import { Heart } from "./Heart";
import { Tag } from "./Tag";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => Entry, entry => entry.creator)
  entries: Entry[];

  @OneToMany(() => Heart, heart => heart.creator)
  hearts: Heart[];

  @OneToMany(() => Tag, tag => tag.creator)
  tags: Tag[];

  @Field()
  @Column()
  displayName!: string;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
