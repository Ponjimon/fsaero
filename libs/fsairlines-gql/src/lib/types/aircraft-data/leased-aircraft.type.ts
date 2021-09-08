import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Aircraft } from './aircraft.type';

@ObjectType()
export class LeasedAircraft extends Aircraft {
  @Field(() => Int)
  va_id: number;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  expire: number;
}
