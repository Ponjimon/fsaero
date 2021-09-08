import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Validate, ValidateIf, Min, Max } from 'class-validator';
import { ConnectionArguments, ConnectionCursor } from 'graphql-relay';
import { CannotUseWithout } from '@fsaero/core';

@ArgsType()
export class BackwardConnectionArgs
  implements Pick<ConnectionArguments, 'before' | 'last'>
{
  @Field(() => String, {
    nullable: true,
    description: 'Paginate before opaque cursor',
  })
  @ValidateIf(o => o.before !== undefined)
  @Validate(CannotUseWithout, ['last'])
  before?: ConnectionCursor;

  @Field(() => Int, { nullable: true, description: 'Paginate last' })
  @ValidateIf(o => o.last !== undefined)
  @Validate(CannotUseWithout, ['before'])
  @Min(1)
  @Max(100)
  last?: number;
}
