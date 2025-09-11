"use client";

import { useState, useEffect } from "react";
import { CreateStudentDto, Class } from "@/types";
import { X } from "lucide-react";

interface StudentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateStudentDto) => void;
  initialData?: CreateStudentDto;
  title: string;
  classes: Class[];
}

export default function StudentForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title,
  classes,
}: StudentFormProps) {
  const [formData, setFormData] = useState<CreateStudentDto>(
    initialData || { student_code: "", name: "", class_id: 0 }
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ student_code: "", name: "", class_id: 0 });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.student_code.trim() ||
      !formData.name.trim() ||
      !formData.class_id
    )
      return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      setFormData({ student_code: "", name: "", class_id: 0 });
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
                htmlFor="student_code"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Mã số học sinh
              </label>
              <input
                type="text"
                id="student_code"
                value={formData.student_code}
                onChange={(e) =>
                  setFormData({ ...formData, student_code: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập mã số học sinh"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Tên học sinh
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập tên học sinh"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="class_id"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Lớp học
              </label>
              <select
                id="class_id"
                value={formData.class_id}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    class_id: parseInt(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value={0}>Chọn lớp học</option>
                {classes.map((classItem) => (
                  <option key={classItem.id} value={classItem.id}>
                    {classItem.name}
                  </option>
                ))}
              </select>
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
                  !formData.student_code.trim() ||
                  !formData.name.trim() ||
                  !formData.class_id
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


