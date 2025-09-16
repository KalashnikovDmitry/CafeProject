import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";


async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule)

    // Глобальная валидация
    app.useGlobalPipes(new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));

    const config = new DocumentBuilder()
        .setTitle('Кафе API')
        .setDescription('Документация REST API для системы управления кафе')
        .setVersion('1.0.0')
        .addTag('CafeAK')
        .addBearerAuth()
        .build()
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document)
    app.enableCors()
    await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`))
}

start()