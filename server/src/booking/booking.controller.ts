import { Body, Controller, Get, Post, Put, Delete, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { BookingService } from './booking.service';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
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

    // Админские endpoints для управления бронированиями
    @ApiOperation({summary: 'Получение списка всех бронирований (админ)'})
    @ApiResponse({status: 200, type: [Booking]})
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('admin/bookings')
    getAllBookings() {
        return this.bookingService.getAllBookings();
    }

    @ApiOperation({summary: 'Создание бронирования (админ)'})
    @ApiResponse({status: 201, type: Booking})
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post('admin/bookings')
    createBooking(@Body() dto: CreateBookingDto) {
        dto.createdBy = 'staff';
        return this.bookingService.createBooking(dto);
    }

    @ApiOperation({summary: 'Обновление бронирования (админ)'})
    @ApiResponse({status: 200, type: Booking})
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Put('admin/bookings/:id')
    updateBooking(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateBookingDto) {
        return this.bookingService.updateBooking(id, dto);
    }

    @ApiOperation({summary: 'Удаление бронирования (админ)'})
    @ApiResponse({status: 200})
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete('admin/bookings/:id')
    deleteBooking(@Param('id', ParseIntPipe) id: number) {
        return this.bookingService.deleteBooking(id);
    }

    @ApiOperation({summary: 'Получение бронирования по ID (админ)'})
    @ApiResponse({status: 200, type: Booking})
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('admin/bookings/:id')
    getBookingById(@Param('id', ParseIntPipe) id: number) {
        return this.bookingService.getBookingById(id);
    }
}
