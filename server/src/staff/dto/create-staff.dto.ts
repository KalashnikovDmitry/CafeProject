import { ApiProperty } from "@nestjs/swagger";

export class CreateStaffDto {
    @ApiProperty({example: 'Иванов Иван', description: 'Фамилия и имя сотрудника'})
    readonly name: string;
    @ApiProperty({example: 'user@mail.ru', description: 'Почтовый адрес'})
    readonly email: string;
    @ApiProperty({example: '+375291119996', description: 'Номер телефона'})
    readonly phone: string;
    @ApiProperty({example: 'Администратор зала', description: 'Должность сотрудника'})
    readonly role: string;
    @ApiProperty({example: 'qwerty123', description: 'Пароль'}) 
    readonly password: string;
}