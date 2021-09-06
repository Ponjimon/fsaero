import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Fleet {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;
}
