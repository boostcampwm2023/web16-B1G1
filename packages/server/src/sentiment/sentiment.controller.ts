import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { SentimentService } from './sentiment.service';
import { GetSentimentDto } from './dto/get-sentiment.dto';
import { ThrottlerGuard } from '@nestjs/throttler';

@Controller('sentiment')
export class SentimentController {
	constructor(private readonly sentimentService: SentimentService) {}

	@Post()
	@HttpCode(200)
	@UseGuards(ThrottlerGuard)
	getSentiment(@Body() body: GetSentimentDto) {
		return this.sentimentService.getSentiment(body);
	}
}
