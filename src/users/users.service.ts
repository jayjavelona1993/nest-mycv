import { Injectable, NotFoundException } from '@nestjs/common';
import {Repository} from 'typeorm';
import {User} from './user.entity';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private repo: Repository<User>) {}

    create(email: string, password: string): Promise<User> {
        const user = this.repo.create({email, password});
        return this.repo.save(user);
    }

    async findOne(id: (number | null)): Promise<User | null> {
        if(!id) return null;
        const user:(User | null) = await this.repo.findOne({where: {id}});
        if(!user) throw new NotFoundException('User not found');
        return user;
    }

    find(email: string): Promise<User[]> {
        return this.repo.find({where: {email}});
    }

    async update(id: number, attrs: Partial<User>): Promise<User | null> {
        const user:(User | null) = await this.findOne(id);
        if(!user) throw new NotFoundException('User not found');
        Object.assign(user, attrs);

        return await this.repo.save(user);
    }

    async remove(id: number):Promise<void> {
        const user:(User | null) = await this.findOne(id);

        if(!user) throw new Error('User not found');

        await this.repo.remove(user);
    }

}
