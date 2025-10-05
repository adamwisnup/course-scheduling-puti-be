import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
  Unique,
  JoinColumn,
} from 'typeorm';
import { Student } from './students.schema';
import { Schedule } from './schedules.schema';

@Entity('enrollments')
@Unique(['student', 'schedule'])
@Index(['status'])
export class Enrollment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Student, (student) => student.enrollments, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @ManyToOne(() => Schedule, (schedule) => schedule.enrollments, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'schedule_id' })
  schedule: Schedule;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  registered_at: Date;

  @Column({ type: 'varchar', length: 20, nullable: true })
  status: string;

  @Column({ type: 'float', nullable: true })
  grade: number;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
