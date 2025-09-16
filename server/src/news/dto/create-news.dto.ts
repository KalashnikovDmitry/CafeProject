import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsNumber } from "class-validator";

export class CreateNewsDto {
    @ApiProperty({ example: 'Заголовок новости', description: 'Заголовок новости' })
    @IsString()
    title: string;

    @ApiProperty({ example: 'Содержание новости...', description: 'Основной текст новости' })
    @IsString()
    content: string;

    @ApiProperty({ example: '1', description: 'ID сотрудника, который создает новость', required: false })
    @IsOptional()
    @IsNumber()
    staffId?: number;

    @ApiProperty({ example: 'http://example.com/image.jpg', description: 'URL изображения', required: false })
    @IsOptional()
    @IsString()
    image?: string;
}