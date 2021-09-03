import {
  Args,
  Context,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { forkJoin, from, mergeMap, Observable, of, reduce } from 'rxjs';
import { FSAirlinesService } from '../services';
import { Aircraft, Airline, Airport, GraphQLContext } from '../types';

@Resolver(Airline)
export class AirlineResolver {
  constructor(private readonly fsAirlinesService: FSAirlinesService) {}

  @Query(() => Airline, { nullable: true })
  airline(
    @Args('id', { type: () => Int }) vaId: number,
    @Context() ctx: GraphQLContext
  ) {
    ctx.vaId = vaId;
    return this.fsAirlinesService.getAirlineData(vaId);
  }

  @ResolveField(() => [Aircraft])
  aircrafts(@Parent() airline: Airline) {
    return this.fsAirlinesService.getAircraftList(airline.id);
  }

  @ResolveField(() => [Airport], { nullable: true })
  airports(@Parent() airline: Airline): Observable<Airport[] | null> {
    return this.fsAirlinesService.getAirportList(airline.id).pipe(
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
                    airline.id,
                    baseAirport.icao
                  ) as Observable<Airport>
              )
            )
          )
        );
      })
    );
  }
}
