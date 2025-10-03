import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, Unique } from 'typeorm';
import { Student } from './students.schema';
import { Schedule } from './schedules.schema';

@Entity('enrollments')
@Unique(['student', 'schedule'])
export class Enrollment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Student, (student) => student.enrollments, { eager: true })
  student: Student;

  @ManyToOne(() => Schedule, (schedule) => schedule.enrollments, { eager: true })
  schedule: Schedule;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  registered_at: Date;

  @Column({ nullable: true })
  status: string;

  @Column({ type: 'float', nullable: true })
  grade: number;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
