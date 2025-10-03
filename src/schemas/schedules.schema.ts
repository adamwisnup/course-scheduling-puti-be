import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Course } from './courses.schema';
import { Lecturer } from './lecturers.schema';
import { Room } from './rooms.schema';
import { Enrollment } from './enrollments.schema';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Course, (course) => course.schedules, { eager: true })
  course: Course;

  @ManyToOne(() => Lecturer, (lecturer) => lecturer.schedules, { eager: true })
  lecturer: Lecturer;

  @ManyToOne(() => Room, (room) => room.schedules, { eager: true })
  room: Room;

  @Column()
  day: string;

  @Column({ type: 'time' })
  start_time: string;

  @Column({ type: 'time' })
  end_time: string;

  @Column('int')
  quota: number;

  @Column()
  class_name: string;

  @Column()
  academic_year: string;

  @Column()
  semester: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.schedule)
  enrollments: Enrollment[];
}
