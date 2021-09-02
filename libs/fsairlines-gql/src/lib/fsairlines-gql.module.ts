import { Module } from '@nestjs/common';
import { GqlModuleOptions, GraphQLModule } from '@nestjs/graphql';
import { FSAirlinesResolver } from './resolvers';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useFactory: (): GqlModuleOptions => ({
        debug: false,
        playground: true,
        autoSchemaFile: true,
        sortSchema: true,
      }),
    }),
  ],
  providers: [FSAirlinesResolver],
})
export class FSAirlinesGQLModule {}
