import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType, Int } from "type-graphql";

@ObjectType()
@Entity()
export class Dojo {

  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({type: 'created'})
  createdAt = new Date();

  @Field(() => String)
  @Property({type: 'updated', onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field()
  @Property({type: 'text'})
  title!: string;

  // @Field()
  // @Property({type: 'text'})
  // styles!: string;

  //comment out the Field to not expose database info via graphql
}