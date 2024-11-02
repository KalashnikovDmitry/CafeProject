import { ApiProperty } from "@nestjs/swagger";

export class CreateNewsDto {
    @ApiProperty({ example: 'Заголовок новости', description: 'Заголовок новости' })
    readonly title: string;
    @ApiProperty({ example: 'Содержание новости...', description: 'Основной текст новости' })
    readonly content: string;
    @ApiProperty({ example: '1', description: 'ID сотрудника, который создает новость' })
    readonly staffId: number;
    @ApiProperty({ example: 'picture.jpg', description: 'Изображение для новостей' })
    image: string;
}