import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from '../entities/class.entity';
import { CreateClassDto } from '../dto/create-class.dto';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Class)
    private classesRepository: Repository<Class>,
  ) {}

  async create(createClassDto: CreateClassDto): Promise<Class> {
    const classEntity = this.classesRepository.create(createClassDto);
    return await this.classesRepository.save(classEntity);
  }

  async findAll(): Promise<Class[]> {
    return await this.classesRepository.find({
      relations: ['students'],
    });
  }

  async findOne(id: number): Promise<Class> {
    const classEntity = await this.classesRepository.findOne({
      where: { id },
      relations: ['students'],
    });
    
    if (!classEntity) {
      throw new NotFoundException(`Class with ID ${id} not found`);
    }
    
    return classEntity;
  }

  async update(id: number, updateClassDto: Partial<CreateClassDto>): Promise<Class> {
    const classEntity = await this.findOne(id);
    Object.assign(classEntity, updateClassDto);
    return await this.classesRepository.save(classEntity);
  }

  async remove(id: number): Promise<void> {
    const classEntity = await this.findOne(id);
    await this.classesRepository.remove(classEntity);
  }
}


