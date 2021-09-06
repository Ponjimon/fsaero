import { ArgsType, Field } from '@nestjs/graphql';
import { ResolvedGlobalId } from 'nestjs-relay';

@ArgsType()
export class VaIDArgs {
  @Field(() => ResolvedGlobalId)
  vaId: ResolvedGlobalId;
}
