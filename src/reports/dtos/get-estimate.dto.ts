import {IsNumber, IsString, Min, Max, IsLongitude, IsLatitude} from "class-validator";
import {Transform} from "class-transformer";

const today = new Date();

export class GetEstimateDto {

    @IsString()
    make: string;

    @IsString()
    model: string;

    @Transform(({value}) => parseInt(value))
    @IsNumber()
    @Min(1930)
    @Max(today.getFullYear()+1)
    year: number;

    @Transform(({value}) => parseFloat(value))
    @IsNumber()
    @IsLatitude()
    lng: number;

    @Transform(({value}) => parseFloat(value))
    @IsNumber()
    @IsLongitude()
    lat: number;

    @Transform(({value}) => parseInt(value))
    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage: number;
}
