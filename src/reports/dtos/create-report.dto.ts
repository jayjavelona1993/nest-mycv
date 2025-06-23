import {IsNumber, IsString, Min, Max, IsLongitude, IsLatitude} from "class-validator";

const today = new Date();

export class CreateReportDto {

    @IsNumber()
    @Min(0)
    @Max(1000000)
    price: number;

    @IsString()
    make: string;

    @IsString()
    model: string;

    @IsNumber()
    @Min(1930)
    @Max(today.getFullYear()+1)
    year: number;

    @IsNumber()
    @IsLatitude()
    lng: number;

    @IsNumber()
    @IsLongitude()
    lat: number;

    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage: number;
}
