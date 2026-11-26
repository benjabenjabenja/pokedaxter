import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
// Interfaces
import { PokeApiResponse } from './interfaces/pokeApi-response.interface.js';
// Utils
import { BASE_URL_POKEAPI, DEFAULT_LIMIT_SEED } from '../utils/const.js';

@Injectable()
export class SeedService {

	private readonly _axios: AxiosInstance = axios.create({
		baseURL: BASE_URL_POKEAPI
	});

	async createSeed(limit: number = DEFAULT_LIMIT_SEED): Promise<any> {

		try {
			const { data: res } = await this._axios.get<PokeApiResponse>(`/pokemon?offset=0&limit=${limit}`);
			console.log({res})

			res.results.forEach( ({ url, name }) => {
				const segments = url.split('/');
				const nroPokemon = +segments[segments.length - 2];
			})

			return res;
			
		} catch (error: any) {
			throw new InternalServerErrorException('Error creating seed')
		}

	}
}
