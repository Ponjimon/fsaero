import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Aircraft {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  acdb_id: number;

  @Field(() => String)
  icao: string;

  @Field(() => Int)
  value: number;

  @Field(() => String)
  location: string;

  @Field(() => String)
  registration: string;

  @Field(() => Int)
  state: number;

  @Field(() => String, { nullable: true })
  ac_name: string | null;

  @Field(() => Int)
  status: number;

  @Field(() => Int)
  fleet_id: number;

  @Field(() => Int)
  fuel: number;

  @Field(() => Int)
  last_maintenance: number;
}
