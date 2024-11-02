import { ApiProperty } from '@nestjs/swagger';
import { Model, Column, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Staff } from 'src/staff/staff.model';

interface BookingCreationAttrs {
  staffId?: number;
  tableNumber: number;
  date: Date;
  time: string;
  customerName: string;
  customerPhone: string;
  createdBy: 'staff' | 'user';
}

@Table({ tableName: 'bookings' })
export class Booking extends Model<Booking, BookingCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор бронирования' })
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, unique: true })
    id: number;

    @ApiProperty({ example: '1', description: 'ID сотрудника, который оформил бронирование' })
    @ForeignKey(() => Staff)
    @Column({ type: DataType.INTEGER, allowNull: true })
    staffId?: number;

    @BelongsTo(() => Staff)
    staff: Staff;

    @ApiProperty({ example: '5', description: 'Номер стола' })
    @Column({ type: DataType.INTEGER, allowNull: false })
    tableNumber: number;

    @ApiProperty({ example: '2024-10-17', description: 'Дата бронирования' })
    @Column({ type: DataType.DATEONLY, allowNull: false })
    date: Date;

    @ApiProperty({ example: '18:00', description: 'Время бронирования' })
    @Column({ type: DataType.STRING, allowNull: false })
    time: string;

    @ApiProperty({ example: 'Иван Иванов', description: 'Имя клиента' })
    @Column({ type: DataType.STRING, allowNull: false })
    customerName: string;

    @ApiProperty({ example: '+375291119996', description: 'Телефон клиента' })
    @Column({ type: DataType.STRING, allowNull: false })
    customerPhone: string;

    @ApiProperty({ example: 'user', description: "Кем создано бронирование: 'staff' или 'user'" })
    @Column({ type: DataType.ENUM('staff', 'user'), allowNull: false })
    createdBy: 'staff' | 'user';
}