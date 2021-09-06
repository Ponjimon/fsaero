import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FleetStats {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  flights: number;

  @Field(() => Int)
  hours: number;

  @Field(() => String)
  distance: string;

  @Field(() => Int)
  last: number;

  @Field(() => String)
  fuel_used: string;

  @Field(() => String)
  profit: string;

  @Field(() => String)
  cargo_kg: string;

  @Field(() => String)
  pax: string;

  @Field(() => String)
  packages_kg: string;
}
