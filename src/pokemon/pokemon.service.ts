import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// model
import { isValidObjectId, Model } from 'mongoose';
// dto's
import { CreatePokemonDto } from './dto/create-pokemon.dto.js';
import { UpdatePokemonDto } from './dto/update-pokemon.dto.js';
// entities
import { Pokemon } from './entities/pokemon.entity.js';
// utils
import { CODE_DUPLICATED_VALUE, STATUS_NOT_FOUND } from '../utils/const.js';

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

	async findOne(termSearch: string): Promise<Pokemon> {

		let pokemonSearched;

		try {

			if(!isNaN(+termSearch)) {// by nro de pokemon
				pokemonSearched = await this._pokemonModel.findOne({ nroPokemon: +termSearch });
			}

			if(!pokemonSearched && isValidObjectId(termSearch)){// id de mongo db
				pokemonSearched = await this._pokemonModel.findById( termSearch );
			}

			if(!pokemonSearched && typeof termSearch === "string") {// opcion si es un nombre
				pokemonSearched = await this._pokemonModel.findOne({ name: termSearch.toLowerCase().trim() });
			}

			if(!pokemonSearched) {// no encontrado
				throw new NotFoundException(`Pokemon not found: ${termSearch}`);
			}

			return pokemonSearched as Pokemon;

		} catch (error: any) {
			console.error({error});

			if(error?.status === STATUS_NOT_FOUND){
				throw new NotFoundException(`Pokemon not found: ${termSearch}`);
			}

			throw new InternalServerErrorException(`Error finding pokemon: ${termSearch}`);
		}
		 
	}

	async update(id: string, updatePokemonDto: UpdatePokemonDto) {
		return `This action updates a #${id} pokemon`;
	}

	async remove(id: string) {
		return `This action removes a #${id} pokemon`;
	}
}
