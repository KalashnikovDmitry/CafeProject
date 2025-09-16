import { Body, Controller, Get, Post, Put, Delete, Param, UploadedFile, UseGuards, UseInterceptors, ParseIntPipe } from '@nestjs/common';
import { NewsService } from './news.service';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { News } from './news.model';
import { CreateNewsDto } from './dto/create-news.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Новости')
@Controller('/')
export class NewsController {

    constructor(private newsService: NewsService) {}

    @ApiOperation({summary: 'Создание новости'})
    @ApiResponse({status: 200, type: [News]})
    @UseGuards(JwtAuthGuard)
    @Post('admin/create-news')
    @UseInterceptors(FileInterceptor('image'))
    createNews(@Body() dto: CreateNewsDto,
                     @UploadedFile() image) {
        return this.newsService.createNews(dto, image);
    }

    @ApiOperation({summary: 'Получение списка Новостей'})
    @ApiResponse({status: 200, type: [News]})
    @Get('news')
    getAllNews() {
        return this.newsService.getAllNews();
    }

    // Админские endpoints для управления новостями
    @ApiOperation({summary: 'Получение списка всех новостей (админ)'})
    @ApiResponse({status: 200, type: [News]})
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('admin/news')
    getAdminNews() {
        return this.newsService.getAllNews();
    }

    @ApiOperation({summary: 'Создание новости (админ)'})
    @ApiResponse({status: 201, type: News})
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post('news')
    createNewsAdmin(@Body() dto: CreateNewsDto) {
        return this.newsService.createNewsAdmin(dto);
    }

    @ApiOperation({summary: 'Обновление новости (админ)'})
    @ApiResponse({status: 200, type: News})
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Put('admin/news/:id')
    updateNews(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateNewsDto) {
        return this.newsService.updateNews(id, dto);
    }

    @ApiOperation({summary: 'Удаление новости (админ)'})
    @ApiResponse({status: 200})
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete('admin/news/:id')
    deleteNews(@Param('id', ParseIntPipe) id: number) {
        return this.newsService.deleteNews(id);
    }

    @ApiOperation({summary: 'Получение новости по ID (админ)'})
    @ApiResponse({status: 200, type: News})
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('admin/news/:id')
    getNewsById(@Param('id', ParseIntPipe) id: number) {
        return this.newsService.getNewsById(id);
    }
}

