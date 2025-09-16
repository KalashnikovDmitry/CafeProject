import { ApiProperty } from '@nestjs/swagger';
import { Model, Column, Table, DataType } from 'sequelize-typescript';

interface MenuCreationAttrs {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isAvailable: boolean;
}

@Table({ tableName: 'menu' })
export class Menu extends Model<Menu, MenuCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, unique: true })
  id: number;

  @ApiProperty({ example: 'Паста Карбонара', description: 'Название блюда' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: 'Классическая паста с беконом и сливочным соусом', description: 'Описание блюда' })
  @Column({ type: DataType.TEXT, allowNull: false })
  description: string;

  @ApiProperty({ example: 15.99, description: 'Цена блюда' })
  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  price: number;

  @ApiProperty({ example: 'Основные блюда', description: 'Категория блюда' })
  @Column({ type: DataType.STRING, allowNull: false })
  category: string;

  @ApiProperty({ example: 'http://example.com/pasta.jpg', description: 'URL изображения' })
  @Column({ type: DataType.STRING })
  image: string;

  @ApiProperty({ example: true, description: 'Доступность блюда' })
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
  isAvailable: boolean;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z', description: 'Дата создания' })
  @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z', description: 'Дата обновления' })
  @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
  updatedAt: Date;
}
