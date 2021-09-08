import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AircraftDBListItem {
  @Field(() => String)
  manufacturer: string;

  @Field(() => String)
  type: string;

  @Field(() => String)
  icao: string;
}
