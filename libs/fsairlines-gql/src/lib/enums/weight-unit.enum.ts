import { registerEnumType } from '@nestjs/graphql';

export enum WEIGHT_UNIT {
  KGS,
  LBS,
}

registerEnumType(WEIGHT_UNIT, {
  name: 'WeightUnit',
  description: 'The unit that should be used, e.g. `kgs` or `lbs`',
});
