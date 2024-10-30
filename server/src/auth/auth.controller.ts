import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateStaffDto } from 'src/staff/dto/create-staff.dto';
import { LoginStaffDto } from 'src/staff/dto/login-staff.dto';
import { AuthService } from './auth.service';

@ApiTags('Авторизация сотрудника')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body() staffDto: LoginStaffDto) {
        return this.authService.login(staffDto)
    }

    @Post('/registration')
    registration(@Body() staffDto: CreateStaffDto) {
        return this.authService.registration(staffDto)
    }
}
