import {InjectRepository} from "@nestjs/typeorm";
import {Injectable, NotFoundException} from '@nestjs/common';
import {Report} from "./reports.entity";
import {Repository} from "typeorm";
import {CreateReportDto} from "./dtos/create-report.dto";
import {User} from "../users/user.entity";
import {GetEstimateDto} from "./dtos/get-estimate.dto";

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

    create (body: CreateReportDto, user: User) {
        const report = this.repo.create(body);
        report.user = user;
        return this.repo.save(report);
    }

    findAll() {
        return this.repo.find();
    }

    async changeApproval(id: string, approved: boolean) {
        const report = await this.repo.findOne({where: {id: parseInt(id)}});
        if(!report) throw new NotFoundException('Report not found');

        report.approved = approved;
        return this.repo.save(report);
    }

    async createEstimate(estimateDto:GetEstimateDto):Promise<Report[]> {
        return await this.repo.createQueryBuilder()
            .select('AVG(price)', 'price')
            .where('make = :make', {make: estimateDto.make})
            .andWhere('model = :model', {model: estimateDto.model})
            .andWhere('lat - :lat BETWEEN -5 AND 5', {lat: estimateDto.lat})
            .andWhere('lng - :lng BETWEEN -5 AND 5', {lng: estimateDto.lng})
            .andWhere('year - :year BETWEEN -3 AND 3', {year: estimateDto.year})
            .andWhere('approved is true', {year: estimateDto.year})
            .limit(3)
            .getRawMany();
    }

}
