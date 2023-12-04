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

		try {
			fs.readFileSync('./logs/exceptions.log').toString();
		} catch (error) {
			fs.mkdirSync('./logs');
			fs.writeFileSync('./logs/exceptions.log', '');
		}

		let log = `[${new Date().toISOString()}] [${method} ${request.url}] [${status} ${exception.name}] - ${exception.message}\n`;
		if (request.user) {
			log = log.trim() + ` [${request.user.username}]\n`;
		}
		fs.appendFileSync(
			'./logs/exceptions.log',
			log,
		);



		response.status(status).json({
			path: `${method} ${request.url}`,
			error: `${status} ${exception.name}`,
			message: exception.message,
			timestamp: new Date().toISOString(),
		});
	}
}
