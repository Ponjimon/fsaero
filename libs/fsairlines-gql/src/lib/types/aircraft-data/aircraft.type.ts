import { Field, Int } from '@nestjs/graphql';
import { AircraftStats } from './aircraft-stats.type';
import { NodeInterface, NodeType } from 'nestjs-relay';
@NodeType()
export class Aircraft extends NodeInterface {
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
