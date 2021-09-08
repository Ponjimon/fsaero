import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { GlobalIdFieldResolver } from 'nestjs-relay';
import { FSAirlinesService } from '../services';
import { Aircraft, AircraftStats, GraphQLContext } from '../types';

@Resolver(Aircraft)
export class AircraftResolver extends GlobalIdFieldResolver(Aircraft) {
  constructor(private readonly fsAirlinesService: FSAirlinesService) {
    super();
  }

  @ResolveField(() => AircraftStats, { nullable: true })
  stats(@Parent() aircraft: Aircraft, @Context() { vaId }: GraphQLContext) {
    if (typeof vaId !== 'number') {
      return null;
    }
    return this.fsAirlinesService.getAircraftStats(
      vaId.toString(),
      aircraft.id.toString()
    );
  }
}
