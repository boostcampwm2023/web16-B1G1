import Redis from 'ioredis';
import { Injectable } from '@nestjs/common';
import { redisConfig } from '../config/redis.config';

@Injectable()
export class RedisRepository {
	private readonly redisClient: Redis;

	constructor() {
		this.redisClient = new Redis(redisConfig);
	}

	async get(key: string) {
		return this.redisClient.get(key);
	}

	async set(key: string, value: string) {
		return this.redisClient.set(key, value);
	}
}
