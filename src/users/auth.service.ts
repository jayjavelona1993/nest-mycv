import {BadRequestException, Injectable} from '@nestjs/common';
import {UsersService} from "./users.service";
import {randomBytes, scrypt as _scrypt} from "crypto";
import {promisify} from "util";
import {User} from "./user.entity";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private userService: UsersService) {}

    async signup(email: string, password: string):Promise<User> {
        const existing_user = await this.userService.find(email);
        if(existing_user.length) throw new BadRequestException('Email in use');

        //hash password
        //generate salt
        const salt = randomBytes(8).toString('hex');
        //hash salt and password together
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        //join hash and salt
        const result = salt + '.' + hash.toString('hex');

        return await this.userService.create(email, result);
    }

    async signin(email: string, password: string): Promise<User> {
        const [user] = await this.userService.find(email);
        if(!user) throw new BadRequestException('User does not exist');

        const [salt, storedHash] = user.password.split('.');

        const hash = (await scrypt(password, salt, 32)) as Buffer;

        if(storedHash == hash.toString('hex')) return user;
        throw new BadRequestException('Invalid credentials');
    }
}
