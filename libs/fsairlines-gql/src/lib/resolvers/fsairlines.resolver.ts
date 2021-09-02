import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class FSAirlinesResolver {
  @Query(() => String)
  hellWorld() {
    return 'Hello world!';
  }
}
