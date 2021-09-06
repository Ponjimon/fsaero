import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AircraftDBListItem {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  manufacturer: string;

  @Field(() => String)
  type: string;

  @Field(() => String)
  icao: string;
}
