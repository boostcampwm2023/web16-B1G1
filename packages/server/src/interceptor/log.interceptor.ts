import {
	CallHandler,
	ExecutionContext,
	Injectable,
	Logger,
	NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, tap } from 'rxjs';
import { getRandomId } from '../util/interceptor.util';
import { LogColorCode } from './log-color.code';

@Injectable()
export class LogInterceptor implements NestInterceptor {
	intercept(
		context: ExecutionContext,
		next: CallHandler<any>,
	): Observable<any> {
		const now = new Date();
		const req = context.switchToHttp().getRequest();
		const path = req.originalUrl;
		const method = req.method;

		const randomId = getRandomId();
		const reqString = `${LogColorCode.blue}[REQ - ${randomId}]${LogColorCode.reset}`;
		const pathString = `${LogColorCode.leaf}[${method} ${path}]${LogColorCode.reset}`;
		const reqTimeString = `${LogColorCode.warmgray}[${now.toLocaleString(
			'kr',
		)}]${LogColorCode.reset}`;
		let userString: string;

		let reqLog = `${reqString} ${pathString} ${reqTimeString}`;
		if (req.user) {
			userString = `${LogColorCode.purple}[${req.user.username}]${LogColorCode.reset}`;
			reqLog += ` ${userString}`;
		}
		Logger.log(reqLog);

		return next.handle().pipe(
			catchError((error) => {
				const errTime = new Date();
				const errString = `${LogColorCode.red}[ERR - ${randomId}]${LogColorCode.reset}`;
				const errTimeString = `${
					LogColorCode.warmgray
				}[${errTime.toLocaleString('kr')} - ${
					errTime.getMilliseconds() - now.getMilliseconds()
				}ms]${LogColorCode.reset}`;

				let errLog = `${errString} ${pathString} ${errTimeString}`;
				if (req.user) {
					errLog += ` ${userString}`;
				}
				Logger.error(errLog);
				Logger.error(
					`${error.getResponse()['statusCode']} ${
						error.getResponse()['error']
					} - ${error.getResponse()['message']}`,
				);
				throw error;
			}),
			tap(() => {
				const resTime = new Date();
				const resString = `${LogColorCode.orange}[RES - ${randomId}]${LogColorCode.reset}`;
				const resTimeString = `${
					LogColorCode.warmgray
				}[${resTime.toLocaleString('kr')} - ${
					resTime.getMilliseconds() - now.getMilliseconds()
				}ms]${LogColorCode.reset}`;

				let resLog = `${resString} ${pathString} ${resTimeString}`;
				if (req.user) {
					resLog += ` ${userString}`;
				}
				Logger.log(resLog);
			}),
		);
	}
}
