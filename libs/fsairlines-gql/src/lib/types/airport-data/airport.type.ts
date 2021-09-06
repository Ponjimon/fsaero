import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Airport {
  @Field(() => ID, { description: 'The ID of the airport in FSAirlines.' })
  id: string;

  @Field(() => String, { description: 'The name of the airport.' })
  name: string;

  @Field(() => String, { description: 'The IATA code of the airport.' })
  iata: string;

  @Field(() => String, { description: 'The ICAO code of the airport.' })
  icao: string;

  @Field(() => String, { description: 'The city of the airport.' })
  city: string;

  @Field(() => String, { description: 'The country of the airport.' })
  country: string;

  @Field(() => Float, { description: 'The latitude of the airport.' })
  lat: number;

  @Field(() => String, {
    description: 'The latitude of the airport as GPS coordinates.',
  })
  lat_gps: string;

  @Field(() => Float, { description: 'The longitude of the airport.' })
  lon: number;

  @Field(() => String, {
    description: 'The longitude of the airport as GPS coordinates.',
  })
  lon_gps: string;

  altitude: number;

  @Field(() => String, { description: 'Unknown. Help wanted!' })
  length: string;

  @Field(() => Float, {
    description: 'The current fuel price per liter at the airport.',
  })
  fuel: number;

  @Field(() => Int, { description: 'Unknown. Help wanted!' })
  size: number;

  @Field(() => String, { description: 'The province of the airport.' })
  province: string;

  @Field(() => Float, { description: 'The magnetic variation at the airport.' })
  mag_var: number;

  @Field(() => Int, { description: 'The population of the airport.' })
  population: number;
}
