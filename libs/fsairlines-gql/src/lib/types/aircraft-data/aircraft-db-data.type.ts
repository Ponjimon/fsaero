import { Field, Int } from '@nestjs/graphql';
import { NodeInterface, NodeType } from 'nestjs-relay';

@NodeType()
export class AircraftDBData extends NodeInterface {
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
