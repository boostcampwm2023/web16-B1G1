import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseConfig } from './config/mongoose.config';

@Module({
	imports: [
		AuthModule,
		BoardModule,
		TypeOrmModule.forRoot(typeOrmConfig),
		MongooseModule.forRoot(mongooseConfig.uri),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
