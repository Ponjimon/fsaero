import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class VaIDArgs {
  @Field(() => Int)
  va_id: number;
}
