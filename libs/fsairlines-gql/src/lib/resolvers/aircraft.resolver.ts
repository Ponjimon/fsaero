import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { FSAirlinesService } from '../services';
import { Aircraft, AircraftStats, GraphQLContext } from '../types';

@Resolver(Aircraft)
export class AircraftResolver {
  constructor(private readonly fsAirlinesService: FSAirlinesService) {}

  @ResolveField(() => AircraftStats)
  stats(@Parent() aircraft: Aircraft, @Context() { vaId }: GraphQLContext) {
    return this.fsAirlinesService.getAircraftStats(vaId, aircraft.id);
  }
}
