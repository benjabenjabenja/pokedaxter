export interface PokeApiResponse {
    count: number;
    next: string;
    previus: string;
    results: PokemonApiDefault[]
}

export interface PokemonApiDefault {
    name: string;
    url: string;
}