import { Module } from '@nestjs/common';
import { GalaxyService } from './galaxy.service';
import { GalaxyController } from './galaxy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Galaxy, GalaxySchema } from './schemas/galaxy.schema';

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		AuthModule,
		MongooseModule.forFeature([{ name: Galaxy.name, schema: GalaxySchema }]),
	],
	controllers: [GalaxyController],
	providers: [GalaxyService],
})
export class GalaxyModule {}
