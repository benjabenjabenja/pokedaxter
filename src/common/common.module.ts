import { Module } from '@nestjs/common';
import { ParseMongoIdPipe } from './pipes/parse-mongo-id/parse-mongo-id.pipe.js';
import { HttpClientAxios } from './adapters/httpClientAxios.adapter.js';

@Module({
    providers: [ParseMongoIdPipe, HttpClientAxios],
    exports: [
        ParseMongoIdPipe,
        HttpClientAxios
    ]
})
export class CommonModule {}
