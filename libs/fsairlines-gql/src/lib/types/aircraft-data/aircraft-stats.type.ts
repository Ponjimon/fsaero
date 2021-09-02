import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AircraftStats {
  @Field(() => Int)
  flights: number;

  @Field(() => Float, { nullable: true })
  hours: number | null;

  @Field(() => String, { nullable: true })
  distance: string | null;
}
