import { ArgsType, Field } from '@nestjs/graphql';
import { VaIDArgs } from '../va-id.args';

@ArgsType()
export class GetAirportDataArgs extends VaIDArgs {
  @Field(() => String, { description: 'The ICAO code of the airport.' })
  icao: string;
}
