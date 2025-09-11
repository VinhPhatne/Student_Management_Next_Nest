"use client";

import { useState, useEffect } from "react";
import { CreateTestDto, Student } from "@/types";
import { X } from "lucide-react";

interface TestFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateTestDto) => void;
  initialData?: CreateTestDto;
  title: string;
  students: Student[];
}

export default function TestForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title,
  students,
}: TestFormProps) {
  const [formData, setFormData] = useState<CreateTestDto>(
    initialData || { student_id: 0, score: 0, test_name: "", test_date: "" }
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ student_id: 0, score: 0, test_name: "", test_date: "" });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.student_id ||
      !formData.test_name.trim() ||
      !formData.test_date
    )
      return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      setFormData({ student_id: 0, score: 0, test_name: "", test_date: "" });
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-black bg-opacity-25"
          onClick={onClose}
        />

        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md">
          <div className="flex items-center justify-between p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="mb-4">
              <label
                htmlFor="student_id"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Học sinh
              </label>
              <select
                id="student_id"
                value={formData.student_id}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    student_id: parseInt(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value={0}>Chọn học sinh</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name} ({student.student_code}) -{" "}
                    {student.class?.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="test_name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Tên bài test
              </label>
              <input
                type="text"
                id="test_name"
                value={formData.test_name}
                onChange={(e) =>
                  setFormData({ ...formData, test_name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập tên bài test"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="score"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Điểm số (0-10)
              </label>
              <input
                type="number"
                id="score"
                min="0"
                max="10"
                step="0.1"
                value={formData.score}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    score: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập điểm số"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="test_date"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Ngày thi
              </label>
              <input
                type="date"
                id="test_date"
                value={formData.test_date}
                onChange={(e) =>
                  setFormData({ ...formData, test_date: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={
                  isSubmitting ||
                  !formData.student_id ||
                  !formData.test_name.trim() ||
                  !formData.test_date
                }
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Đang lưu..." : "Lưu"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


