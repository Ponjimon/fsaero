import { ArgsType } from '@nestjs/graphql';
import { VaIDArgs } from '../va-id.args';

@ArgsType()
export class GetAircraftDBListArgs extends VaIDArgs {}
