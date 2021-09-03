import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { FSAirlinesService } from '../services';
import { Aircraft, AircraftStats, GraphQLContext } from '../types';

@Resolver(Aircraft)
export class AircraftResolver {
  constructor(private readonly fsAirlinesService: FSAirlinesService) {}

  @ResolveField(() => AircraftStats, { nullable: true })
  stats(@Parent() aircraft: Aircraft, @Context() { vaId }: GraphQLContext) {
    if (!vaId) {
      return null;
    }
    return this.fsAirlinesService.getAircraftStats(vaId, aircraft.id);
  }
}
