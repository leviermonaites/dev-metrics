import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEventsTables1725490029794 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE events (
                stream_id TEXT NOT NULL, 
                event_id TEXT NOT NULL PRIMARY KEY, 
                event_type TEXT NOT NULL, 
                stream_version INTEGER NOT NULL, 
                schema_version INTEGER NOT NULL,
                payload JSONB NOT NULL,
                timestamp TIMESTAMP NOT NULL,
                resource_type TEXT,

                UNIQUE (stream_id,stream_version)
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE pipeline_events;
            DROP TABLE job_events;
        `);
    }

}
