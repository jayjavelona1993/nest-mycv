import { Controller, Post, Body, Delete, Get, Param, Query, Patch, Session, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import {UserDto} from "./dtos/user.dto";
import {Serialize} from "../interceptors/serialize.interceptor";
import {AuthService} from "./auth.service";
import {User} from "./user.entity";
import {CurrentUser} from "./decorators/current-user.decorator";
import {AuthGuard} from "../guards/auth.guard";

@Controller('auth')
@Serialize(UserDto)
export class UsersController {

    constructor(
        private userService: UsersService,
        private authService: AuthService
    ) {}


    @Get('/whoami')
    @UseGuards(AuthGuard)
    whoami(@CurrentUser() user: User) {
        return user;
    }

    @Post('/signout')
    signout(@Session() session: any) {
        session.userId = null;
    }

    @Post('/signup')
    async signup(@Body() body: CreateUserDto, @Session() session: any) {
        const user:User = await this.authService.signup(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Post('/signin')
    async signin(@Body() body: CreateUserDto, @Session() session: any) {
        const user:User =  await this.authService.signin(body.email, body.password);
        session.userId = user.id;
        return user;
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
