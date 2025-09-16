import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { StaffService } from './staff.service';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Staff } from './staff.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateStaffDto } from './dto/create-staff.dto';

@ApiTags('Сотрудники')
@Controller('admin')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class StaffController {

    constructor(private staffService: StaffService) {}

    @ApiOperation({summary: 'Получение списка сотрудников'})
    @ApiResponse({status: 200, type: [Staff]})
    @Get('/staffs')
    getAll() {
        return this.staffService.getAllStaffs();
    }

    @ApiOperation({summary: 'Создание нового сотрудника'})
    @ApiResponse({status: 201, type: Staff})
    @Post('/staffs')
    async create(@Body() dto: CreateStaffDto): Promise<Omit<Staff, 'password'>> {
        return this.staffService.createStaff(dto);
    }

    @ApiOperation({summary: 'Обновление сотрудника'})
    @ApiResponse({status: 200, type: Staff})
    @Put('/staffs/:id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateStaffDto): Promise<Omit<Staff, 'password'>> {
        return this.staffService.updateStaff(id, dto);
    }

    @ApiOperation({summary: 'Удаление сотрудника'})
    @ApiResponse({status: 200})
    @Delete('/staffs/:id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.staffService.deleteStaff(id);
    }

    @ApiOperation({summary: 'Получение сотрудника по ID'})
    @ApiResponse({status: 200, type: Staff})
    @Get('/staffs/:id')
    getById(@Param('id', ParseIntPipe) id: number) {
        return this.staffService.getStaffById(id);
    }
}
