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

	async create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {

		try {
			createPokemonDto.name = createPokemonDto.name.toLowerCase();

			const newItem = await this._pokemonModel.create( createPokemonDto );
			return newItem;
			
		} catch (error: any) {
			throw this._handleErrors(error);
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
			throw this._handleErrors(error);
		}
		 
	}

	async update(termSearch: string, updatePokemonDto: UpdatePokemonDto): Promise<Pokemon> {
		
		try {
			const pokemonDB = await this.findOne(termSearch);

			if(updatePokemonDto.name) {
				updatePokemonDto.name = updatePokemonDto.name.toLowerCase().trim();
			}

			await pokemonDB.updateOne(updatePokemonDto, { new: true });

			return {
				...pokemonDB.toJSON(),
				...updatePokemonDto
			}
			
		} catch (error: any) {
			throw this._handleErrors(error)
		}
		
	}

	async remove(id: string): Promise<void> {
		try {
			const pokemonSearched = await this.findOne(id);

			if(!pokemonSearched) {// no encontrado
				throw new NotFoundException(`Pokemon not found: ${id}`);
			}

			await pokemonSearched.deleteOne();

		} catch (error: any) {
			throw this._handleErrors(error);
		}
	}

	private _handleErrors(error: any): Error {

		console.error({error})
	
		if(error?.status === STATUS_NOT_FOUND){
			throw new NotFoundException(`Pokemon not found. ${!!error?.keyValue ? JSON.stringify(error?.keyValue) : ''}`);
		}
	
		if( error?.code === CODE_DUPLICATED_VALUE) {
			throw new BadRequestException(`Error: Existing pokemon in DB. ${!!error?.keyValue ? JSON.stringify(error?.keyValue) : ''}`);
		}
	
		throw new InternalServerErrorException(`Internal Server Error`);
	
	}
}
