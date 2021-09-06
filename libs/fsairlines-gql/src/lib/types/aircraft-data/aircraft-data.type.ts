import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AircraftData {
  @Field(() => Int)
  va_id: number;

  @Field(() => Int)
  acdb_id: number;

  @Field(() => String)
  location: string;

  @Field(() => Int)
  user_id: number;

  @Field(() => Int)
  lease_id: number;

  @Field(() => Int)
  fleet_id: number;

  @Field(() => Int)
  status: number;

  @Field(() => Int)
  value: number;

  @Field(() => String)
  registration: string;

  @Field(() => Int)
  fuel: number;

  @Field(() => Float)
  state: number;

  @Field(() => String, { nullable: true })
  ac_name: string | null;

  @Field(() => Float)
  stateeng1: number;

  @Field(() => Float)
  stategear: number;

  @Field(() => Float)
  statehull: number;

  @Field(() => String)
  img_path: string;

  @Field(() => String)
  pax_economy: string;

  @Field(() => String)
  pax_business: string;

  @Field(() => String)
  pax_first: string;

  @Field(() => String)
  config_name: string;
}
