import {MigrationInterface, QueryRunner} from "typeorm";

export class MockTags1606383912608 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            insert into tag ("displayName", name) values ('Operating system', 'operating system');
            insert into tag ("displayName", name) values ('Program', 'program');
            insert into tag ("displayName", name) values ('Spreadsheet', 'spreadsheet');
            insert into tag ("displayName", name) values ('Freeware', 'freeware');
            insert into tag ("displayName", name) values ('Groupware', 'groupware');
            insert into tag ("displayName", name) values ('Shareware', 'shareware');
            insert into tag ("displayName", name) values ('Game', 'game');
        `)
    }

    public async down(_: QueryRunner): Promise<void> {
    }

}
