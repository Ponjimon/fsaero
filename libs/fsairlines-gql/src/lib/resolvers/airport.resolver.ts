import { convertLatToGPS, convertLonToGPS } from '@fsaero/core';
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
import { GetAirportDataArgs, LengthUnitArgs } from '../dto';
import { LENGTH_UNIT } from '../enums';
import { FSAirlinesService } from '../services';
import { Airport, GraphQLContext } from '../types';

@Resolver(Airport)
export class AirportResolver extends GlobalIdFieldResolver(Airport) {
  constructor(private readonly fsAirlinesService: FSAirlinesService) {
    super();
  }

  @Query(() => Airport, { nullable: true })
  airport(
    @Args() { vaId: vaId, icao }: GetAirportDataArgs,
    @Context() ctx: GraphQLContext
  ) {
    ctx.vaId = vaId.toNumber();
    return this.fsAirlinesService.getAirportData(vaId.toString(), icao);
  }

  @ResolveField(() => String)
  lat_gps(@Parent() airport: Airport) {
    return convertLatToGPS(airport.lat);
  }

  @ResolveField(() => String)
  lon_gps(@Parent() airport: Airport) {
    return convertLonToGPS(airport.lon);
  }

  @ResolveField(() => Int)
  altitude(@Parent() airport: Airport, @Args() { unit }: LengthUnitArgs) {
    switch (unit) {
      case LENGTH_UNIT.METERS:
        return Math.floor(airport.altitude * 3.28084);
      case LENGTH_UNIT.FEET:
      default:
        return airport.altitude;
    }
  }
}
