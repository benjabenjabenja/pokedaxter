import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
// DTOs
import { CreatePokemonDto } from './dto/create-pokemon.dto.js';
import { UpdatePokemonDto } from './dto/update-pokemon.dto.js';
// Entities
import { Pokemon } from './entities/pokemon.entity.js';
// Service
import { PokemonService } from './pokemon.service.js';
// Common
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id/parse-mongo-id.pipe.js';

@Controller('pokemon')
export class PokemonController {
	constructor(
		private readonly pokemonService: PokemonService
	) {}

	@Post()
	async create(
		@Body() createPokemonDto: CreatePokemonDto
	): Promise<Pokemon> {
		const res = await this.pokemonService.create(createPokemonDto);
		return res;
	}

	@Get()
	async findAll(// skip y take no funcionan aun
		@Param('skip') skip: string, 
		@Param('take') take: string
	) {
		const res = await this.pokemonService.findAll(+skip, +take);
		//console.log({ res })
		return res
	}

	@Get(':termSearch')
	async findOne(
		@Param('termSearch') termSearch: string
	): Promise<Pokemon> {
		const res = await this.pokemonService.findOne(termSearch);
		return res;
	}

	@Patch(':termSearch')
	async update(
		@Param('termSearch') termSearch: string, 
		@Body() updatePokemonDto: UpdatePokemonDto
	): Promise<Pokemon> {
		return await this.pokemonService.update(termSearch, updatePokemonDto);
	}

	@Delete(':id')
	async remove(
		@Param('id', ParseMongoIdPipe) id: string
	): Promise<void> {
		return await this.pokemonService.remove(id);
	}
}
