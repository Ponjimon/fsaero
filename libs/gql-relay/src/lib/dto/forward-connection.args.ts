import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Validate, ValidateIf, Min, Max } from 'class-validator';
import { ConnectionArguments, ConnectionCursor } from 'graphql-relay';
import { CannotUseWithout } from '@fsaero/core';

@ArgsType()
export class ForwardConnectionArgs
  implements Pick<ConnectionArguments, 'first' | 'after'>
{
  @Field(() => String, {
    nullable: true,
    description: 'Paginate after opaque cursor',
  })
  @ValidateIf(o => o.after !== undefined)
  @Validate(CannotUseWithout, ['first'])
  after?: ConnectionCursor;

  @Field(() => Int, { nullable: true, description: 'Paginate first' })
  @ValidateIf(o => o.first !== undefined || Object.keys(o).length === 0)
  @Min(1)
  @Max(100)
  first?: number;
}
