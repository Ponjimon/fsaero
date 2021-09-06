import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';

const stats = {
  status: 'SUCCESS',
  data: [
    {
      id: 38129,
      flights: 180,
      rating: '17890',
      hours: 360.19999922067,
      distance: '119140',
      last: 1630928408,
      fuel_used: '1371722',
      pax: '26984',
      cargo_kg: '1038711',
      packages_kg: '1396880',
    },
  ],
};

@ObjectType()
export class AirlineStats {
  @Field(() => Int, {
    description: 'The number of flights the airline has done.',
  })
  flights: number;

  @Field(() => Int, { description: 'The rating of the airline.' })
  rating: number;

  @Field(() => Float, { description: 'The total hours the airline has flown.' })
  hours: number;

  @Field(() => Int, {
    description: 'The total distance the airline has flown.',
  })
  distance: number;

  last: number;
  @Field(() => Date, { description: 'The last time the airline has flown.' })
  lastFlightAt: Date;

  @Field(() => Int, { description: 'The total fuel used by the airline.' })
  fuel_used: number;

  @Field(() => Int, {
    description: 'The total number of passengers flown by the airline.',
  })
  pax: number;

  cargo_kg: string;
  @Field(() => Int, {
    description: 'The total weight of cargo flown by the airline.',
  })
  cargo: number;

  packages_kg: number;
  @Field(() => Int, {
    description: 'The total weight of packages flown by the airline.',
  })
  packages: number;
}
