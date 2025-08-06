import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedInitialData1754303041906 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Parents
    await queryRunner.query(`
            INSERT INTO parents (name, phone, email) VALUES
                ('Nguyen Van A', '0901234567', 'a.parent@gmail.com'),
                ('Tran Thi B', '0987654321', 'b.parent@gmail.com');
        `)

    // Students
    await queryRunner.query(`
            INSERT INTO students (name, dob, gender, current_grade, parent_id) VALUES
                ('Nguyen Thi Mai', '2011-05-20', 'female', '6', 1),
                ('Nguyen Van Nam', '2012-08-15', 'male', '5', 1),
                ('Tran Van Minh', '2010-03-12', 'male', '7', 2);
        `)

    // Classes
    await queryRunner.query(`
            INSERT INTO classes (name, subject, day_of_week, time_slot, teacher_name, max_students) VALUES
                ('Toán nâng cao A', 'Toán', 'Monday', '18:00-19:30', 'Thầy Sơn', 15),
                ('Tiếng Anh giao tiếp B', 'Tiếng Anh', 'Wednesday', '17:00-18:30', 'Cô Trang', 12),
                ('Văn học sáng tạo', 'Văn', 'Friday', '18:00-19:30', 'Cô Lan', 10);
        `)

    // Class registrations
    await queryRunner.query(`
            INSERT INTO class_registrations (class_id, student_id) VALUES
                (1, 1),
                (2, 2),
                (3, 3);
        `)

    // Subscriptions
    await queryRunner.query(`
            INSERT INTO subscriptions (student_id, package_name, start_date, end_date, total_sessions, used_sessions) VALUES
                (1,'Toán cơ bản', '2024-06-01', '2024-09-01', 24, 3),
                (2,'Tiếng Anh giao tiếp', '2024-05-15', '2024-08-15', 20, 5),
                (3,'Văn nâng cao', '2024-06-10', '2024-09-10', 18, 2);
        `)

    await queryRunner.query(`SELECT setval(pg_get_serial_sequence('parents', 'id'), (SELECT MAX(id) FROM parents));`)
    await queryRunner.query(`SELECT setval(pg_get_serial_sequence('students', 'id'), (SELECT MAX(id) FROM students));`)
    await queryRunner.query(`SELECT setval(pg_get_serial_sequence('classes', 'id'), (SELECT MAX(id) FROM classes));`)
    await queryRunner.query(
      `SELECT setval(pg_get_serial_sequence('class_registrations', 'id'), (SELECT MAX(id) FROM class_registrations));`,
    )
    await queryRunner.query(
      `SELECT setval(pg_get_serial_sequence('subscriptions', 'id'), (SELECT MAX(id) FROM subscriptions));`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM class_registrations WHERE id IN (1,2,3)`)
    await queryRunner.query(`DELETE FROM subscriptions WHERE id IN (1,2,3)`)
    await queryRunner.query(`DELETE FROM students WHERE id IN (1,2,3)`)
    await queryRunner.query(`DELETE FROM classes WHERE id IN (1,2,3)`)
    await queryRunner.query(`DELETE FROM parents WHERE id IN (1,2)`)
  }
}
