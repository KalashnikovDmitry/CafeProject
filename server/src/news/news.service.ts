import { Injectable, NotFoundException } from '@nestjs/common';
import { News } from './news.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateNewsDto } from './dto/create-news.dto';
import { Staff } from 'src/staff/staff.model';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class NewsService {

    constructor(@InjectModel(News) private newsRepository: typeof News,
                private fileService: FilesService) {}

    async createNews(dto: CreateNewsDto, image: string) {
      const fileName = await this.fileService.createFile(image)
        const news = await this.newsRepository.create({ ...dto, image: fileName});
        return news;
    }

    async createNewsAdmin(dto: CreateNewsDto) {
        // Для админской панели создаем новость с URL изображения
        const news = await this.newsRepository.create(dto);
        return news;
    }

    async getAllNews() {
        return this.newsRepository.findAll({
          include: [{ model: Staff, attributes: ['name'] }],
          order: [['createdAt', 'DESC']]
        });
    }

    async getNewsById(id: number) {
        const news = await this.newsRepository.findByPk(id, {
            include: [{ model: Staff, attributes: ['name'] }]
        });
        
        if (!news) {
            throw new NotFoundException('Новость не найдена');
        }
        
        return news;
    }

    async updateNews(id: number, dto: CreateNewsDto) {
        const news = await this.newsRepository.findByPk(id);
        
        if (!news) {
            throw new NotFoundException('Новость не найдена');
        }

        await news.update(dto);
        return news;
    }

    async deleteNews(id: number) {
        const news = await this.newsRepository.findByPk(id);
        
        if (!news) {
            throw new NotFoundException('Новость не найдена');
        }

        await news.destroy();
        return { message: 'Новость успешно удалена' };
    }
}
