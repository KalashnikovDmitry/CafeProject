import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateStaffDto } from 'src/staff/dto/create-staff.dto';
import { LoginStaffDto } from 'src/staff/dto/login-staff.dto';
import { AuthService } from './auth.service';
import { Staff } from 'src/staff/staff.model';

@ApiTags('Авторизация сотрудника')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @ApiOperation({summary: 'Авторизация сотрудника'})
    @ApiResponse({status: 200, type: Staff})
    @Post('/login')
    login(@Body() staffDto: LoginStaffDto) {
        return this.authService.login(staffDto)
    }

    @ApiOperation({summary: 'Регистрация сотрудника'})
    @ApiResponse({status: 200, type: Staff})
    @Post('/registration')
    registration(@Body() staffDto: CreateStaffDto) {
        return this.authService.registration(staffDto)
    }
}
