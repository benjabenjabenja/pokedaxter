import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";
// Utils
import { MINUM_NUMBER } from "../../utils/const.js";

export class PaginatedDto {

    @IsPositive()
    @IsOptional()
    @IsNumber()
    offset: number

    @IsPositive()
    @IsOptional()
    @IsNumber()
    @Min(MINUM_NUMBER)
    limit: number;

}