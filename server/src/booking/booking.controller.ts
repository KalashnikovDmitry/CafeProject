import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Booking } from './booking.model';
import { CreateBookingDto } from './dto/create-booking.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Бронирование')
@Controller('/')
export class BookingController {

    constructor(private bookingService: BookingService) {}

    @ApiOperation({summary: 'Создание брони пользователем'})
    @ApiResponse({status: 200, type: Booking})
    @Post('booking-online/user')
    createBookingAsUser(@Body() dto: CreateBookingDto) {
        dto.createdBy = 'user';
        return this.bookingService.createBooking(dto);
    }

    @ApiOperation({summary: 'Создание брони сотрудником'})
    @ApiResponse({status: 200, type: Booking})
    @UseGuards(JwtAuthGuard)
    @Post('admin/booking-online/staff')
    createBookingAsStaff(@Body() dto: CreateBookingDto) {
        dto.createdBy = 'staff';
        return this.bookingService.createBooking(dto);
    }

    @ApiOperation({summary: 'Получение списка Бронирований'})
    @ApiResponse({status: 200, type: [Booking]})
    @UseGuards(JwtAuthGuard)
    @Get('admin/booking-list')
    getAllNews() {
        return this.bookingService.getAllBookings();
    }
}
