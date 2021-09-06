import { ResolveField, Resolver } from '@nestjs/graphql';
import { AirlineStats } from '../types';

@Resolver(AirlineStats)
export class AirlineStatsResolver {
  @ResolveField(() => Date)
  lastFlightAt(airlineStats: AirlineStats): Date {
    return new Date(airlineStats.last * 1000);
  }
}
