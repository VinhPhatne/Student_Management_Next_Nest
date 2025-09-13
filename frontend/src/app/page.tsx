"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Statistics } from "@/types";
import { testsApi } from "@/lib/api";
import {
  BookOpen,
  CheckCircle,
  Star,
  XCircle,
  TrendingUp,
  Users,
} from "lucide-react";

export default function HomePage() {
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await testsApi.getStatistics();
        setStatistics(response.data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  const stats = [
    {
      name: "Tổng số bài test",
      value: statistics?.totalTests || 0,
      icon: BookOpen,
      color: "bg-blue-500",
    },
    {
      name: "Học sinh pass môn (≥5)",
      value: statistics?.passedCount || 0,
      icon: CheckCircle,
      color: "bg-green-500",
    },
    {
      name: "Học sinh đạt loại giỏi (≥8)",
      value: statistics?.excellentCount || 0,
      icon: Star,
      color: "bg-yellow-500",
    },
    {
      name: "Học sinh không pass",
      value: statistics?.failedCount || 0,
      icon: XCircle,
      color: "bg-red-500",
    },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Trang chủ</h1>
          <p className="mt-2 text-gray-600">
            Hệ thống quản lý điểm số học sinh
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`p-3 rounded-md ${stat.color}`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Rate Statistics */}
        {statistics && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="p-3 rounded-md bg-green-500">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Tỷ lệ pass môn
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {statistics.passRate}%
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="p-3 rounded-md bg-yellow-500">
                      <Star className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Tỷ lệ đạt loại giỏi
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {statistics.excellentRate}%
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Thao tác nhanh
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <a
                href="/Student_Management_Next_Nest/classes"
                className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg border border-gray-200 hover:border-gray-300"
              >
                <div>
                  <span className="rounded-lg inline-flex p-3 bg-blue-50 text-blue-700 ring-4 ring-white">
                    <Users className="h-6 w-6" />
                  </span>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-500">
                    <span className="absolute inset-0" aria-hidden="true" />
                    Quản lý lớp học
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Thêm, sửa, xóa thông tin lớp học
                  </p>
                </div>
              </a>

              <a
                href="/Student_Management_Next_Nest/students"
                className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg border border-gray-200 hover:border-gray-300"
              >
                <div>
                  <span className="rounded-lg inline-flex p-3 bg-green-50 text-green-700 ring-4 ring-white">
                    <Users className="h-6 w-6" />
                  </span>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-500">
                    <span className="absolute inset-0" aria-hidden="true" />
                    Quản lý học sinh
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Thêm, sửa, xóa thông tin học sinh
                  </p>
                </div>
              </a>

              <a
                href="/Student_Management_Next_Nest/tests"
                className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg border border-gray-200 hover:border-gray-300"
              >
                <div>
                  <span className="rounded-lg inline-flex p-3 bg-yellow-50 text-yellow-700 ring-4 ring-white">
                    <BookOpen className="h-6 w-6" />
                  </span>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-500">
                    <span className="absolute inset-0" aria-hidden="true" />
                    Quản lý bài test
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Thêm, sửa, xóa điểm số bài test
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
