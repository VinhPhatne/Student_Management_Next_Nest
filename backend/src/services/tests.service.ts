import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test } from '../entities/test.entity';
import { CreateTestDto } from '../dto/create-test.dto';

@Injectable()
export class TestsService {
  constructor(
    @InjectRepository(Test)
    private testsRepository: Repository<Test>,
  ) {}

  async create(createTestDto: CreateTestDto): Promise<Test> {
    const test = this.testsRepository.create({
      ...createTestDto,
      test_date: new Date(createTestDto.test_date),
    });
    return await this.testsRepository.save(test);
  }

  async findAll(): Promise<Test[]> {
    return await this.testsRepository.find({
      relations: ['student', 'student.class'],
    });
  }

  async findByStudent(studentId: number): Promise<Test[]> {
    return await this.testsRepository.find({
      where: { student_id: studentId },
      relations: ['student', 'student.class'],
    });
  }

  async findOne(id: number): Promise<Test> {
    const test = await this.testsRepository.findOne({
      where: { id },
      relations: ['student', 'student.class'],
    });
    
    if (!test) {
      throw new NotFoundException(`Test with ID ${id} not found`);
    }
    
    return test;
  }

  async update(id: number, updateTestDto: Partial<CreateTestDto>): Promise<Test> {
    const test = await this.findOne(id);
    Object.assign(test, {
      ...updateTestDto,
      test_date: updateTestDto.test_date ? new Date(updateTestDto.test_date) : test.test_date,
    });
    return await this.testsRepository.save(test);
  }

  async remove(id: number): Promise<void> {
    const test = await this.findOne(id);
    await this.testsRepository.remove(test);
  }

  // Logic đếm số học sinh pass môn (>=5 điểm)
  async getPassedStudentsCount(): Promise<number> {
    return await this.testsRepository
      .createQueryBuilder('test')
      .where('test.score >= :passScore', { passScore: 5 })
      .getCount();
  }

  // Logic đếm số học sinh đạt loại giỏi (>=8 điểm)
  async getExcellentStudentsCount(): Promise<number> {
    return await this.testsRepository
      .createQueryBuilder('test')
      .where('test.score >= :excellentScore', { excellentScore: 8 })
      .getCount();
  }

  // Thống kê chi tiết
  async getStatistics() {
    const totalTests = await this.testsRepository.count();
    const passedCount = await this.getPassedStudentsCount();
    const excellentCount = await this.getExcellentStudentsCount();
    const failedCount = totalTests - passedCount;

    return {
      totalTests,
      passedCount,
      excellentCount,
      failedCount,
      passRate: totalTests > 0 ? (passedCount / totalTests * 100).toFixed(2) : 0,
      excellentRate: totalTests > 0 ? (excellentCount / totalTests * 100).toFixed(2) : 0,
    };
  }
}


