"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import ClassForm from "@/components/ClassForm";
import { Class, CreateClassDto } from "@/types";
import { classesApi } from "@/lib/api";
import { Plus, Edit, Trash2, Users } from "lucide-react";

export default function ClassesPage() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await classesApi.getAll();
      setClasses(response.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: CreateClassDto) => {
    try {
      await classesApi.create(data);
      await fetchClasses();
    } catch (error) {
      console.error("Error creating class:", error);
      throw error;
    }
  };

  const handleUpdate = async (data: CreateClassDto) => {
    if (!editingClass) return;

    try {
      await classesApi.update(editingClass.id, data);
      await fetchClasses();
      setEditingClass(null);
    } catch (error) {
      console.error("Error updating class:", error);
      throw error;
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Bạn có chắc chắn muốn xóa lớp học này?")) return;

    try {
      await classesApi.delete(id);
      await fetchClasses();
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

  const openEditForm = (classItem: Class) => {
    setEditingClass(classItem);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingClass(null);
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
              Quản lý lớp học
            </h1>
            <p className="mt-2 text-gray-600">
              Thêm, sửa, xóa thông tin lớp học
            </p>
          </div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Thêm lớp học
          </button>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {classes.map((classItem) => (
            <div
              key={classItem.id}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="p-3 rounded-md bg-blue-500">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Tên lớp
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {classItem.name}
                      </dd>
                    </dl>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-sm text-gray-500">
                    Số học sinh: {classItem.students?.length || 0}
                  </div>
                </div>

                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => openEditForm(classItem)}
                    className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(classItem.id)}
                    className="inline-flex items-center px-3 py-1 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {classes.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Chưa có lớp học nào
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Bắt đầu bằng cách tạo lớp học đầu tiên.
            </p>
            <div className="mt-6">
              <button
                onClick={() => setIsFormOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Thêm lớp học
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Form Modal */}
      <ClassForm
        isOpen={isFormOpen}
        onClose={closeForm}
        onSubmit={editingClass ? handleUpdate : handleCreate}
        initialData={editingClass || undefined}
        title={editingClass ? "Sửa lớp học" : "Thêm lớp học mới"}
      />
    </Layout>
  );
}
