import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

// const data = {
//   status: 'SUCCESS',
//   data: [
//     {
//       id: 4434,
//       name: 'Schwechat',
//       iata: 'VIE',
//       icao: 'LOWW',
//       city: 'Vienna',
//       country: 'Austria',
//       la_g: '48',
//       la_p: '6',
//       la_s: '37',
//       la_d: 'N',
//       lat: 48.1103,
//       lo_g: '16',
//       lo_p: '34',
//       lo_s: '10',
//       lo_d: 'E',
//       lon: 16.5697,
//       altitude: '600',
//       length: '',
//       fuel: 1.42,
//       size: 4,
//       province: 'Lower Austria',
//       mag_var: 2,
//       population: 3384845,
//     },
//   ],
// };

@ObjectType()
export class Airport {
  @Field(() => Int, { description: 'The ID of the airport in FSAirlines.' })
  id: number;

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

  @Field(() => String, { description: 'The altitude of the airport.' })
  altitude: string;

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

  @Field(() => Int, { description: 'The magnetic variation at the airport.' })
  mag_var: number;

  @Field(() => Int, { description: 'The population of the airport.' })
  population: number;
}
