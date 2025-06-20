import { Controller, Post, Body, Delete, Get, Param, Query, Patch, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import {UserDto} from "./dtos/user.dto";
import {Serialize} from "../interceptors/serialize.interceptor";
import {AuthService} from "./auth.service";

@Controller('auth')
@Serialize(UserDto)
export class UsersController {

    constructor(
        private userService: UsersService,
        private authService: AuthService
    ) {}

    @Post('/signup')
    async signup(@Body() body: CreateUserDto) {
        return await this.authService.signup(body.email, body.password);
    }

    @Post('/signin')
    async signin(@Body() body: CreateUserDto) {
        return await this.authService.signin(body.email, body.password);
    }


    @Get('/:id')
    async findUser(@Param('id') id: string) {
        return await this.userService.findOne(parseInt(id));
    }

    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.userService.find(email);
    }

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto) {
        return await this.userService.create(body.email, body.password);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        this.userService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.userService.update(parseInt(id), body);
    }

}
