import {
  BaseEntity,
  Entity,
  ManyToOne,
  PrimaryColumn
} from "typeorm";
import { Entry } from "./Entry";
import { Tag } from "./Tag";

@Entity()
export class EntryTag extends BaseEntity {
  @PrimaryColumn()
  entryId: number;

  @ManyToOne(() => Entry, (entry) => entry.tags)
  entry: Entry;

  @PrimaryColumn()
  tagId: number;

  @ManyToOne(() => Tag, (tag) => tag.entries)
  tag: Tag;
}
