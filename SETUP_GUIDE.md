# Hướng dẫn Setup và Chạy Ứng dụng

## ✅ Đã hoàn thành setup

### Backend (NestJS)

- ✅ Dependencies đã được cài đặt (`node_modules` có sẵn)
- ✅ File `.env` đã được tạo từ `env.example`
- ✅ Build thành công (thư mục `dist` đã có)

### Frontend (Next.js)

- ✅ Dependencies đã được cài đặt (`node_modules` có sẵn)
- ✅ File `.env.local` đã được tạo từ `env.local.example`
- ✅ Build thành công (thư mục `.next` đã có)

## 🚀 Cách chạy ứng dụng

### Bước 1: Setup Database MySQL

1. Tạo database MySQL:

```sql
CREATE DATABASE student_grade_management;
```

2. Cấu hình database trong file `backend/.env`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=student_grade_management
```

### Bước 2: Chạy Backend

Mở terminal thứ nhất:

```bash
cd backend
npm run start:dev
```

Backend sẽ chạy tại: http://localhost:3001

### Bước 3: Chạy Frontend

Mở terminal thứ hai:

```bash
cd frontend
npm run dev
```

Frontend sẽ chạy tại: http://localhost:3000

## 📋 Kiểm tra ứng dụng

1. Truy cập http://localhost:3000
2. Bạn sẽ thấy giao diện quản lý điểm số học sinh
3. Các tính năng có sẵn:
   - **Trang chủ**: Thống kê tổng quan
   - **Lớp học**: Quản lý lớp học
   - **Học sinh**: Quản lý học sinh
   - **Bài test**: Quản lý điểm số
   - **Thống kê**: Báo cáo chi tiết

## 🔧 Troubleshooting

### Nếu backend không kết nối được database:

1. Kiểm tra MySQL đang chạy
2. Kiểm tra thông tin trong file `backend/.env`
3. Đảm bảo database `student_grade_management` đã được tạo

### Nếu frontend không kết nối được backend:

1. Kiểm tra backend đang chạy tại port 3001
2. Kiểm tra file `frontend/.env.local` có đúng API URL không

### Nếu có lỗi TypeScript:

1. Chạy `npm run build` để kiểm tra lỗi
2. Sửa các lỗi TypeScript trước khi chạy

## 📁 Cấu trúc dự án

```
student-grade-management/
├── backend/                 # NestJS Backend
│   ├── src/                # Source code
│   ├── dist/               # Build output
│   ├── node_modules/       # Dependencies
│   └── .env               # Environment config
├── frontend/               # Next.js Frontend
│   ├── src/               # Source code
│   ├── .next/             # Build output
│   ├── node_modules/      # Dependencies
│   └── .env.local         # Environment config
└── README.md              # Documentation
```

## 🎯 Tính năng chính

- ✅ Quản lý lớp học (CRUD)
- ✅ Quản lý học sinh (CRUD)
- ✅ Quản lý bài test và điểm số (CRUD)
- ✅ Thống kê học sinh pass môn (≥5 điểm)
- ✅ Thống kê học sinh đạt loại giỏi (≥8 điểm)
- ✅ Giao diện responsive với Tailwind CSS
- ✅ API RESTful với validation
- ✅ Database MySQL với TypeORM

Ứng dụng đã sẵn sàng để sử dụng! 🎉


