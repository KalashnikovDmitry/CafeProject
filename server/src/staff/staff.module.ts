import { forwardRef, Module } from '@nestjs/common';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';
import { Staff } from './staff.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { News } from 'src/news/news.model';
import { Booking } from 'src/booking/booking.model';

@Module({
  controllers: [StaffController],
  providers: [StaffService],
  imports: [
    SequelizeModule.forFeature([Staff, News, Booking]),
    forwardRef(() => AuthModule),
  ],
  exports: [
    StaffService,
  ]
})
export class StaffModule {}
