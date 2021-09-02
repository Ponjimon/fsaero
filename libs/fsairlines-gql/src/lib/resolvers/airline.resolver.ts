import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { FSAirlinesService } from '../services';
import { Aircraft, Airline } from '../types';

@Resolver(Airline)
export class AirlineResolver {
  constructor(private readonly fsAirlinesService: FSAirlinesService) {}

  @Query(() => Airline)
  airline(@Args('va_id', { type: () => Int }) va_id: number) {
    return this.fsAirlinesService.getAirlineData(va_id);
  }

  @ResolveField(() => [Aircraft])
  aircrafts(@Parent() airline: Airline) {
    return this.fsAirlinesService.getAircraftList(airline.id);
  }
}
