import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
    @ApiProperty({ example: '5', description: 'Номер стола' })
    readonly tableNumber: number;
    @ApiProperty({ example: '2024-10-17', description: 'Дата бронирования' })
    readonly date: Date;
    @ApiProperty({ example: '18:00', description: 'Время бронирования' })
    readonly time: string;
    @ApiProperty({ example: 'Иван Иванов', description: 'Имя клиента' })
    readonly customerName: string;
    @ApiProperty({ example: '+375291119996', description: 'Телефон клиента' })
    readonly customerPhone: string;

    staffId?: number;
    createdBy: 'staff' | 'user';
}