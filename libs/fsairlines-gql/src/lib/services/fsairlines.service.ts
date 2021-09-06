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
  AirlineStats,
  Airport,
  BaseAirport,
  Fleet,
  FleetStats,
  FSAirlinesAPI,
  FSAirlinesAPIResponse,
  LeasedAircraft,
  PeriodFleetStats,
} from '../types';

const mapUnwrap = <T>(observable: Observable<T[]>) =>
  map<T[], T | null>(arr => {
    if (!Array.isArray(arr)) {
      return null;
    }
    return arr[0];
  })(observable);

@Injectable()
export class FSAirlinesService {
  private readonly logger = new Logger(FSAirlinesService.name);

  constructor(private readonly http: HttpService) {}

  private getIDAsNumber(id: number | string) {
    if (typeof id === 'string') {
      return parseInt(id, 10);
    }
    return id;
  }

  // Aircraft Data
  getAircraftData(
    va_id: number,
    ac_id: number
  ): Observable<AircraftData | null> {
    return this.fetchFSAirlines('getAircraftData', {
      va_id: this.getIDAsNumber(va_id),
      ac_id: this.getIDAsNumber(ac_id),
    }).pipe(mapUnwrap);
  }

  getAircraftDBData(
    va_id: number | string,
    acdb_id: number | string
  ): Observable<AircraftDBData | null> {
    return this.fetchFSAirlines('getAircraftDBData', {
      va_id: this.getIDAsNumber(va_id),
      acdb_id: this.getIDAsNumber(acdb_id),
    }).pipe(mapUnwrap);
  }

  getAircraftDBList(
    va_id: number | string
  ): Observable<AircraftDBListItem[] | null> {
    return this.fetchFSAirlines('getAircraftDBList', {
      va_id: this.getIDAsNumber(va_id),
    }).pipe(map(data => (data ? Object.values(data) : null)));
  }

  getAircraftList(va_id: number | string): Observable<Aircraft[] | null> {
    return this.fetchFSAirlines('getAircraftList', {
      va_id: this.getIDAsNumber(va_id),
    });
  }

  getAircraftStats(
    va_id: number | string,
    ac_id: number | string
  ): Observable<AircraftStats | null> {
    return this.fetchFSAirlines('getAircraftStats', {
      va_id: this.getIDAsNumber(va_id),
      ac_id: this.getIDAsNumber(ac_id),
    }).pipe(mapUnwrap);
  }

  getFleetAircraftList(
    va_id: number | string,
    fleet_id: number | string
  ): Observable<Aircraft[] | null> {
    return this.fetchFSAirlines('getFleetAircraftList', {
      va_id: this.getIDAsNumber(va_id),
      fleet_id: this.getIDAsNumber(fleet_id),
    });
  }

  getFleetList(va_id: number | string): Observable<Fleet[] | null> {
    return this.fetchFSAirlines('getFleetList', {
      va_id: this.getIDAsNumber(va_id),
    });
  }

  getFleetStats(va_id: number | string): Observable<FleetStats[] | null> {
    return this.fetchFSAirlines('getFleetStats', {
      va_id: this.getIDAsNumber(va_id),
    });
  }

  getLeasedAircraftList(
    va_id: number | string
  ): Observable<LeasedAircraft[] | null> {
    return this.fetchFSAirlines('getLeasedAircraftList', {
      va_id: this.getIDAsNumber(va_id),
    });
  }

  getPeriodFleetStats(
    va_id: number | string,
    from_ts: Date,
    to_ts = new Date()
  ): Observable<PeriodFleetStats[] | null> {
    return this.fetchFSAirlines('getPeriodFleetStats', {
      va_id: this.getIDAsNumber(va_id),
      from_ts,
      to_ts,
    });
  }

  // Airport Data
  getAirportData(
    va_id: number | string,
    icao: string
  ): Observable<Airport | null> {
    return this.fetchFSAirlines('getAirportData', {
      va_id: this.getIDAsNumber(va_id),
      icao,
    }).pipe(mapUnwrap);
  }

  getAirportList(va_id: number | string): Observable<BaseAirport[] | null> {
    return this.fetchFSAirlines('getAirportList', {
      va_id: this.getIDAsNumber(va_id),
    });
  }

  // Airline Data
  getAirlineData(va_id: number | string): Observable<Airline | null> {
    return this.fetchFSAirlines('getAirlineData', {
      va_id: this.getIDAsNumber(va_id),
    }).pipe(mapUnwrap);
  }

  getAirlineStats(va_id: number | string): Observable<AirlineStats | null> {
    return this.fetchFSAirlines('getAirlineStats', {
      va_id: this.getIDAsNumber(va_id),
    }).pipe(mapUnwrap);
  }

  private fetchFSAirlines<
    E extends keyof FSAirlinesAPI,
    P extends FSAirlinesAPI[E]
  >(
    endpoint: E,
    parameters: Omit<P[0], 'vaId'> & { va_id: number }
  ): Observable<P[1] | null> {
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

        if (status !== 'SUCCESS' && status !== 'NOT FOUND') {
          // Not finding a resource should not be considered an error because GraphQL will return null
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
