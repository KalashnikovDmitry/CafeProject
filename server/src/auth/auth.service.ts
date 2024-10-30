import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateStaffDto } from 'src/staff/dto/create-staff.dto';
import { LoginStaffDto } from 'src/staff/dto/login-staff.dto';
import { StaffService } from 'src/staff/staff.service';
import * as bcrypt from 'bcryptjs';
import { Staff } from 'src/staff/staff.model';

@Injectable()
export class AuthService {

    constructor(private staffService: StaffService,
                private jwtService: JwtService) {}

    async login(staffDto: LoginStaffDto) {
        const user = await this.validateUser(staffDto)
        return this.generateToken(user);
    }

    async registration(staffDto: CreateStaffDto) {
        const candidate = await this.staffService.getStaffByEmail(staffDto.email)

        if(candidate) {
            throw new HttpException('Пользователь с таким email уже существует!', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(staffDto.password, 5);
        const user = await this.staffService.createStaff({...staffDto, password: hashPassword})
        return this.generateToken(user)
    }

    private async generateToken(user: Staff) {
        const payload = {name: user.name, email: user.email, id: user.id, role: user.role, phone: user.phone}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(staffDto: LoginStaffDto) {
        const user = await this.staffService.getStaffByEmail(staffDto.email);
        const passwordEquals = await bcrypt.compare(staffDto.password, user.password);

        if (user && passwordEquals) {
            return user
        }
        throw new UnauthorizedException({message: 'Неккоректный email или пароль!'})
    }
}
