import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Fleet {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;
}
