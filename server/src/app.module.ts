import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import { Staff } from "./staff/staff.model";
import { StaffModule } from "./staff/staff.module";
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './news/news.module';
import { News } from "./news/news.model";
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import { BookingModule } from './booking/booking.module';
import { MenuModule } from './menu/menu.module';
import { Menu } from "./menu/menu.model";
import * as path from 'path';
import { Booking } from "./booking/booking.model";

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, "static"),
        }),
        SequelizeModule.forRoot({
          dialect: 'postgres',
          host: process.env.POSTGRES_HOST,
          port: Number(process.env.POSTGRES_PORT),
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB,
          models: [Staff, News, Booking, Menu],
          autoLoadModels: true
        }),
        StaffModule,
        AuthModule,
        NewsModule,
        FilesModule,
        BookingModule,
        MenuModule,
      ],
})
export class AppModule {}