import {
	CallHandler,
	ExecutionContext,
	Injectable,
	Logger,
	NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LogInterceptor implements NestInterceptor {
	intercept(
		context: ExecutionContext,
		next: CallHandler<any>,
	): Observable<any> {
		const now = new Date();
		const req = context.switchToHttp().getRequest();
		const path = req.originalUrl;

		const blueColor = '\x1b[34m';
		const purpleColor = '\x1b[35m';
		const resetColor = '\x1b[0m';

		let reqLog = `${blueColor}[REQ]${resetColor} [${path}] [${now.toLocaleString(
			'kr',
		)}]`;
		if (req.user) {
			reqLog += ` [${req.user.username}]`;
		}
		Logger.log(reqLog);

		return next.handle().pipe(
			tap(() => {
				let resLog = `${purpleColor}[RES]${resetColor} [${path}] [${new Date().toLocaleString(
					'kr',
				)} - ${new Date().getMilliseconds() - now.getMilliseconds()}ms]`;
				if (req.user) {
					resLog += ` [${req.user.username}]`;
				}
				Logger.log(resLog);
			}),
		);
	}
}
