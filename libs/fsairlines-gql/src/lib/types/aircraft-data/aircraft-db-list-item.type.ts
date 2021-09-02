import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AircraftDBListItem {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  manufacturer: string;

  @Field(() => String)
  type: string;

  @Field(() => String)
  icao: string;
}
