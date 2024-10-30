import { Module } from '@nestjs/common';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';
import { Staff } from './staff.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [StaffController],
  providers: [StaffService],
  imports: [
    SequelizeModule.forFeature([Staff])
  ],
  exports: [StaffService]
})
export class StaffModule {}
