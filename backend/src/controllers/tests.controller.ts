import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { TestsService } from '../services/tests.service';
import { CreateTestDto } from '../dto/create-test.dto';

@Controller('tests')
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @Post()
  create(@Body() createTestDto: CreateTestDto) {
    return this.testsService.create(createTestDto);
  }

  @Get()
  findAll(@Query('studentId') studentId?: string) {
    if (studentId) {
      return this.testsService.findByStudent(parseInt(studentId));
    }
    return this.testsService.findAll();
  }

  @Get('statistics')
  getStatistics() {
    return this.testsService.getStatistics();
  }

  @Get('passed-count')
  getPassedStudentsCount() {
    return this.testsService.getPassedStudentsCount();
  }

  @Get('excellent-count')
  getExcellentStudentsCount() {
    return this.testsService.getExcellentStudentsCount();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.testsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTestDto: Partial<CreateTestDto>) {
    return this.testsService.update(id, updateTestDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.testsService.remove(id);
  }
}


