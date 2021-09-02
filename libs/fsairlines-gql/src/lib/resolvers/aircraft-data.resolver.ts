import { Args, Query, Resolver } from '@nestjs/graphql';
import {
  GetAircraftDataArgs,
  GetAircraftDBDataArgs,
  GetAircraftListArgs,
  GetAircraftStatsArgs,
  GetFleetAircraftListArgs,
  GetFleetListArgs,
  GetFleetStatsArgs,
  GetLeasedAircraftListArgs,
  GetPeriodFleetStatsArgs,
} from '../dto';
import { FSAirlinesService } from '../services';
import {
  Aircraft,
  AircraftData,
  AircraftDBData,
  AircraftDBListItem,
  AircraftStats,
  Fleet,
  FleetStats,
  LeasedAircraft,
  PeriodFleetStats,
} from '../types';

@Resolver()
export class AircraftDataResolver {
  constructor(private readonly fsAirlinesService: FSAirlinesService) {}

  @Query(() => AircraftData)
  getAircraftData(@Args() { va_id, ac_id }: GetAircraftDataArgs) {
    return this.fsAirlinesService.getAircraftData(va_id, ac_id);
  }

  @Query(() => AircraftDBData)
  getAircraftDBData(@Args() { va_id, acdb_id }: GetAircraftDBDataArgs) {
    return this.fsAirlinesService.getAircraftDBData(va_id, acdb_id);
  }

  @Query(() => [AircraftDBListItem])
  getAircraftDBList(@Args() { va_id, ac_id }: GetAircraftDataArgs) {
    return this.fsAirlinesService.getAircraftData(va_id, ac_id);
  }

  @Query(() => [Aircraft])
  getAircraftList(@Args() { va_id }: GetAircraftListArgs) {
    return this.fsAirlinesService.getAircraftList(va_id);
  }

  @Query(() => AircraftStats)
  getAircraftStats(@Args() { va_id, ac_id }: GetAircraftStatsArgs) {
    return this.fsAirlinesService.getAircraftStats(va_id, ac_id);
  }

  @Query(() => Aircraft)
  getFleetAircraftList(@Args() { va_id, fleet_id }: GetFleetAircraftListArgs) {
    return this.fsAirlinesService.getFleetAircraftList(va_id, fleet_id);
  }

  @Query(() => [Fleet])
  getFleetList(@Args() { va_id }: GetFleetListArgs) {
    return this.fsAirlinesService.getFleetList(va_id);
  }

  @Query(() => [FleetStats])
  getFleetStats(@Args() { va_id }: GetFleetStatsArgs) {
    return this.fsAirlinesService.getFleetStats(va_id);
  }

  @Query(() => [LeasedAircraft])
  getLeasedAircraftList(@Args() { va_id }: GetLeasedAircraftListArgs) {
    return this.fsAirlinesService.getLeasedAircraftList(va_id);
  }

  @Query(() => [PeriodFleetStats])
  getPeriodFleetStats(
    @Args() { va_id, from_ts, to_ts }: GetPeriodFleetStatsArgs
  ) {
    return this.fsAirlinesService.getPeriodFleetStats(va_id, from_ts, to_ts);
  }
}
