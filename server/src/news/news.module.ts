import { forwardRef, Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { News } from './news.model';
import { StaffModule } from 'src/staff/staff.module';
import { AuthModule } from 'src/auth/auth.module';
import { Staff } from 'src/staff/staff.model';
import { FilesModule } from 'src/files/files.module';

@Module({
  providers: [NewsService],
  controllers: [NewsController],
  imports: [
    StaffModule,
    SequelizeModule.forFeature([Staff, News]),
    AuthModule,
    FilesModule,
  ],
  exports: []
})
export class NewsModule {}
