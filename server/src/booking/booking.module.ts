import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { Booking } from './booking.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Staff } from 'src/staff/staff.model';
import { StaffModule } from 'src/staff/staff.module';

@Module({
  providers: [BookingService],
  controllers: [BookingController],
  imports: [
    StaffModule,
    SequelizeModule.forFeature([Booking, Staff]),
    AuthModule,
  ],
  exports: []
})
export class BookingModule {}
