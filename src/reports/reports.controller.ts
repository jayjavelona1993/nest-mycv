import { Controller, Post, Body, UseGuards, Patch, Param, Get, Query } from '@nestjs/common';
import {CreateReportDto} from "./dtos/create-report.dto";
import {ReportsService} from "./reports.service";
import {AuthGuard} from "../guards/auth.guard";
import {CurrentUser} from "../users/decorators/current-user.decorator";
import {User} from "../users/user.entity";
import {ReportDto} from "./dtos/report.dto";
import {Serialize} from "../interceptors/serialize.interceptor";
import {ApproveReportDto} from "./dtos/approve-report.dto";
import {AdminGuard} from "../guards/admin.guard";
import {GetEstimateDto} from "./dtos/get-estimate.dto";

@Controller('reports')
@Serialize(ReportDto)
export class ReportsController {

    constructor(private reportsService: ReportsService) {}

    @Get()
    @UseGuards(AuthGuard)
    async findAll() {
        return await this.reportsService.findAll();
    }

    @Get('/estimate')
    async getEstimate(@Query() query: GetEstimateDto) {
        return await this.reportsService.createEstimate(query);
    }

    @Post()
    @UseGuards(AuthGuard)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        return this.reportsService.create(body, user);
    }

    @Patch('/:id')
    @UseGuards(AuthGuard)
    @UseGuards(AdminGuard)
    approveReport(@Body() body: ApproveReportDto, @CurrentUser() user: User,  @Param('id') id: string) {
        return this.reportsService.changeApproval(id, body.approved);
    }
}
