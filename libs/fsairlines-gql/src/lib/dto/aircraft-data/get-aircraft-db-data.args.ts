import { ArgsType, Field, Int } from '@nestjs/graphql';
import { VaIDArgs } from '../va-id.args';

@ArgsType()
export class GetAircraftDBDataArgs extends VaIDArgs {
  @Field(() => Int)
  acdb_id: number;
}
