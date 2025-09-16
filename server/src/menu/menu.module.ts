import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { Menu } from './menu.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [MenuController],
  providers: [MenuService],
  imports: [
    SequelizeModule.forFeature([Menu]),
    AuthModule
  ],
  exports: [MenuService]
})
export class MenuModule {}
