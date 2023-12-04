import { Module } from '@nestjs/common';
import { GalaxyService } from './galaxy.service';
import { GalaxyController } from './galaxy.controller';

@Module({
  controllers: [GalaxyController],
  providers: [GalaxyService],
})
export class GalaxyModule {}
