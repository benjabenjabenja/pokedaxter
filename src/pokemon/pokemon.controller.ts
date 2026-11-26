import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PokemonService } from './pokemon.service.js';
import { CreatePokemonDto } from './dto/create-pokemon.dto.js';
import { UpdatePokemonDto } from './dto/update-pokemon.dto.js';
import { Pokemon } from './entities/pokemon.entity.js';

@Controller('pokemon')
export class PokemonController {
	constructor(private readonly pokemonService: PokemonService) {}

	@Post()
	async create(
		@Body() createPokemonDto: CreatePokemonDto
	): Promise<CreatePokemonDto> {
		const res = await this.pokemonService.create(createPokemonDto);
		console.log({ created: res });
		return res;
	}

	@Get()
	async findAll() {
		return this.pokemonService.findAll();
	}

	@Get(':termSearch')
	async findOne(
		@Param('termSearch') termSearch: string
	): Promise<Pokemon> {
		const res = await this.pokemonService.findOne(termSearch);
		console.log({ res })
		return res;
	}

	@Patch(':termSearch')
	async update(
		@Param('termSearch') termSearch: string, 
		@Body() updatePokemonDto: UpdatePokemonDto
	) {
		return await this.pokemonService.update(termSearch, updatePokemonDto);
	}

	@Delete(':id')
	async remove(@Param('id') id: string) {
		return this.pokemonService.remove(id);
	}
}
