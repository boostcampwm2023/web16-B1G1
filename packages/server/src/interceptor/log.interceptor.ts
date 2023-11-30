import {
	CallHandler,
	ExecutionContext,
	Injectable,
	Logger,
	NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { getRandomId } from '../util/interceptor.util';

@Injectable()
export class LogInterceptor implements NestInterceptor {
	intercept(
		context: ExecutionContext,
		next: CallHandler<any>,
	): Observable<any> {
		const now = new Date();
		const req = context.switchToHttp().getRequest();
		const path = req.originalUrl;

		const randomId = getRandomId();
		const blueColor = '\x1b[34m';
		const purpleColor = '\x1b[35m';
		const resetColor = '\x1b[0m';
		let reqLog = `${blueColor}[REQ - ${randomId}]${resetColor} [${path}] [${now.toLocaleString(
			'kr',
		)}]`;
		if (req.user) {
			reqLog += ` [${req.user.username}]`;
		}
		Logger.log(reqLog);

		return next.handle().pipe(
			tap(() => {
				const resTime = new Date();
				let resLog = `${purpleColor}[RES - ${randomId}]${resetColor} [${path}] [${resTime.toLocaleString(
					'kr',
				)} - ${resTime.getMilliseconds() - now.getMilliseconds()}ms]`;
				if (req.user) {
					resLog += ` [${req.user.username}]`;
				}
				Logger.log(resLog);
			}),
		);
	}
}
