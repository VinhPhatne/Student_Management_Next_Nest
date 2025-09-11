import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ClassesModule } from './modules/classes.module';
import { StudentsModule } from './modules/students.module';
import { TestsModule } from './modules/tests.module';
import { Class } from './entities/class.entity';
import { Student } from './entities/student.entity';
import { Test } from './entities/test.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'student_grade_management',
      entities: [Class, Student, Test],
      synchronize: process.env.NODE_ENV !== 'production', // Only for development
      logging: process.env.NODE_ENV === 'development',
    }),
    ClassesModule,
    StudentsModule,
    TestsModule,
  ],
})
export class AppModule {}


