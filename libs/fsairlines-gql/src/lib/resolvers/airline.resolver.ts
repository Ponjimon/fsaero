import {
  Args,
  Context,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GlobalIdFieldResolver } from 'nestjs-relay';
import { forkJoin, mergeMap, Observable, of } from 'rxjs';
import { GetAirlineDataArgs } from '../dto';
import { FSAirlinesService } from '../services';
import {
  Aircraft,
  Airline,
  AirlineStats,
  Airport,
  GraphQLContext,
} from '../types';

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

  @ResolveField(() => [Aircraft])
  aircrafts(@Parent() airline: Airline) {
    return this.fsAirlinesService.getAircraftList(airline.id.toString());
  }

  @ResolveField(() => [Airport], { nullable: true })
  airports(@Parent() airline: Airline): Observable<Airport[] | null> {
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
      })
    );
  }

  @ResolveField(() => AirlineStats)
  stats(@Parent() airline: Airline) {
    return this.fsAirlinesService.getAirlineStats(airline.id.toString());
  }
}
