import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';
import { DEAFULT_PREFIX_API, DEFAULT_PORT } from './utils/const.js';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT ?? DEFAULT_PORT;

    const prefix: string = process.env.PREFIX_API ?? DEAFULT_PREFIX_API

    app.setGlobalPrefix(prefix);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: {
                enableImplicitConversion: true
            }
        })
    );

    await app.listen(PORT);
}
await bootstrap();
