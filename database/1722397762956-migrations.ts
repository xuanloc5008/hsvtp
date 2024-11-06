import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1722397762956 implements MigrationInterface {
    name = 'Migrations1722397762956'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "university" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "shortName" character varying NOT NULL, "description" character varying NOT NULL, "avatar" character varying, CONSTRAINT "PK_d14e5687dbd51fd7a915c22ac13" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "university_id" uuid NOT NULL, "title" text NOT NULL, "content" text NOT NULL, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post_request" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "post_id" uuid NOT NULL, "university_receiver_id" uuid NOT NULL, "status" integer NOT NULL, "feedback" text NOT NULL, "linkPost" character varying NOT NULL, CONSTRAINT "REL_34e555d4a4c08838278cef4286" UNIQUE ("post_id"), CONSTRAINT "PK_03f1831b6359959197284ea9337" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying NOT NULL, "password" character varying NOT NULL, "salt" character varying NOT NULL, "email" character varying NOT NULL, "familyName" character varying NOT NULL, "givenName" character varying NOT NULL, "role" character varying(50) array NOT NULL DEFAULT '{User}', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_d7dfe8758b65aa60f89e1218166" FOREIGN KEY ("university_id") REFERENCES "university"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_request" ADD CONSTRAINT "FK_34e555d4a4c08838278cef42868" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_request" ADD CONSTRAINT "FK_e7215e34dbf4692107715199081" FOREIGN KEY ("university_receiver_id") REFERENCES "university"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_request" DROP CONSTRAINT "FK_e7215e34dbf4692107715199081"`);
        await queryRunner.query(`ALTER TABLE "post_request" DROP CONSTRAINT "FK_34e555d4a4c08838278cef42868"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_d7dfe8758b65aa60f89e1218166"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "post_request"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "university"`);
    }

}
