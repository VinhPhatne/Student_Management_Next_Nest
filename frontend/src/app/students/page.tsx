"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import StudentForm from "@/components/StudentForm";
import { Class, Student, CreateStudentDto } from "@/types";
import { classesApi, studentsApi } from "@/lib/api";
import { Plus, Edit, Trash2, User, Filter } from "lucide-react";

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [classesResponse, studentsResponse] = await Promise.all([
        classesApi.getAll(),
        studentsApi.getAll(),
      ]);
      setClasses(classesResponse.data);
      setStudents(studentsResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: CreateStudentDto) => {
    try {
      await studentsApi.create(data);
      await fetchData();
    } catch (error) {
      console.error("Error creating student:", error);
      throw error;
    }
  };

  const handleUpdate = async (data: CreateStudentDto) => {
    if (!editingStudent) return;

    try {
      await studentsApi.update(editingStudent.id, data);
      await fetchData();
      setEditingStudent(null);
    } catch (error) {
      console.error("Error updating student:", error);
      throw error;
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Bạn có chắc chắn muốn xóa học sinh này?")) return;

    try {
      await studentsApi.delete(id);
      await fetchData();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const openEditForm = (student: Student) => {
    setEditingStudent(student);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingStudent(null);
  };

  const filteredStudents = selectedClassId
    ? students.filter((student) => student.class_id === selectedClassId)
    : students;

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Quản lý học sinh
            </h1>
            <p className="mt-2 text-gray-600">
              Thêm, sửa, xóa thông tin học sinh
            </p>
          </div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Thêm học sinh
          </button>
        </div>

        {/* Filter */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedClassId || ""}
              onChange={(e) =>
                setSelectedClassId(
                  e.target.value ? parseInt(e.target.value) : null
                )
              }
              className="block w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Tất cả lớp học</option>
              {classes.map((classItem) => (
                <option key={classItem.id} value={classItem.id}>
                  {classItem.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredStudents.map((student) => (
              <li key={student.id}>
                <div className="px-4 py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="p-2 rounded-md bg-blue-500">
                        <User className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {student.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        Mã số: {student.student_code} | Lớp:{" "}
                        {student.class?.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        Số bài test: {student.tests?.length || 0}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openEditForm(student)}
                      className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="inline-flex items-center px-3 py-1 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Xóa
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <User className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              {selectedClassId
                ? "Không có học sinh trong lớp này"
                : "Chưa có học sinh nào"}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {selectedClassId
                ? "Hãy thêm học sinh vào lớp học này."
                : "Bắt đầu bằng cách tạo học sinh đầu tiên."}
            </p>
            <div className="mt-6">
              <button
                onClick={() => setIsFormOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Thêm học sinh
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Form Modal */}
      <StudentForm
        isOpen={isFormOpen}
        onClose={closeForm}
        onSubmit={editingStudent ? handleUpdate : handleCreate}
        initialData={editingStudent || undefined}
        title={editingStudent ? "Sửa thông tin học sinh" : "Thêm học sinh mới"}
        classes={classes}
      />
    </Layout>
  );
}
