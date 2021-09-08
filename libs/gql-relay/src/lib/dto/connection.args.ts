import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Validate, ValidateIf, Min, Max } from 'class-validator';
import { ConnectionArguments, ConnectionCursor } from 'graphql-relay';
import { CannotUseWith, CannotUseWithout } from '@fsaero/core';

@ArgsType()
export class ConnectionArgs implements ConnectionArguments {
  @Field(() => String, {
    nullable: true,
    description: 'Paginate before opaque cursor',
  })
  @ValidateIf(o => o.before !== undefined)
  @Validate(CannotUseWithout, ['last'])
  @Validate(CannotUseWith, ['after', 'first'])
  before?: ConnectionCursor;

  @Field(() => String, {
    nullable: true,
    description: 'Paginate after opaque cursor',
  })
  @ValidateIf(o => o.after !== undefined)
  @Validate(CannotUseWithout, ['first'])
  @Validate(CannotUseWith, ['before', 'last'])
  after?: ConnectionCursor;

  @Field(() => Int, { nullable: true, description: 'Paginate first' })
  @ValidateIf(o => o.first !== undefined || Object.keys(o).length === 0)
  @Min(1)
  @Max(100)
  @Validate(CannotUseWith, ['before', 'last'])
  first?: number;

  @Field(() => Int, { nullable: true, description: 'Paginate last' })
  @ValidateIf(o => o.last !== undefined)
  @Validate(CannotUseWithout, ['before'])
  @Validate(CannotUseWith, ['after', 'first'])
  @Min(1)
  @Max(100)
  last?: number;
}
