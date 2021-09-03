import {
  GetAircraftDataArgs,
  GetAircraftDBDataArgs,
  GetAircraftDBListArgs,
  GetAircraftListArgs,
  GetAircraftStatsArgs,
  GetAirlineDataArgs,
  GetAirportDataArgs,
  GetAirportListArgs,
  GetFleetAircraftListArgs,
  GetFleetListArgs,
  GetFleetStatsArgs,
  GetLeasedAircraftListArgs,
  GetPeriodFleetStatsArgs,
} from '../dto';
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
} from './aircraft-data';
import { Airline } from './airline-data';
import { Airport } from './airport-data';

export * from './aircraft-data';
export * from './airline-data';
export * from './airport-data';
export * from './graphql-context';

export type BaseAirport = Pick<
  Airport,
  'icao' | 'name' | 'city' | 'country' | 'fuel' | 'lat' | 'lon'
>;
export interface FSAirlinesAPI {
  getAircraftData: [GetAircraftDataArgs, AircraftData[]];
  getAircraftDBData: [GetAircraftDBDataArgs, AircraftDBData[]];
  getAircraftDBList: [
    GetAircraftDBListArgs,
    { [key: string]: AircraftDBListItem }
  ];
  getAircraftList: [GetAircraftListArgs, Aircraft[]];
  getAircraftStats: [GetAircraftStatsArgs, AircraftStats[]];
  getFleetAircraftList: [GetFleetAircraftListArgs, Aircraft[]];
  getFleetList: [GetFleetListArgs, Fleet[]];
  getFleetStats: [GetFleetStatsArgs, FleetStats[]];
  getLeasedAircraftList: [GetLeasedAircraftListArgs, LeasedAircraft[]];
  getPeriodFleetStats: [GetPeriodFleetStatsArgs, PeriodFleetStats[]];

  getAirportData: [GetAirportDataArgs, Airport[]];
  getAirportList: [GetAirportListArgs, BaseAirport[]];

  getAirlineData: [GetAirlineDataArgs, Airline[]];
}

export type FSAirlinesAPIResponseStatus =
  | 'SUCCESS'
  | 'NOT FOUND'
  | 'INVALID API KEY'
  | 'INVALID'
  | 'VA IS INACTIVE';

export interface FSAirlinesAPIResponse<T> {
  status: FSAirlinesAPIResponseStatus;
  data: T | null;
}
