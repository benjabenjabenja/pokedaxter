import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
// Interfaces
import { PokeApiResponse } from './interfaces/pokeApi-response.interface.js';
// Utils
import { BASE_URL_POKEAPI, DEFAULT_LIMIT_SEED } from '../utils/const.js';
import { PokemonService } from '../pokemon/pokemon.service.js';
import { Pokemon } from '../pokemon/entities/pokemon.entity.js';

@Injectable()
export class SeedService {

	private readonly _axios: AxiosInstance = axios.create({
		baseURL: BASE_URL_POKEAPI
	});

	constructor(
		private readonly _pokemonService: PokemonService
	){}

	async createSeed(limit: number = DEFAULT_LIMIT_SEED): Promise<any> {

		try {

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
			
		} catch (error: any) {
			throw new InternalServerErrorException('Error creating seed')
		}

	}
}
