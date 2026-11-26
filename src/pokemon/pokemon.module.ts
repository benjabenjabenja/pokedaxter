import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// Services
import { PokemonService } from './pokemon.service.js';
// controllers
import { PokemonController } from './pokemon.controller.js';
// Entities
import { Pokemon, PokemonSchema } from './entities/pokemon.entity.js';
// Pipes
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id/parse-mongo-id.pipe.js';

@Module({
	controllers: [PokemonController],
	providers: [PokemonService, ParseMongoIdPipe],
	imports: [
		MongooseModule.forFeature([
			{
				name: Pokemon.name,
				schema: PokemonSchema
			}
		])
	]
})
export class PokemonModule {}
