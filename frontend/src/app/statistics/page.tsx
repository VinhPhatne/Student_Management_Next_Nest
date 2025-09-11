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
  BarChart3,
} from "lucide-react";

export default function StatisticsPage() {
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatistics();
  }, []);

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
      description: "Tổng số bài test đã được thực hiện",
    },
    {
      name: "Học sinh pass môn (≥5)",
      value: statistics?.passedCount || 0,
      icon: CheckCircle,
      color: "bg-green-500",
      description: "Số học sinh đạt điểm từ 5 trở lên",
    },
    {
      name: "Học sinh đạt loại giỏi (≥8)",
      value: statistics?.excellentCount || 0,
      icon: Star,
      color: "bg-yellow-500",
      description: "Số học sinh đạt điểm từ 8 trở lên",
    },
    {
      name: "Học sinh không pass",
      value: statistics?.failedCount || 0,
      icon: XCircle,
      color: "bg-red-500",
      description: "Số học sinh dưới 5 điểm",
    },
  ];

  const rateStats = [
    {
      name: "Tỷ lệ pass môn",
      value: statistics?.passRate || "0",
      icon: TrendingUp,
      color: "bg-green-500",
      description: "Phần trăm học sinh pass môn",
    },
    {
      name: "Tỷ lệ đạt loại giỏi",
      value: statistics?.excellentRate || "0",
      icon: BarChart3,
      color: "bg-yellow-500",
      description: "Phần trăm học sinh đạt loại giỏi",
    },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Thống kê</h1>
          <p className="mt-2 text-gray-600">
            Báo cáo tổng quan về điểm số học sinh
          </p>
        </div>

        {/* Main Statistics */}
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
                <div className="mt-2">
                  <p className="text-xs text-gray-500">{stat.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Rate Statistics */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {rateStats.map((stat) => (
            <div
              key={stat.name}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-6">
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
                      <dd className="text-2xl font-bold text-gray-900">
                        {stat.value}%
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{stat.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Analysis */}
        {statistics && statistics.totalTests > 0 && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Phân tích chi tiết
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {statistics.passedCount}
                  </div>
                  <div className="text-sm text-gray-500">Học sinh pass</div>
                  <div className="text-xs text-gray-400">
                    {statistics.passRate}% tổng số
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600">
                    {statistics.excellentCount}
                  </div>
                  <div className="text-sm text-gray-500">Học sinh giỏi</div>
                  <div className="text-xs text-gray-400">
                    {statistics.excellentRate}% tổng số
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">
                    {statistics.failedCount}
                  </div>
                  <div className="text-sm text-gray-500">
                    Học sinh không pass
                  </div>
                  <div className="text-xs text-gray-400">
                    {(
                      (statistics.failedCount / statistics.totalTests) *
                      100
                    ).toFixed(2)}
                    % tổng số
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {statistics && statistics.totalTests === 0 && (
          <div className="text-center py-12">
            <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Chưa có dữ liệu thống kê
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Thêm bài test để xem thống kê chi tiết.
            </p>
            <div className="mt-6">
              <a
                href="/tests"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Thêm bài test
              </a>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}


