import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GqlModuleOptions, GraphQLModule } from '@nestjs/graphql';
import { FSAirlinesService } from './services';
import { Request } from 'express';
import { DateTimeScalar } from '@fsaero/core';
import { AircraftResolver } from './resolvers/aircraft.resolver';
import { AirlineResolver } from './resolvers';

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
    // DateTimeScalar,
    FSAirlinesService,
  ],
  exports: [FSAirlinesService],
})
export class FSAirlinesGQLModule {}
