import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AircraftStats {
  @Field(() => Int)
  flights: number;

  @Field(() => Int)
  hours: number;

  @Field(() => String)
  distance: string;
}
