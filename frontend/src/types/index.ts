export interface Class {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  students?: Student[];
}

export interface Student {
  id: number;
  student_code: string;
  name: string;
  class_id: number;
  created_at: string;
  updated_at: string;
  class?: Class;
  tests?: Test[];
}

export interface Test {
  id: number;
  student_id: number;
  score: number;
  is_passed: boolean;
  test_name: string;
  test_date: string;
  created_at: string;
  updated_at: string;
  student?: Student;
}

export interface Statistics {
  totalTests: number;
  passedCount: number;
  excellentCount: number;
  failedCount: number;
  passRate: string;
  excellentRate: string;
}

export interface CreateClassDto {
  name: string;
}

export interface CreateStudentDto {
  student_code: string;
  name: string;
  class_id: number;
}

export interface CreateTestDto {
  student_id: number;
  score: number;
  test_name: string;
  test_date: string;
}


