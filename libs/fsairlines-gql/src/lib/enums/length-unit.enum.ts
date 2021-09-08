import { registerEnumType } from '@nestjs/graphql';

export enum LENGTH_UNIT {
  METERS,
  FEET,
}

registerEnumType(LENGTH_UNIT, {
  name: 'LengthUnit',
  description: 'The unit that should be used, e.g. `m` or `ft`',
});
