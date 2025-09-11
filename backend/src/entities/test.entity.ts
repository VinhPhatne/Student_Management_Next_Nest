import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Student } from './student.entity';

@Entity('tests')
export class Test {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  student_id: number;

  @Column({ type: 'decimal', precision: 4, scale: 2 })
  score: number;

  @Column({ type: 'boolean', generatedType: 'STORED', asExpression: 'score >= 5' })
  is_passed: boolean;

  @Column({ type: 'varchar', length: 100 })
  test_name: string;

  @Column({ type: 'date' })
  test_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Student, student => student.tests)
  @JoinColumn({ name: 'student_id' })
  student: Student;
}


