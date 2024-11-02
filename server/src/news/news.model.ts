import { ApiProperty } from '@nestjs/swagger';
import { Model, Column, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Staff } from '../staff/staff.model';

interface NewsCreationAttrs {
  title: string;
  content: string;
  image: string;
  staffId: number;
}

@Table({ tableName: 'news' })
export class News extends Model<News, NewsCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, unique: true })
  id: number;

  @ApiProperty({ example: 'Заголовок новости', description: 'Заголовок новости' })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({ example: 'Содержание новости...', description: 'Основной текст новости' })
  @Column({ type: DataType.TEXT, allowNull: false })
  content: string;

  @ApiProperty({ example: 'http://example.com/image.jpg', description: 'изображение' })
  @Column({ type: DataType.STRING})
  image: string;

  @ApiProperty({ example: '1', description: 'ID сотрудника, который создал новость' })
  @ForeignKey(() => Staff)
  @Column({ type: DataType.INTEGER, allowNull: false })
  staffId: number;

  @BelongsTo(() => Staff)
  author: Staff;
}