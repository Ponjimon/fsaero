import { ArgsType, Field } from '@nestjs/graphql';
import { VaIDArgs } from '../va-id.args';

@ArgsType()
export class GetPeriodFleetStatsArgs extends VaIDArgs {
  @Field(() => Date)
  from_ts: Date;

  @Field(() => Date, { nullable: true, defaultValue: new Date() })
  to_ts: Date;
}
