import {MigrationInterface, QueryRunner} from "typeorm";

export class FullTextSearch1606206228764 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            update entry set document_with_weights = setweight(to_tsvector(title), 'A') || 
            setweight(to_tsvector(coalesce(text, '')), 'B');

            create index document_weights_idx
            on entry
            using gin (document_with_weights);

            create function entry_tsvector_trigger()
            returns trigger as $$
            begin
                new.document_with_weights :=
                setweight(to_tsvector('english', coalesce(new.title, '')), 'A') ||
                setweight(to_tsvector('english', coalesce(new.text, '')), 'B');
                return new;
            end
            $$ LANGUAGE plpgsql;

            create trigger tsvectorupdate before insert or update
            on entry for each row execute procedure entry_tsvector_trigger();
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP FUNCTION IF EXISTS entry_tsvector_trigger() CASCADE;
        `);
    }

}
