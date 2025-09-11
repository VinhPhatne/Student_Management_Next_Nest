"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import TestForm from "@/components/TestForm";
import { Test, Student, CreateTestDto } from "@/types";
import { testsApi, studentsApi } from "@/lib/api";
import {
  Plus,
  Edit,
  Trash2,
  BookOpen,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function TestsPage() {
  const [tests, setTests] = useState<Test[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTest, setEditingTest] = useState<Test | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [testsResponse, studentsResponse] = await Promise.all([
        testsApi.getAll(),
        studentsApi.getAll(),
      ]);
      setTests(testsResponse.data);
      setStudents(studentsResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: CreateTestDto) => {
    try {
      await testsApi.create(data);
      await fetchData();
    } catch (error) {
      console.error("Error creating test:", error);
      throw error;
    }
  };

  const handleUpdate = async (data: CreateTestDto) => {
    if (!editingTest) return;

    try {
      await testsApi.update(editingTest.id, data);
      await fetchData();
      setEditingTest(null);
    } catch (error) {
      console.error("Error updating test:", error);
      throw error;
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Bạn có chắc chắn muốn xóa bài test này?")) return;

    try {
      await testsApi.delete(id);
      await fetchData();
    } catch (error) {
      console.error("Error deleting test:", error);
    }
  };

  const openEditForm = (test: Test) => {
    setEditingTest(test);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingTest(null);
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600 bg-green-100";
    if (score >= 5) return "text-blue-600 bg-blue-100";
    return "text-red-600 bg-red-100";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 8) return <CheckCircle className="h-4 w-4" />;
    if (score >= 5) return <CheckCircle className="h-4 w-4" />;
    return <XCircle className="h-4 w-4" />;
  };

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
              Quản lý bài test
            </h1>
            <p className="mt-2 text-gray-600">
              Thêm, sửa, xóa điểm số bài test
            </p>
          </div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Thêm bài test
          </button>
        </div>

        {/* Tests Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {tests.map((test) => (
              <li key={test.id}>
                <div className="px-4 py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="p-2 rounded-md bg-blue-500">
                        <BookOpen className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {test.test_name}
                          </div>
                          <div className="text-sm text-gray-500">
                            Học sinh: {test.student?.name} (
                            {test.student?.student_code})
                          </div>
                          <div className="text-sm text-gray-500">
                            Lớp: {test.student?.class?.name} | Ngày:{" "}
                            {new Date(test.test_date).toLocaleDateString(
                              "vi-VN"
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getScoreColor(
                              test.score
                            )}`}
                          >
                            {getScoreIcon(test.score)}
                            <span className="ml-1">{test.score}/10</span>
                          </div>
                          <div
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              test.is_passed
                                ? "text-green-800 bg-green-100"
                                : "text-red-800 bg-red-100"
                            }`}
                          >
                            {test.is_passed ? "PASS" : "FAIL"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openEditForm(test)}
                      className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(test.id)}
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

        {tests.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Chưa có bài test nào
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Bắt đầu bằng cách tạo bài test đầu tiên.
            </p>
            <div className="mt-6">
              <button
                onClick={() => setIsFormOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Thêm bài test
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Form Modal */}
      <TestForm
        isOpen={isFormOpen}
        onClose={closeForm}
        onSubmit={editingTest ? handleUpdate : handleCreate}
        initialData={editingTest || undefined}
        title={editingTest ? "Sửa bài test" : "Thêm bài test mới"}
        students={students}
      />
    </Layout>
  );
}
