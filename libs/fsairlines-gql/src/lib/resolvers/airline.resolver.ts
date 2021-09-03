import {
  Args,
  Context,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { FSAirlinesService } from '../services';
import { Aircraft, Airline, GraphQLContext } from '../types';

@Resolver(Airline)
export class AirlineResolver {
  constructor(private readonly fsAirlinesService: FSAirlinesService) {}

  @Query(() => Airline, { nullable: true })
  airline(
    @Args('id', { type: () => Int }) vaId: number,
    @Context() ctx: GraphQLContext
  ) {
    ctx.vaId = vaId;
    return this.fsAirlinesService.getAirlineData(vaId);
  }

  @ResolveField(() => [Aircraft])
  aircrafts(@Parent() airline: Airline) {
    return this.fsAirlinesService.getAircraftList(airline.id);
  }
}
