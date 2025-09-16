import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, IsOptional, Min } from 'class-validator';

export class CreateMenuDto {
  @ApiProperty({ example: 'Паста Карбонара', description: 'Название блюда' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Классическая паста с беконом и сливочным соусом', description: 'Описание блюда' })
  @IsString()
  description: string;

  @ApiProperty({ example: 15.99, description: 'Цена блюда' })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 'Основные блюда', description: 'Категория блюда' })
  @IsString()
  category: string;

  @ApiProperty({ example: 'http://example.com/pasta.jpg', description: 'URL изображения', required: false })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ example: true, description: 'Доступность блюда', required: false })
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;
}
