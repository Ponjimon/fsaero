import { ArgsType, Field } from '@nestjs/graphql';
import { LENGTH_UNIT } from '../enums';

@ArgsType()
export class LengthUnitArgs {
  @Field(() => LENGTH_UNIT, { defaultValue: LENGTH_UNIT.FEET })
  unit: LENGTH_UNIT;
}
