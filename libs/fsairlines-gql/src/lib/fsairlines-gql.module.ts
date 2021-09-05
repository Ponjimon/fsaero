import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GqlModuleOptions, GraphQLModule } from '@nestjs/graphql';
import { FSAirlinesService } from './services';
import { Request } from 'express';
import { DateTimeScalar } from '@fsaero/core';
import {
  AircraftResolver,
  AirlineResolver,
  AirportResolver,
} from './resolvers';

@Module({
  imports: [
    HttpModule,
    GraphQLModule.forRootAsync({
      useFactory: (): GqlModuleOptions => ({
        path: '/graphql',
        debug: process.env.NODE_ENV !== 'production',
        playground: true,
        autoSchemaFile: true,
        sortSchema: true,
        introspection: true,
        context: ({ req }: { req: Request }) => {
          const apiKey = req.headers['x-fsairlines-apikey'];

          return { apiKey };
        },
      }),
    }),
  ],
  providers: [
    AircraftResolver,
    AirlineResolver,
    AirportResolver,
    // DateTimeScalar,
    FSAirlinesService,
  ],
  exports: [FSAirlinesService],
})
export class FSAirlinesGQLModule {}
