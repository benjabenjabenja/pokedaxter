import { IsInt, IsNotEmpty, IsNumber, IsString, Min, MinLength } from "class-validator";
// utils
import { MIN_LENGTH, MINUM_NUMBER } from "../../utils/const.js";


export class CreatePokemonDto {

    @IsString()
    @MinLength(MIN_LENGTH)
    name: string;

    @IsNumber()
    @IsInt()
    @IsNotEmpty()
    @Min(MINUM_NUMBER)
    nroPokemon: number;
    
}
