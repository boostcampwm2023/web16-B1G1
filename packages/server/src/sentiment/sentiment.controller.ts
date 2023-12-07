import { Body, Controller, Post } from '@nestjs/common';
import { SentimentService } from './sentiment.service';
import { GetSentimentDto } from './dto/get-sentiment.dto';

@Controller('sentiment')
export class SentimentController {
	constructor(private readonly sentimentService: SentimentService) {}

	@Post()
	getSentiment(@Body() body: GetSentimentDto) {
		return this.sentimentService.getSentiment(body);
	}
}
