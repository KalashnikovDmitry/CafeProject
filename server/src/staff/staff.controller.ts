import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { StaffService } from './staff.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Staff } from './staff.model';

@ApiTags('Сотрудники')
@Controller('staff')
export class StaffController {

    constructor(private staffService: StaffService) {}

    @ApiOperation({summary: 'Получение списка сотрудников'})
    @ApiResponse({status: 200, type: [Staff]})
    @Get()
    getAll() {
        return this.staffService.getAllStaffs();
    }
}
