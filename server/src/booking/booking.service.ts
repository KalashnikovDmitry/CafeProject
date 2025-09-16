import { Injectable, NotFoundException } from '@nestjs/common';
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
            include: [{ all: true }],
            order: [['date', 'ASC'], ['time', 'ASC']]
        });
    }

    async getBookingById(id: number) {
        const booking = await this.bookingRepository.findByPk(id, {
            include: [{ all: true }]
        });
        
        if (!booking) {
            throw new NotFoundException('Бронирование не найдено');
        }
        
        return booking;
    }

    async updateBooking(id: number, dto: CreateBookingDto) {
        const booking = await this.bookingRepository.findByPk(id);
        
        if (!booking) {
            throw new NotFoundException('Бронирование не найдено');
        }

        await booking.update(dto);
        return booking;
    }

    async deleteBooking(id: number) {
        const booking = await this.bookingRepository.findByPk(id);
        
        if (!booking) {
            throw new NotFoundException('Бронирование не найдено');
        }

        await booking.destroy();
        return { message: 'Бронирование успешно удалено' };
    }
}
