import { ApiProperty } from '@nestjs/swagger';
import { Model, Column, Table, HasMany, DataType } from 'sequelize-typescript';
import { Booking } from 'src/booking/booking.model';
import { News } from 'src/news/news.model';

interface StaffCreationAttrs {
    name: string;
    email: string;
    phone: string;
    role: string;
    password: string;
}

@Table({ tableName: 'staff' })
export class Staff extends Model<Staff, StaffCreationAttrs> {
    
  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})  
  @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true, unique: true})
  id: number;

  @ApiProperty({example: 'Иванов Иван', description: 'Фамилия и имя сотрудника'}) 
  @Column({type: DataType.STRING, allowNull: false})
  name: string;

  @ApiProperty({example: 'Администратор зала', description: 'Должность сотрудника'}) 
  @Column({type: DataType.STRING, allowNull: false})
  role: string; 

  @ApiProperty({example: 'user@mail.ru', description: 'Почтовый адрес'}) 
  @Column({type: DataType.STRING, allowNull: false, unique: true})
  email: string;

  @ApiProperty({example: '+375291119996', description: 'Номер телефона'}) 
  @Column({type: DataType.STRING, allowNull: false})
  phone: string;

  @ApiProperty({example: 'qwerty123', description: 'Пароль'}) 
  @Column({type: DataType.STRING, allowNull: false})
  password: string;

  @HasMany(() => News)
  news: News[]

  @HasMany(() => Booking)
  booking: Booking[]
}