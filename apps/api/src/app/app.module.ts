import { Module } from '@nestjs/common';
import { FSAirlinesGQLModule } from '@fsaero/fsairlines-gql';

@Module({
  imports: [FSAirlinesGQLModule],
})
export class AppModule {}
