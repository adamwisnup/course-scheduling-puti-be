import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Schedule } from './schedules.schema';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  room_code: string;

  @Column()
  room_name: string;

  @Column('int')
  capacity: number;

  @Column()
  building: string;

  @Column({ nullable: true })
  facility: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @OneToMany(() => Schedule, (schedule) => schedule.room)
  schedules: Schedule[];
}
