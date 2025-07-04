import {Injectable, NestMiddleware} from "@nestjs/common";
import {Request, Response, NextFunction} from "express";
import {UsersService} from "../users.service";
import {User} from "../user.entity";

declare global {
    namespace Express {
        interface Request {
            currentUser: User | null;
        }
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(private userService: UsersService) {}

    async use(req: Request, res: Response, next: NextFunction) {
        const {userId} = req.session || {};

        if(!userId) return next();

        const user : User|null = await this.userService.findOne(userId);

        req.currentUser = user;

        next();
    }
}