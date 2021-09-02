import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AircraftDBData {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  manufacturer: string;

  @Field(() => String)
  type: string;

  @Field(() => String)
  icao: string;

  @Field(() => Int)
  passengers: number;

  @Field(() => Int)
  price: number;

  @Field(() => Int)
  fuel: number;

  @Field(() => Int)
  dow: number;

  @Field(() => Int)
  mtow: number;

  @Field(() => Int)
  speed: number;

  @Field(() => Int)
  engines: number;

  @Field(() => Int)
  cargo: number;

  @Field(() => Int)
  mzfw: number;

  @Field(() => Int)
  market_only: number;

  @Field(() => Int)
  range: number;
}
