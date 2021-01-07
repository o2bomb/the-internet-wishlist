import {MigrationInterface, QueryRunner} from "typeorm";

export class MockUsers1610010970358 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            insert into "user" ("displayName", username, email, password, "isAdmin") values ('admin', 'admin', 'admin@admin.com', 'admin', true);
            insert into "user" ("displayName", username, email, password) values ('sally', 'sally', 'sally@sally.com', 'sally');
            insert into "user" ("displayName", username, email, password) values ('bobby', 'bobby', 'bobby@bobby.com', 'bobby');
            insert into "user" ("displayName", username, email, password) values ('chester', 'chester', 'chester@chester.com', 'chester');
            insert into "user" ("displayName", username, email, password) values ('jenkins', 'jenkins', 'jenkins@jenkins.com', 'jenkins');
        `);
    }

    public async down(_: QueryRunner): Promise<void> {
    }

}
