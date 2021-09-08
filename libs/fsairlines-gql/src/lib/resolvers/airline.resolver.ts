import {
  Args,
  Context,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  Connection,
  GlobalIdFieldResolver,
  ResolveConnectionField,
} from 'nestjs-relay';
import { forkJoin, map, mergeMap, Observable, of } from 'rxjs';
import { GetAirlineDataArgs } from '../dto';
import { FSAirlinesService } from '../services';
import {
  Aircraft,
  Airline,
  AirlineStats,
  Airport,
  GraphQLContext,
} from '../types';
import { ForwardConnectionArgs } from '@fsaero/gql-relay';
import { connectionFromArray } from 'graphql-relay';

@Resolver(Airline)
export class AirlineResolver extends GlobalIdFieldResolver(Airline) {
  constructor(private readonly fsAirlinesService: FSAirlinesService) {
    super();
  }

  @Query(() => Airline, { nullable: true })
  airline(
    @Args() { vaId: vaId }: GetAirlineDataArgs,
    @Context() ctx: GraphQLContext
  ) {
    ctx.vaId = vaId.toNumber();
    return this.fsAirlinesService.getAirlineData(vaId.toString());
  }

  @ResolveConnectionField(() => Aircraft)
  aircrafts(
    @Parent() airline: Airline,
    @Args() args: ForwardConnectionArgs
  ): Observable<Connection<Aircraft>> {
    return this.fsAirlinesService.getAircraftList(airline.id.toString()).pipe(
      map(aircrafts => {
        if (!aircrafts) {
          return connectionFromArray([], args);
        }
        return connectionFromArray(aircrafts, args);
      })
    );
  }

  @ResolveConnectionField(() => Airport)
  airports(
    @Parent() airline: Airline,
    @Args() args: ForwardConnectionArgs
  ): Observable<Connection<Airport>> {
    return this.fsAirlinesService.getAirportList(airline.id.toString()).pipe(
      mergeMap(baseAirports => {
        if (!baseAirports) {
          return [];
        }

        return of(baseAirports).pipe(
          mergeMap(baseAirports =>
            forkJoin(
              baseAirports.map(
                baseAirport =>
                  this.fsAirlinesService.getAirportData(
                    airline.id.toString(),
                    baseAirport.icao
                  ) as Observable<Airport>
              )
            )
          )
        );
      }),
      map(airports => connectionFromArray(airports, args))
    );
  }

  @ResolveField(() => AirlineStats)
  stats(@Parent() airline: Airline) {
    return this.fsAirlinesService.getAirlineStats(airline.id.toString());
  }
}
