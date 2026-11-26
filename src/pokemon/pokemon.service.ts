import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto.js';
import { UpdatePokemonDto } from './dto/update-pokemon.dto.js';
import { Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity.js';
import { InjectModel } from '@nestjs/mongoose';
import { CODE_DUPLICATED_VALUE } from '../utils/const.js';

@Injectable()
export class PokemonService {

	constructor(
		@InjectModel(Pokemon.name)
		private readonly _pokemonModel: Model<Pokemon>
	){}

	async create(createPokemonDto: CreatePokemonDto): Promise<CreatePokemonDto> {

		try {
			createPokemonDto.name = createPokemonDto.name.toLowerCase();

			const newItem = await this._pokemonModel.create( createPokemonDto );
			return newItem;
			
		} catch (error: any) {
			console.error({ error });
			const defaultMessage = `Error creating new item ${createPokemonDto.name}`;

			if( error?.code === CODE_DUPLICATED_VALUE) {
				throw new BadRequestException(`Error: Existing pokemon in DB. ${createPokemonDto.name} ${JSON.stringify( error?.keyValue)}`);
			}

			throw new InternalServerErrorException(defaultMessage);
		}
		
	}

	async findAll() {
		return `This action returns all pokemon`;
	}

	async findOne(id: number) {
		return `This action returns a #${id} pokemon`;
	}

	async update(id: number, updatePokemonDto: UpdatePokemonDto) {
		return `This action updates a #${id} pokemon`;
	}

	async remove(id: number) {
		return `This action removes a #${id} pokemon`;
	}
}
