import { Module } from '@nestjs/common';
import { GalaxyService } from './galaxy.service';
import { GalaxyController } from './galaxy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Galaxy, GalaxySchema } from './schemas/galaxy.schema';
import {
	Exception,
	ExceptionSchema,
} from '../exception-filter/exception.schema';

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		AuthModule,
		MongooseModule.forFeature([
			{ name: Galaxy.name, schema: GalaxySchema },
			{ name: Exception.name, schema: ExceptionSchema },
		]),
	],
	controllers: [GalaxyController],
	providers: [GalaxyService],
})
export class GalaxyModule {}
