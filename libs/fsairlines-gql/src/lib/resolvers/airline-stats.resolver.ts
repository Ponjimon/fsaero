import { Args, Int, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { WeightUnitArgs } from '../dto';
import { WEIGHT_UNIT } from '../enums';
import { AirlineStats } from '../types';

@Resolver(AirlineStats)
export class AirlineStatsResolver {
  @ResolveField(() => Date)
  lastFlightAt(@Parent() airlineStats: AirlineStats): Date {
    return new Date(airlineStats.last * 1000);
  }

  @ResolveField(() => Int)
  cargo(
    @Parent() airlineStats: AirlineStats,
    @Args() { unit }: WeightUnitArgs
  ): number {
    return Math.floor(this.converToUnit(parseInt(airlineStats.cargo_kg), unit));
  }

  @ResolveField(() => Int)
  packages(
    @Parent() airlineStats: AirlineStats,
    @Args() { unit }: WeightUnitArgs
  ): number {
    return Math.floor(
      this.converToUnit(parseInt(airlineStats.packages_kg), unit)
    );
  }

  private converToUnit(value: number, unit: WEIGHT_UNIT): number {
    switch (unit) {
      case WEIGHT_UNIT.LBS:
        return value * 2.2046226218;
      case WEIGHT_UNIT.KGS:
      default:
        return value;
    }
  }
}
