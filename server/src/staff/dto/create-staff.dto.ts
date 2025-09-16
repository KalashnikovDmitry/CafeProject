import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsOptional, MinLength } from "class-validator";

export class CreateStaffDto {
    @ApiProperty({example: 'Иванов Иван', description: 'Фамилия и имя сотрудника'})
    @IsString()
    name: string;

    @ApiProperty({example: 'user@mail.ru', description: 'Почтовый адрес'})
    @IsEmail()
    email: string;

    @ApiProperty({example: '+375291119996', description: 'Номер телефона'})
    @IsString()
    phone: string;

    @ApiProperty({example: 'Администратор зала', description: 'Должность сотрудника'})
    @IsString()
    role: string;

    @ApiProperty({example: 'qwerty123', description: 'Пароль', required: false})
    @IsOptional()
    @IsString()
    @MinLength(6)
    password?: string;
}