import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GqlModuleOptions, GraphQLModule } from '@nestjs/graphql';
import { AircraftDataResolver } from './resolvers';
import { FSAirlinesService } from './services';
import { Request } from 'express';
import { DateTimeScalar } from '@fsaero/core';
import { AirlineResolver } from './resolvers/airline.resolver';

@Module({
  imports: [
    HttpModule,
    GraphQLModule.forRootAsync({
      useFactory: (): GqlModuleOptions => ({
        path: '/',
        debug: false,
        playground: true,
        autoSchemaFile: true,
        sortSchema: true,
        context: ({ req }: { req: Request }) => {
          const apiKey = req.headers['x-fsairlines-apikey'];

          return { apiKey };
        },
      }),
    }),
  ],
  providers: [
    AircraftDataResolver,
    AirlineResolver,
    DateTimeScalar,
    FSAirlinesService,
  ],
  exports: [FSAirlinesService],
})
export class FSAirlinesGQLModule {}
