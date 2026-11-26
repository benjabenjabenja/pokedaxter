import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT ?? 3001;

    const prefix: string = 'api/v0'

    app.setGlobalPrefix(prefix);

    await app.listen(PORT);
}
await bootstrap();
