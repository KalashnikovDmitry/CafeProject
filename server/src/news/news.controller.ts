import { Body, Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { NewsService } from './news.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
}

