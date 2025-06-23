import {Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterRemove, AfterUpdate, BeforeRemove, OneToMany} from 'typeorm';
import {Report} from "../reports/reports.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Report, (report) => report.user)
    reports: Report[];

    @Column({default: true})
    admin: boolean;




    @AfterInsert()
    logInsert() {
        console.log('inserted user with id', this.id);
    }

    @AfterUpdate()
    logUpdate() {
        console.log('updated user with id', this.id);
    }

    @BeforeRemove()
    logBeforeRemove() {
        console.log('will remove user with id', this.id);
    }

    @AfterRemove()
    logRemove() {
        console.log('removed user');
    }
}