import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
} from '@nestjs/common';
import { GetSentimentDto } from './dto/get-sentiment.dto';
import { clovaConfig } from '../config/clova.config';

@Injectable()
export class SentimentService {
	async getSentiment(body: GetSentimentDto) {
		const { content } = body;
		if (!content) throw new BadRequestException('content is required');

		const response = await fetch(clovaConfig.url, {
			method: 'POST',
			headers: {
				'X-NCP-APIGW-API-KEY-ID': clovaConfig.api_key_id,
				'X-NCP-APIGW-API-KEY': clovaConfig.api_key_secret,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				content: content,
			}),
		});

		const result = await response.json();
		// 에러 발생한 경우 internal server error
		if (result.error || !result.document) {
			throw new InternalServerErrorException('sentiment api failed');
		}

		// 감성분석 결과(result.document)가 있는 경우
		const { positive, negative, neutral } = result.document.confidence;
		// 값이 없거나 숫자로 변환이 안될 경우 에러 리턴
		if (
			!positive ||
			!negative ||
			!neutral ||
			isNaN(positive) ||
			isNaN(negative) ||
			isNaN(neutral)
		) {
			throw new InternalServerErrorException('sentiment api failed');
		}

		// 0~100 사이의 positive, negative, neutral을 각각 0x00~0xFF 사이의 R, G, B 값으로 변환
		const positiveColor = Math.round((Number(positive) / 100) * 0xff);
		const negativeColor = Math.round((Number(negative) / 100) * 0xff);
		const neutralColor = Math.round((Number(neutral) / 100) * 0xff);

		// 무조건 두자리 숫자의 string으로 변환
		const toHex = (color: number) => {
			const hex = color.toString(16);
			return hex.length === 1 ? `0${hex}` : hex;
		};

		// #RRGGBB 형식으로 변환
		const colorRecommendation =
			`#` + toHex(positiveColor) + toHex(neutralColor) + toHex(negativeColor);

		return { color: colorRecommendation };
	}
}
