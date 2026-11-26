import { Module } from '@nestjs/common';
import { ParseMongoIdPipe } from './pipes/parse-mongo-id/parse-mongo-id.pipe.js';

@Module({
    providers: [ParseMongoIdPipe],
    exports: [
        ParseMongoIdPipe
    ]
})
export class CommonModule {}
