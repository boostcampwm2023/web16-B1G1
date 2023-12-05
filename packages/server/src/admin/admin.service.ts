import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Board } from 'src/board/entities/board.entity';
import { Repository } from 'typeorm';
import * as osUtils from 'os-utils';

@Injectable()
export class AdminService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		@InjectRepository(Board)
		private readonly boardRepository: Repository<Board>,
	) {}

	async getAllPosts() {
		const posts = await this.boardRepository.find();
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

		// 시스템 정보 객체로 반환
		const systemInfo = {
			platform,
			cpuCount,
			cpuUsage,
			memUsage,
		};

		return systemInfo;
	}
}
