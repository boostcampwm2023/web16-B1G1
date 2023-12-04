import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import * as fs from 'fs';

@Catch(HttpException)
export class HttpExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const context = host.switchToHttp();
		const request = context.getRequest();
		const response = context.getResponse();
		const method = request.method;
		const status = exception.getStatus();

		const now = new Date();
		const koreanTime = new Date(now.getTime() + 9 * 60 * 60 * 1000);
		const date = `${koreanTime.getFullYear()}-${
			koreanTime.getMonth() + 1
		}-${koreanTime.getDate()}`;
		if (!fs.existsSync('./logs/exceptions')) {
			fs.mkdirSync('./logs/exceptions', { recursive: true });
		}

		let log = `[${koreanTime.toISOString()}] [${method} ${
			request.url
		}] [${status} ${exception.name}] - ${exception.message}\n`;
		if (request.user) {
			log = log.trim() + ` [${request.user.username}]\n`;
		}
		fs.appendFileSync(`./logs/exceptions/${date}.log`, log);

		response.status(status).json({
			path: `${method} ${request.url}`,
			error: `${status} ${exception.name}`,
			message: exception.message,
			timestamp: new Date().toISOString(),
		});
	}
}
