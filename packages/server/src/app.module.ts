import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseConfig } from './config/mongoose.config';
import { StarModule } from './star/star.module';
import { GalaxyModule } from './galaxy/galaxy.module';
import { AdminModule } from './admin/admin.module';
import { SentimentModule } from './sentiment/sentiment.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
	imports: [
		AuthModule,
		BoardModule,
		TypeOrmModule.forRoot(typeOrmConfig),
		MongooseModule.forRoot(mongooseConfig.uri),
		StarModule,
		GalaxyModule,
		AdminModule,
		SentimentModule,
		ThrottlerModule.forRoot([
			{
				ttl: 5000, // 5초에
				limit: 5, // 5번까지 요청 가능
			},
		]),
	],
})
export class AppModule {}
