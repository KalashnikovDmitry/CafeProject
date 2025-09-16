import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsDateString, IsString, IsOptional, IsIn, Min } from 'class-validator';

export class CreateBookingDto {
    @ApiProperty({ example: '5', description: 'Номер стола' })
    @IsNumber()
    @Min(1)
    tableNumber: number;

    @ApiProperty({ example: '2024-10-17', description: 'Дата бронирования' })
    @IsDateString()
    date: Date;

    @ApiProperty({ example: '18:00', description: 'Время бронирования' })
    @IsString()
    time: string;

    @ApiProperty({ example: 'Иван Иванов', description: 'Имя клиента' })
    @IsString()
    customerName: string;

    @ApiProperty({ example: '+375291119996', description: 'Телефон клиента' })
    @IsString()
    customerPhone: string;

    @IsOptional()
    @IsNumber()
    staffId?: number;

    @IsIn(['staff', 'user'])
    createdBy: 'staff' | 'user';
}