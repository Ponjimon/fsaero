import { convertLatToGPS, convertLonToGPS } from '@fsaero/core';
import {
  Args,
  Context,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GetAirportDataArgs } from '../dto';
import { FSAirlinesService } from '../services';
import { Airport, GraphQLContext } from '../types';

@Resolver(Airport)
export class AirportResolver {
  constructor(private readonly fsAirlinesService: FSAirlinesService) {}

  @Query(() => Airport, { nullable: true })
  airport(
    @Args() { va_id: vaId, icao }: GetAirportDataArgs,
    @Context() ctx: GraphQLContext
  ) {
    ctx.vaId = vaId;
    return this.fsAirlinesService.getAirportData(vaId, icao);
  }

  @ResolveField(() => String)
  lat_gps(@Parent() airport: Airport) {
    return convertLatToGPS(airport.lat);
  }

  @ResolveField(() => String)
  lon_gps(@Parent() airport: Airport) {
    return convertLonToGPS(airport.lon);
  }
}
