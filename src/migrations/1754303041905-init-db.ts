import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDb1754303041905 implements MigrationInterface {
    name = 'InitDb1754303041905'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "classes" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "subject" character varying NOT NULL, "day_of_week" character varying NOT NULL, "time_slot" character varying NOT NULL, "teacher_name" character varying NOT NULL, "max_students" integer NOT NULL, CONSTRAINT "PK_e207aa15404e9b2ce35910f9f7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "class_registrations" ("id" SERIAL NOT NULL, "class_id" integer NOT NULL, "student_id" integer NOT NULL, CONSTRAINT "PK_4de4990d6c8a968fa129c33f0ec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subscriptions" ("id" SERIAL NOT NULL, "student_id" integer NOT NULL, "package_name" character varying NOT NULL, "start_date" date NOT NULL, "end_date" date NOT NULL, "total_sessions" integer NOT NULL, "used_sessions" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_a87248d73155605cf782be9ee5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "students" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "dob" date NOT NULL, "gender" character varying NOT NULL, "current_grade" character varying NOT NULL, "parent_id" integer NOT NULL, CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "parents" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_9a4dc67c7b8e6a9cb918938d353" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "class_registrations" ADD CONSTRAINT "FK_cd8ae82d50bd0c70302c73ac24a" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "class_registrations" ADD CONSTRAINT "FK_bdc678a309f861bcfd50916209f" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscriptions" ADD CONSTRAINT "FK_dee89f47ca621f441b655c282b4" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "FK_209313beb8d3f51f7ad69214d90" FOREIGN KEY ("parent_id") REFERENCES "parents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "FK_209313beb8d3f51f7ad69214d90"`);
        await queryRunner.query(`ALTER TABLE "subscriptions" DROP CONSTRAINT "FK_dee89f47ca621f441b655c282b4"`);
        await queryRunner.query(`ALTER TABLE "class_registrations" DROP CONSTRAINT "FK_bdc678a309f861bcfd50916209f"`);
        await queryRunner.query(`ALTER TABLE "class_registrations" DROP CONSTRAINT "FK_cd8ae82d50bd0c70302c73ac24a"`);
        await queryRunner.query(`DROP TABLE "parents"`);
        await queryRunner.query(`DROP TABLE "students"`);
        await queryRunner.query(`DROP TABLE "subscriptions"`);
        await queryRunner.query(`DROP TABLE "class_registrations"`);
        await queryRunner.query(`DROP TABLE "classes"`);
    }

}
