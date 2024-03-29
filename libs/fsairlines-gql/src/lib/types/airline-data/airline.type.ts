import { Field, Int } from '@nestjs/graphql';
import { Connection, NodeInterface, NodeType } from 'nestjs-relay';
import { Aircraft } from '../aircraft-data';
import { Airport } from '../airport-data';

@NodeType()
export class Airline extends NodeInterface {
  @Field(() => String, { description: 'The name of the airline.' })
  name: string;

  @Field(() => String, { description: 'The country of origin of the airline.' })
  base: string;

  @Field(() => String, {
    description: 'The (fictivious) ICAO code of the airline.',
  })
  code: string;

  @Field(() => Int, { description: 'The available budget of the airline.' })
  budget: number;

  @Field(() => String, { description: "The URL to the airline's homepage." })
  homepage: string;

  @Field(() => String, {
    description: "The URL to the airline's logo (large).",
  })
  logo_l: string;

  @Field(() => String, {
    description: "The URL to the airline's logo (small).",
  })
  logo_s: string;

  @Field(() => Int, { description: 'Unsure. Help wanted!' })
  price: number;

  @Field(() => Int, { description: 'The rating of the airline.' })
  reputation: number;

  @Field(() => Int, { description: 'The amount of pilots the airline has.' })
  pilorcharge: number;

  @Field(() => Int, { description: 'The current multiplier of the airline.' })
  multiplier: number;

  @Field(() => String, {
    description: 'Information about the airline.',
    nullable: true,
  })
  mission: string | null;

  aircrafts: Connection<Aircraft>;

  airports: Connection<Airport>;
}
