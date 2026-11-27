import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// Adapter
import { HttpClientAxios } from '../common/adapters/httpClientAxios.adapter.js';
// Interfaces
import { PokeApiResponse } from './interfaces/pokeApi-response.interface.js';
// Utils
import { DEFAULT_LIMIT_SEED } from '../utils/const.js';
// import { PokemonService } from '../pokemon/pokemon.service.js';
import { Pokemon } from '../pokemon/entities/pokemon.entity.js';

@Injectable()
export class SeedService {

	constructor(
		@InjectModel(Pokemon.name)
		private readonly _pokemonModel: Model<Pokemon>,
		// private readonly _pokemonService: PokemonService
		private readonly _httpClient: HttpClientAxios
	){}

	async createSeed(limit: number = DEFAULT_LIMIT_SEED): Promise<void> {

		try {

			/* // otra forma de hacerlo
			const insertPokemons: Promise<Pokemon>[] = [];
			
			const { data: res } = await this._axios.get<PokeApiResponse>(`/pokemon?offset=0&limit=${limit}`);
			console.log({res})

			res.results.forEach(({ url, name }) => {
				const segments = url.split('/');
				const nroPokemon = +segments[segments.length - 2];

				//await this._pokemonService.create({
				//	nroPokemon,
				//	name
				//});
				insertPokemons.push(this._pokemonService.create({ nroPokemon, name }));
			});

			await Promise.all(insertPokemons)

			return res; 
			*/
			await this._pokemonModel.deleteMany({}); // borramos todo lo que es basura

			const insertPokemons: Pokemon[] = [];

			const res = await this._httpClient.get<PokeApiResponse>(`/pokemon?offset=0&limit=${limit}`);

			res.results.forEach(({ url, name }) => {
				const segments = url.split('/');
				const nroPokemon = +segments[segments.length - 2];
				
				insertPokemons.push({ nroPokemon, name } as Pokemon);
			});

			await this._pokemonModel.insertMany(insertPokemons);
			
		} catch (error: any) {
			throw new InternalServerErrorException('Error creating seed')
		}

	}
}
