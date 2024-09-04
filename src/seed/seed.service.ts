import { Injectable } from '@nestjs/common';
import { seedData } from 'db/seeds/seed.data';
import { DataSource } from 'typeorm';

@Injectable()
export class SeedService {
    constructor(private readonly connectin: DataSource){}

    async seed(): Promise<void>{
        const queryRunner = this.connectin.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const manager = queryRunner.manager;
            await seedData(manager);

            await queryRunner.commitTransaction();
        } catch (err) {
            console.log('Error during db seeding', err);
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }
}
