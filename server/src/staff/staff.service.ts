import { Injectable } from '@nestjs/common';
import { Staff } from './staff.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStaffDto } from './dto/create-staff.dto';

@Injectable()
export class StaffService {

    constructor(@InjectModel(Staff) private staffRepository: typeof Staff) {}

    async createStaff(dto: CreateStaffDto) {
        const user = await this.staffRepository.create(dto);
        return user;
    }

    async getAllStaffs() {
        const users = await this.staffRepository.findAll();
        return users;
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
