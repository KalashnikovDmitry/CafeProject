import { Body, Controller, Get, Post, Put, Delete, Param, UseGuards, ParseIntPipe, Query } from '@nestjs/common';
import { MenuService } from './menu.service';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Menu } from './menu.model';
import { CreateMenuDto } from './dto/create-menu.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Меню')
@Controller('admin')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class MenuController {

    constructor(private menuService: MenuService) {}

    @ApiOperation({summary: 'Получение списка всех позиций меню'})
    @ApiResponse({status: 200, type: [Menu]})
    @Get('menu')
    getAllMenuItems() {
        return this.menuService.getAllMenuItems();
    }

    @ApiOperation({summary: 'Создание новой позиции меню'})
    @ApiResponse({status: 201, type: Menu})
    @Post('menu')
    createMenuItem(@Body() dto: CreateMenuDto) {
        return this.menuService.createMenuItem(dto);
    }

    @ApiOperation({summary: 'Обновление позиции меню'})
    @ApiResponse({status: 200, type: Menu})
    @Put('menu/:id')
    updateMenuItem(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateMenuDto) {
        return this.menuService.updateMenuItem(id, dto);
    }

    @ApiOperation({summary: 'Удаление позиции меню'})
    @ApiResponse({status: 200})
    @Delete('menu/:id')
    deleteMenuItem(@Param('id', ParseIntPipe) id: number) {
        return this.menuService.deleteMenuItem(id);
    }

    @ApiOperation({summary: 'Получение позиции меню по ID'})
    @ApiResponse({status: 200, type: Menu})
    @Get('menu/:id')
    getMenuItemById(@Param('id', ParseIntPipe) id: number) {
        return this.menuService.getMenuItemById(id);
    }

    @ApiOperation({summary: 'Получение меню по категории'})
    @ApiResponse({status: 200, type: [Menu]})
    @ApiQuery({ name: 'category', required: false, description: 'Категория блюда' })
    @Get('menu/category/:category')
    getMenuByCategory(@Param('category') category: string) {
        return this.menuService.getMenuByCategory(category);
    }

    @ApiOperation({summary: 'Получение доступных позиций меню'})
    @ApiResponse({status: 200, type: [Menu]})
    @Get('menu/available')
    getAvailableMenuItems() {
        return this.menuService.getAvailableMenuItems();
    }
}
