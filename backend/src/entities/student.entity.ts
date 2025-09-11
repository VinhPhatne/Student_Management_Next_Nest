import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Class } from './class.entity';
import { Test } from './test.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, unique: true })
  student_code: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column()
  class_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Class, classEntity => classEntity.students)
  @JoinColumn({ name: 'class_id' })
  class: Class;

  @OneToMany(() => Test, test => test.student)
  tests: Test[];
}


