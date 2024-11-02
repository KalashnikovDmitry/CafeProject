import { Injectable } from '@nestjs/common';
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

    async getAllNews() {
        return this.newsRepository.findAll({
          include: [{ model: Staff, attributes: ['name'] }]});
      }
}
