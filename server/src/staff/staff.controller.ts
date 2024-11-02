import { Controller, Get, UseGuards } from '@nestjs/common';
import { StaffService } from './staff.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Staff } from './staff.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Сотрудники')
@Controller('admin')
export class StaffController {

    constructor(private staffService: StaffService) {}

    @ApiOperation({summary: 'Получение списка сотрудников'})
    @ApiResponse({status: 200, type: [Staff]})
    @UseGuards(JwtAuthGuard)
    @Get('/staffs')
    getAll() {
        return this.staffService.getAllStaffs();
    }
}
