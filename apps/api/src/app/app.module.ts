import { Module } from '@nestjs/common';
import { FSAirlinesGQLModule } from '@fsaero/fsairlines-gql';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [FSAirlinesGQLModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
