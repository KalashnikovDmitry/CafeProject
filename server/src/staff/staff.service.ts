import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Staff } from './staff.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStaffDto } from './dto/create-staff.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class StaffService {

    constructor(@InjectModel(Staff) private staffRepository: typeof Staff) {}

    async createStaff(dto: CreateStaffDto): Promise<Omit<Staff, 'password'>> {
        // Проверяем, существует ли сотрудник с таким email
        const existingStaff = await this.staffRepository.findOne({ where: { email: dto.email } });
        if (existingStaff) {
            throw new ConflictException('Сотрудник с таким email уже существует');
        }

        // Хешируем пароль
        const hashedPassword = await bcrypt.hash(dto.password, 5);
        
        const staff = await this.staffRepository.create({
            ...dto,
            password: hashedPassword
        });
        
        // Возвращаем без пароля
        const { password, ...result } = staff.toJSON();
        return result as Omit<Staff, 'password'>;
    }

    async getAllStaffs() {
        const staffs = await this.staffRepository.findAll({
            attributes: { exclude: ['password'] }
        });
        return staffs;
    }

    async getStaffById(id: number) {
        const staff = await this.staffRepository.findByPk(id, {
            attributes: { exclude: ['password'] }
        });
        
        if (!staff) {
            throw new NotFoundException('Сотрудник не найден');
        }
        
        return staff;
    }

    async updateStaff(id: number, dto: CreateStaffDto): Promise<Omit<Staff, 'password'>> {
        const staff = await this.staffRepository.findByPk(id);
        
        if (!staff) {
            throw new NotFoundException('Сотрудник не найден');
        }

        // Проверяем email на уникальность (если изменился)
        if (dto.email !== staff.email) {
            const existingStaff = await this.staffRepository.findOne({ where: { email: dto.email } });
            if (existingStaff) {
                throw new ConflictException('Сотрудник с таким email уже существует');
            }
        }

        // Хешируем пароль только если он предоставлен
        const updateData: any = { ...dto };
        if (dto.password) {
            updateData.password = await bcrypt.hash(dto.password, 5);
        } else {
            // Если пароль не предоставлен, не обновляем его
            delete updateData.password;
        }

        await staff.update(updateData);
        
        // Возвращаем без пароля
        const { password, ...result } = staff.toJSON();
        return result as Omit<Staff, 'password'>;
    }

    async deleteStaff(id: number) {
        const staff = await this.staffRepository.findByPk(id);
        
        if (!staff) {
            throw new NotFoundException('Сотрудник не найден');
        }

        await staff.destroy();
        return { message: 'Сотрудник успешно удален' };
    }

    async getStaffByEmail(email: string) {
        const user = await this.staffRepository.findOne({where: {email}, include: {all: true}})
        return user;
    }

    async getStaffNameById(id: number) {
        const userName = await this.staffRepository.findOne({where: {id}, include: {all: true}})
        return userName.name;
    }
}
