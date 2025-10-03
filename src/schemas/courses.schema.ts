import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Schedule } from './schedules.schema';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  course_code: string;

  @Column()
  course_name: string;

  @Column('int')
  sks: number;

  @Column({ nullable: true })
  description: string;

  @Column('int')
  semester: number;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @OneToMany(() => Schedule, (schedule) => schedule.course)
  schedules: Schedule[];
}
