import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import {UsersService} from "./users.service";
import {AuthService} from "./auth.service";
import {User} from "./user.entity";

describe('UsersController', () => {
    let controller: UsersController;
    let fakeAuthService: Partial<AuthService>;
    let fakeUsersService: Partial<UsersService>;
    //let fakeUserController: Partial<UsersController>;

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController]
        }).compile();

        controller = module.get<UsersController>(UsersController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
