import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Schedule } from './schedules.schema';

@Entity('lecturers')
export class Lecturer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nip: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  faculty: string;

  @Column()
  specialist: string;

  @Column()
  phone_number: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @OneToMany(() => Schedule, (schedule) => schedule.lecturer)
  schedules: Schedule[];
}
