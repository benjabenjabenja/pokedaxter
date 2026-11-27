import { Module } from '@nestjs/common';
import { ParseMongoIdPipe } from './pipes/parse-mongo-id/parse-mongo-id.pipe.js';
import { HttpClientAxios } from './adapters/httpClientAxios.adapter.js';
import { ConfigModule } from '@nestjs/config';

@Module({
    providers: [
        ParseMongoIdPipe, 
        HttpClientAxios
    ],
    imports: [ConfigModule],
    exports: [
        ParseMongoIdPipe,
        HttpClientAxios
    ]
})
export class CommonModule {}
