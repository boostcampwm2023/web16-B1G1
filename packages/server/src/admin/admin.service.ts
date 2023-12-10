import {
	Injectable,
	UnauthorizedException,
	UseFilters,
	UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { Board } from '../board/entities/board.entity';
import { Repository } from 'typeorm';
import { LogInterceptor } from '../interceptor/log.interceptor';
import { HttpExceptionFilter } from '../exception-filter/http.exception-filter';
import * as osUtils from 'os-utils';
import { exec } from 'child_process';
import { decryptAes } from '../util/aes.util';
import { InjectModel } from '@nestjs/mongoose';
import { Exception } from '../exception-filter/exception.schema';
import { awsConfig, bucketName } from '../config/aws.config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
@UseInterceptors(LogInterceptor)
@UseFilters(HttpExceptionFilter)
export class AdminService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		@InjectRepository(Board)
		private readonly boardRepository: Repository<Board>,
		@InjectModel(Exception.name)
		private readonly exceptionModel: Repository<Exception>,
		private readonly jwtService: JwtService,
	) {}

	async getAllPosts() {
		const posts = await this.boardRepository.find();

		// 이미지 있는 경우 이미지 경로 추가
		posts.forEach((post: any) => {
			if (post.images.length <= 0) return;
			post.images = post.images.map(
				(image) => `${awsConfig.endpoint.href}${bucketName}/${image.filename}`,
			);
		});

		return posts;
	}

	async getSystemInfo() {
		// 플랫폼 정보
		const platform = osUtils.platform();

		// CPU 개수
		const cpuCount = osUtils.cpuCount();

		// cpu 사용량 (비동기로 동작하여 Promise로 감싸줌)
		const usedCpu: number = await new Promise((resolve) => {
			osUtils.cpuUsage((cpuUsage) => {
				resolve(cpuUsage);
			});
		});
		const freeCpu: number = await new Promise((resolve) => {
			osUtils.cpuFree((cpuFree) => {
				resolve(cpuFree);
			});
		});
		const cpuUsage = `${Math.floor(usedCpu * 100 * 100) / 100}% (free ${
			Math.floor(freeCpu * 100 * 100) / 100
		}%)`;

		// 메모리 사용량
		const totalMem = osUtils.totalmem();
		const freeMem = osUtils.freemem();
		const usedMem = totalMem - freeMem;
		const memUsagePercent = usedMem / totalMem;
		const memUsage = `${Math.floor(memUsagePercent * 100 * 100) / 100}%`;

		// 디스크 사용량
		const diskUsageString: string = await new Promise((resolve) => {
			exec('df -h', (error, stdout, stderr) => {
				resolve(stdout);
			});
		});
		const diskUsageRows = diskUsageString.split('\n');
		const diskUsage = [];
		diskUsageRows.forEach((row) => {
			const rowSplit = row.split(' ');
			const rowSplitFiltered = rowSplit.filter((item) => item !== '');
			diskUsage.push(rowSplitFiltered);
		});
		// header는 따로 전송
		const diskUsageHead = diskUsage.shift();

		// 시스템 정보 객체로 반환
		const systemInfo = {
			platform,
			cpuCount,
			cpuUsage,
			memUsage,
			diskUsageHead,
			diskUsage,
		};

		return systemInfo;
	}

	async getAllExceptions() {
		const exceptions = await this.exceptionModel.find();
		return exceptions;
	}

	async signIn(password: string) {
		if (password !== process.env.ADMIN_PASSWORD) {
			throw new UnauthorizedException('wrong password');
		}
		const payload = { admin: true };
		const adminAccessToken = await this.jwtService.sign(payload);

		return { adminAccessToken };
	}
}
