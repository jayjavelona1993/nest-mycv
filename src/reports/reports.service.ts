import {InjectRepository} from "@nestjs/typeorm";
import {Injectable, NotFoundException} from '@nestjs/common';
import {Report} from "./reports.entity";
import {Repository} from "typeorm";
import {CreateReportDto} from "./dtos/create-report.dto";
import {User} from "../users/user.entity";

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

}
