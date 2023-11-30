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

@Injectable()
export class TransactionInterceptor implements NestInterceptor {
	constructor(private readonly dataSource: DataSource) {}

	async intercept(
		context: ExecutionContext,
		next: CallHandler<any>,
	): Promise<Observable<any>> {
		const req = context.switchToHttp().getRequest();
		const path = req.originalUrl;

		const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		const now = new Date();
		const pinkColor = '\x1b[35m';
		const aquaColor = '\x1b[36m';
		const redColor = '\x1b[31m';
		const resetColor = '\x1b[0m';
		Logger.log(
			`${pinkColor}[Transaction]${resetColor} [${path}] [${now.toLocaleString(
				'kr',
			)}] - Transaction Start`,
		);
		// TODO: transaction 사용하는 부분에서 이 queryRunner를 사용하도록 변경해야 함
		req.queryRunner = queryRunner;

		return next.handle().pipe(
			catchError(async (error) => {
				await queryRunner.rollbackTransaction();
				await queryRunner.release();
				// TODO: 에러를 로그만 남길지 던져줄지 정해야 함
				const rollbackTime = new Date();
				Logger.error(
					`${redColor}[Transaction]${resetColor} [${path}] [${rollbackTime.toLocaleString(
						'kr',
					)}] - Error Encountered, Transaction Rollback`,
				);
				Logger.error(error);
				throw new InternalServerErrorException("Can't process your request");
			}),
			tap(async () => {
				await queryRunner.commitTransaction();
				await queryRunner.release();
				const commitTime = new Date();
				Logger.log(
					`${aquaColor}[Transaction]${resetColor} [${path}] [${commitTime.toLocaleString(
						'kr',
					)} - ${
						now.getMilliseconds() - commitTime.getMilliseconds()
					}ms] - Transaction Commit`,
				);
			}),
		);
	}
}
