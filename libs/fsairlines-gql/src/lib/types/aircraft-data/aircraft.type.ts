import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { AircraftStats } from './aircraft-stats.type';

@ObjectType()
export class Aircraft {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  acdb_id: number;

  @Field(() => String)
  icao: string;

  @Field(() => Int)
  value: number;

  @Field(() => String)
  location: string;

  @Field(() => String)
  registration: string;

  @Field(() => Int)
  state: number;

  @Field(() => String, { nullable: true })
  ac_name: string | null;

  @Field(() => Int)
  status: number;

  @Field(() => Int)
  fleet_id: number;

  @Field(() => Int)
  fuel: number;

  @Field(() => Int)
  last_maintenance: number;

  @Field(() => AircraftStats)
  stats: AircraftStats;
}
