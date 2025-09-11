import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../entities/student.entity';
import { CreateStudentDto } from '../dto/create-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const student = this.studentsRepository.create(createStudentDto);
    return await this.studentsRepository.save(student);
  }

  async findAll(): Promise<Student[]> {
    return await this.studentsRepository.find({
      relations: ['class', 'tests'],
    });
  }

  async findByClass(classId: number): Promise<Student[]> {
    return await this.studentsRepository.find({
      where: { class_id: classId },
      relations: ['class', 'tests'],
    });
  }

  async findOne(id: number): Promise<Student> {
    const student = await this.studentsRepository.findOne({
      where: { id },
      relations: ['class', 'tests'],
    });
    
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    
    return student;
  }

  async update(id: number, updateStudentDto: Partial<CreateStudentDto>): Promise<Student> {
    const student = await this.findOne(id);
    Object.assign(student, updateStudentDto);
    return await this.studentsRepository.save(student);
  }

  async remove(id: number): Promise<void> {
    const student = await this.findOne(id);
    await this.studentsRepository.remove(student);
  }
}


