import { Module } from '@nestjs/common';
import { SentimentService } from './sentiment.service';
import { SentimentController } from './sentiment.controller';

@Module({
  controllers: [SentimentController],
  providers: [SentimentService],
})
export class SentimentModule {}
