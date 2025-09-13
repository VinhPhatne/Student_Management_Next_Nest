"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Users, BookOpen, BarChart3, Home } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: "Trang chủ", href: "/", icon: Home },
  {
    name: "Lớp học",
    href: "/classes",
    icon: GraduationCap,
  },
  {
    name: "Học sinh",
    href: "/students",
    icon: Users,
  },
  {
    name: "Bài test",
    href: "/tests",
    icon: BookOpen,
  },
  {
    name: "Thống kê",
    href: "/statistics",
    icon: BarChart3,
  },
];

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
        <div className="flex h-16 items-center justify-center border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Quản lý điểm số</h1>
        </div>
        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="pl-64">
        <main className="py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
