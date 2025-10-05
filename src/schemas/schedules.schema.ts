import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn, 
  ManyToOne, 
  OneToMany, 
  JoinColumn, 
  Index 
} from 'typeorm';
import { Course } from './courses.schema';
import { Lecturer } from './lecturers.schema';
import { Room } from './rooms.schema';
import { Enrollment } from './enrollments.schema';

@Entity('schedules')
@Index(['academic_year', 'semester'])
@Index(['day', 'start_time', 'end_time'])
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Course, (course) => course.schedules, { eager: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @ManyToOne(() => Lecturer, (lecturer) => lecturer.schedules, { eager: false, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'lecturer_id' })
  lecturer: Lecturer;

  @ManyToOne(() => Room, (room) => room.schedules, { eager: false, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'room_id' })
  room: Room;

  @Column()
  @Index()
  day: string;

  @Column({ type: 'time' })
  start_time: string;

  @Column({ type: 'time' })
  end_time: string;

  @Column('int')
  quota: number;

  @Column({ length: 30 })
  class_name: string;

  @Column({ length: 10 })
  @Index()
  academic_year: string;

  @Column({ length: 10 })
  @Index()
  semester: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.schedule, {
    eager: false,
    cascade: false,
  })
  enrollments: Enrollment[];
}
