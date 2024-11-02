import { Injectable } from '@nestjs/common';
import { Booking } from './booking.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingService {

    constructor(@InjectModel(Booking) private bookingRepository: typeof Booking) {}

    async createBooking(dto: CreateBookingDto) {
        return this.bookingRepository.create(dto);
    }

    async getAllBookings() {
        return this.bookingRepository.findAll({
            include: [{ all: true }]});
    }
}
