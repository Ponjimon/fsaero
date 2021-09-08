import { ArgsType, Field, Int } from '@nestjs/graphql';
import { VaIDArgs } from '../va-id.args';

@ArgsType()
export class GetFleetAircraftListArgs extends VaIDArgs {
  @Field(() => Int)
  fleet_id: number;
}
