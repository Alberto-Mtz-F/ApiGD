import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Connection } from './config/DBConnection';

@Module({
  imports: [Connection],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
