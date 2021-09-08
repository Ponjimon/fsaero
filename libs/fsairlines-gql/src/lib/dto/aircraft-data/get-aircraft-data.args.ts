import { ArgsType, Field, Int } from '@nestjs/graphql';
import { VaIDArgs } from '../va-id.args';

@ArgsType()
export class GetAircraftDataArgs extends VaIDArgs {
  @Field(() => Int)
  ac_id: number;
}
