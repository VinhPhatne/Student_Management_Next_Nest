import axios from "axios";
import {
  Class,
  Student,
  Test,
  Statistics,
  CreateClassDto,
  CreateStudentDto,
  CreateTestDto,
} from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Classes API
export const classesApi = {
  getAll: () => api.get<Class[]>("/classes"),
  getById: (id: number) => api.get<Class>(`/classes/${id}`),
  create: (data: CreateClassDto) => api.post<Class>("/classes", data),
  update: (id: number, data: Partial<CreateClassDto>) =>
    api.patch<Class>(`/classes/${id}`, data),
  delete: (id: number) => api.delete(`/classes/${id}`),
};

// Students API
export const studentsApi = {
  getAll: (classId?: number) =>
    api.get<Student[]>(`/students${classId ? `?classId=${classId}` : ""}`),
  getById: (id: number) => api.get<Student>(`/students/${id}`),
  create: (data: CreateStudentDto) => api.post<Student>("/students", data),
  update: (id: number, data: Partial<CreateStudentDto>) =>
    api.patch<Student>(`/students/${id}`, data),
  delete: (id: number) => api.delete(`/students/${id}`),
};

// Tests API
export const testsApi = {
  getAll: (studentId?: number) =>
    api.get<Test[]>(`/tests${studentId ? `?studentId=${studentId}` : ""}`),
  getById: (id: number) => api.get<Test>(`/tests/${id}`),
  create: (data: CreateTestDto) => api.post<Test>("/tests", data),
  update: (id: number, data: Partial<CreateTestDto>) =>
    api.patch<Test>(`/tests/${id}`, data),
  delete: (id: number) => api.delete(`/tests/${id}`),
  getStatistics: () => api.get<Statistics>("/tests/statistics"),
  getPassedCount: () => api.get<number>("/tests/passed-count"),
  getExcellentCount: () => api.get<number>("/tests/excellent-count"),
};

export default api;


