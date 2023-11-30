import {
	CallHandler,
	ExecutionContext,
	Injectable,
	InternalServerErrorException,
	Logger,
	NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, tap } from 'rxjs';
import { DataSource, QueryRunner } from 'typeorm';
import { getRandomId } from '../util/interceptor.util';
import { LogColorCode } from './log-color.code';

@Injectable()
export class TransactionInterceptor implements NestInterceptor {
	constructor(private readonly dataSource: DataSource) {}

	async intercept(
		context: ExecutionContext,
		next: CallHandler<any>,
	): Promise<Observable<any>> {
		const req = context.switchToHttp().getRequest();
		const path = req.originalUrl;
		const method = req.method;

		const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		const startTime = new Date();
		const randomId = getRandomId();

		const transactionString = `${LogColorCode.orange}[Transaction - ${randomId}]${LogColorCode.reset}`;
		const pathString = `${LogColorCode.leaf}[${method} ${path}]${LogColorCode.reset}`;
		const startTimeString = `${
			LogColorCode.warmgray
		}[${startTime.toLocaleString('kr')}]${LogColorCode.reset}`;
		const transactionMentString = `- ${LogColorCode.orange}Transaction Start${LogColorCode.reset}`;

		const transactionStartLog = `${transactionString} ${pathString} ${startTimeString} ${transactionMentString}`;
		Logger.log(transactionStartLog);
		req.queryRunner = queryRunner;

		return next.handle().pipe(
			catchError(async (error) => {
				await queryRunner.rollbackTransaction();
				await queryRunner.release();

				const rollbackTime = new Date();
				const rollbackString = `${LogColorCode.red}[Transaction - ${randomId}]${LogColorCode.reset}`;
				const rollbackTimeString = `${
					LogColorCode.warmgray
				}[${rollbackTime.toLocaleString('kr')}]${LogColorCode.reset}`;
				const rollbackMentString = `- ${LogColorCode.red}Transaction Rollback${LogColorCode.reset}`;

				const rollbackLog = `${rollbackString} ${pathString} ${rollbackTimeString} ${rollbackMentString}`;
				Logger.error(rollbackLog);
				Logger.error(error);
				throw new InternalServerErrorException("Can't process your request");
			}),
			tap(async () => {
				await queryRunner.commitTransaction();
				await queryRunner.release();

				const commitTime = new Date();
				const commitString = `${LogColorCode.aqua}[Transaction - ${randomId}]${LogColorCode.reset}`;
				const commitTimeString = `${
					LogColorCode.warmgray
				}[${commitTime.toLocaleString('kr')} - ${
					startTime.getMilliseconds() - commitTime.getMilliseconds()
				}ms]${LogColorCode.reset}`;
				const commitMentString = `- ${LogColorCode.aqua}Transaction Commit${LogColorCode.reset}`;

				const commitLog = `${commitString} ${pathString} ${commitTimeString} ${commitMentString}`;
				Logger.log(commitLog);
			}),
		);
	}
}
