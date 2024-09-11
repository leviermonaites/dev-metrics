import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPipelineTable1725321939241 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "Pipeline" (
                id TEXT NOT NULL PRIMARY KEY,
                status TEXT NOT NULL,
                duration INTEGER,
                branch TEXT NOT NULL,
                source TEXT NOT NULL,
                commit_sha TEXT NOT NULL,
                external_created_at TIMESTAMP NOT NULL,
                finished_at TIMESTAMP,
                created_at TIMESTAMP DEFAULT NOW()
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE IF EXISTS "Pipeline" RENAME TO "Pipeline-${Math.round(Math.random() * 100000)}"
        `)
    }

}
