import { Field } from '@nestjs/graphql';
import { NodeInterface, NodeType } from 'nestjs-relay';
@NodeType()
export class Fleet extends NodeInterface {
  @Field(() => String)
  name: string;
}
