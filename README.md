# Hệ thống Quản lý Điểm số Học sinh

Ứng dụng web quản lý điểm số học sinh với Next.js (TypeScript) frontend và NestJS backend, sử dụng MySQL database.

## 🏗️ Kiến trúc hệ thống

### Backend (NestJS)

- **Framework**: NestJS với TypeScript
- **Database**: MySQL với TypeORM
- **API**: RESTful API với validation
- **Port**: 3001

### Frontend (Next.js)

- **Framework**: Next.js 14 với App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Port**: 3000

### Database Schema

#### Bảng Classes (Lớp học)

```sql
- id: Primary Key
- name: Tên lớp học (unique)
- created_at, updated_at: Timestamps
```

#### Bảng Students (Học sinh)

```sql
- id: Primary Key
- student_code: Mã số học sinh (unique)
- name: Tên học sinh
- class_id: Foreign Key đến Classes
- created_at, updated_at: Timestamps
```

#### Bảng Tests (Bài test)

```sql
- id: Primary Key
- student_id: Foreign Key đến Students
- score: Điểm số (0-10)
- is_passed: Computed column (score >= 5)
- test_name: Tên bài test
- test_date: Ngày thi
- created_at, updated_at: Timestamps
```

## 🚀 Hướng dẫn cài đặt

### Yêu cầu hệ thống

- Node.js 18+
- MySQL 8.0+
- npm hoặc yarn

### Bước 1: Clone và setup dự án

```bash
git clone <repository-url>
cd student-grade-management
```

### Bước 2: Setup Database

1. Tạo database MySQL:

```sql
CREATE DATABASE student_grade_management;
```

2. Cấu hình database trong `backend/.env`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=student_grade_management
```

### Bước 3: Setup Backend

```bash
cd backend
npm install
cp env.example .env
# Cấu hình .env file
npm run start:dev
```

Backend sẽ chạy tại: http://localhost:3001

### Bước 4: Setup Frontend

```bash
cd frontend
npm install
cp env.local.example .env.local
# Cấu hình .env.local file
npm run dev
```

Frontend sẽ chạy tại: http://localhost:3000

## 📋 Tính năng chính

### 1. Quản lý Lớp học

- ✅ Thêm, sửa, xóa lớp học
- ✅ Hiển thị danh sách lớp học
- ✅ Xem số học sinh trong mỗi lớp

### 2. Quản lý Học sinh

- ✅ Thêm, sửa, xóa học sinh
- ✅ Gán học sinh vào lớp
- ✅ Lọc học sinh theo lớp
- ✅ Hiển thị thông tin chi tiết

### 3. Quản lý Bài test

- ✅ Thêm, sửa, xóa điểm số
- ✅ Tự động tính toán pass/fail (≥5 điểm)
- ✅ Hiển thị trạng thái điểm số
- ✅ Lọc theo học sinh

### 4. Thống kê và Báo cáo

- ✅ Đếm số học sinh pass môn (≥5 điểm)
- ✅ Đếm số học sinh đạt loại giỏi (≥8 điểm)
- ✅ Tỷ lệ pass môn và đạt loại giỏi
- ✅ Thống kê tổng quan

## 🔧 API Endpoints

### Classes

- `GET /classes` - Lấy danh sách lớp
- `POST /classes` - Tạo lớp mới
- `GET /classes/:id` - Lấy lớp theo ID
- `PATCH /classes/:id` - Cập nhật lớp
- `DELETE /classes/:id` - Xóa lớp

### Students

- `GET /students` - Lấy danh sách học sinh
- `GET /students?classId=1` - Lấy học sinh theo lớp
- `POST /students` - Tạo học sinh mới
- `GET /students/:id` - Lấy học sinh theo ID
- `PATCH /students/:id` - Cập nhật học sinh
- `DELETE /students/:id` - Xóa học sinh

### Tests

- `GET /tests` - Lấy danh sách bài test
- `GET /tests?studentId=1` - Lấy bài test theo học sinh
- `POST /tests` - Tạo bài test mới
- `GET /tests/:id` - Lấy bài test theo ID
- `PATCH /tests/:id` - Cập nhật bài test
- `DELETE /tests/:id` - Xóa bài test

### Statistics

- `GET /tests/statistics` - Thống kê tổng quan
- `GET /tests/passed-count` - Đếm học sinh pass
- `GET /tests/excellent-count` - Đếm học sinh giỏi

## 🎨 Giao diện

- **Responsive Design**: Tương thích mọi thiết bị
- **Modern UI**: Sử dụng Tailwind CSS
- **Intuitive Navigation**: Sidebar navigation dễ sử dụng
- **Real-time Updates**: Cập nhật dữ liệu real-time
- **Form Validation**: Validation phía client và server

## 🛠️ Công nghệ sử dụng

### Backend

- NestJS
- TypeORM
- MySQL
- Class Validator
- Class Transformer

### Frontend

- Next.js 14
- TypeScript
- Tailwind CSS
- Axios
- Lucide React
- Headless UI

## 📝 Lý do thiết kế

### Database Design

1. **MySQL**: Chọn MySQL vì:

   - ACID compliance đảm bảo tính toàn vẹn dữ liệu
   - Foreign Key constraints ràng buộc dữ liệu
   - JOIN operations hiệu quả
   - Hỗ trợ tốt với TypeORM

2. **Relational Design**:

   - Classes → Students (1:N)
   - Students → Tests (1:N)
   - Computed column `is_passed` tự động tính toán

3. **Indexes**: Tối ưu performance cho các query thường dùng

### API Design

1. **RESTful**: Tuân thủ chuẩn REST
2. **Validation**: Validation đầy đủ với class-validator
3. **Error Handling**: Xử lý lỗi nhất quán
4. **CORS**: Cấu hình CORS cho frontend

### Frontend Design

1. **Component-based**: Tái sử dụng components
2. **Type Safety**: TypeScript đảm bảo type safety
3. **State Management**: Local state với React hooks
4. **Responsive**: Mobile-first design

## 🚀 Deployment

### Backend

```bash
cd backend
npm run build
npm run start:prod
```

### Frontend

```bash
cd frontend
npm run build
npm start
```

## 📞 Hỗ trợ

Nếu có vấn đề gì, vui lòng tạo issue hoặc liên hệ qua email.

## 📄 License

MIT License


