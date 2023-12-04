import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const context = host.switchToHttp();
		const request = context.getRequest();
		const response = context.getResponse();
		const method = request.method;
		const status = exception.getStatus();

		response.status(status).json({
			path: `${method} ${request.url}`,
			error: `${status} ${exception.name}`,
			message: exception.message,
			timestamp: new Date().toISOString(),
		});
	}
}
