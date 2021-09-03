import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import {
  Aircraft,
  AircraftData,
  AircraftDBData,
  AircraftDBListItem,
  AircraftStats,
  Airline,
  Airport,
  Fleet,
  FleetStats,
  FSAirlinesAPI,
  FSAirlinesAPIResponse,
  LeasedAircraft,
  PeriodFleetStats,
} from '../types';

@Injectable()
export class FSAirlinesService {
  private readonly logger = new Logger(FSAirlinesService.name);

  constructor(private readonly http: HttpService) {}

  getAircraftData(va_id: number, ac_id: number): Observable<AircraftData> {
    return this.fetchFSAirlines('getAircraftData', {
      va_id,
      ac_id,
    }).pipe(map(([data]) => data));
  }

  getAircraftDBData(
    va_id: number,
    acdb_id: number
  ): Observable<AircraftDBData> {
    return this.fetchFSAirlines('getAircraftDBData', {
      va_id,
      acdb_id,
    }).pipe(map(([data]) => data));
  }

  getAircraftDBList(va_id: number): Observable<AircraftDBListItem[]> {
    return this.fetchFSAirlines('getAircraftDBList', {
      va_id,
    }).pipe(map(data => Object.values(data)));
  }

  getAircraftList(va_id: number): Observable<Aircraft[]> {
    return this.fetchFSAirlines('getAircraftList', { va_id });
  }

  getAircraftStats(va_id: number, ac_id: number): Observable<AircraftStats> {
    return this.fetchFSAirlines('getAircraftStats', {
      va_id,
      ac_id,
    }).pipe(map(([data]) => data));
  }

  getFleetAircraftList(
    va_id: number,
    fleet_id: number
  ): Observable<Aircraft[]> {
    return this.fetchFSAirlines('getFleetAircraftList', {
      va_id,
      fleet_id,
    });
  }

  getFleetList(va_id: number): Observable<Fleet[]> {
    return this.fetchFSAirlines('getFleetList', { va_id });
  }

  getFleetStats(va_id: number): Observable<FleetStats[]> {
    return this.fetchFSAirlines('getFleetStats', { va_id });
  }

  getLeasedAircraftList(va_id: number): Observable<LeasedAircraft[]> {
    return this.fetchFSAirlines('getLeasedAircraftList', {
      va_id,
    });
  }

  getPeriodFleetStats(
    va_id: number,
    from_ts: Date,
    to_ts = new Date()
  ): Observable<PeriodFleetStats[]> {
    return this.fetchFSAirlines('getPeriodFleetStats', {
      va_id,
      from_ts,
      to_ts,
    });
  }

  getAirportData(va_id: number, icao: string): Observable<Airport> {
    return this.fetchFSAirlines('getAirportData', {
      va_id,
      icao,
    }).pipe(map(([data]) => data));
  }

  getAirlineData(va_id: number): Observable<Airline> {
    return this.fetchFSAirlines('getAirlineData', { va_id }).pipe(
      map(([data]) => data)
    );
  }

  private fetchFSAirlines<
    E extends keyof FSAirlinesAPI,
    P extends FSAirlinesAPI[E]
  >(endpoint: E, parameters: P[0]) {
    this.logger.log('Fetching FSAirlines API...');
    const queryParameters = Object.entries(parameters || {})
      .map(([key, value]) => ({ [key]: this.convertToString(value) }))
      .reduce((acc, cur) => ({ ...acc, ...cur }), {});
    const url = `https://www.fsairlines.net/va_interface2.php?format=json&function=${endpoint}&${new URLSearchParams(
      queryParameters
    ).toString()}`;
    this.logger.debug(url);
    return this.http.get<FSAirlinesAPIResponse<P[1]>>(url).pipe(
      map(({ data: requestData }) => {
        const { status, data } = requestData;

        if (status !== 'SUCCESS') {
          throw new Error(status);
        }

        if (!data) {
          return null;
        }

        return data;
      })
    );
  }

  private convertToString(value: unknown) {
    if (typeof value === 'string') {
      return value;
    }

    if (value instanceof Date) {
      return String(Math.floor(value.getTime() / 1000));
    }

    return String(value);
  }
}
