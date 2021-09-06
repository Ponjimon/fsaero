import { ArgsType, Field } from '@nestjs/graphql';
import { WEIGHT_UNIT } from '../enums';

@ArgsType()
export class WeightUnitArgs {
  @Field(() => WEIGHT_UNIT, { defaultValue: WEIGHT_UNIT.KGS })
  unit: WEIGHT_UNIT;
}
