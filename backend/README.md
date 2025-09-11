# Student Grade Management Backend

Backend API cho hệ thống quản lý điểm số học sinh sử dụng NestJS và MySQL.

## Cài đặt

1. Cài đặt dependencies:
```bash
npm install
```

2. Tạo file `.env` từ `env.example`:
```bash
cp env.example .env
```

3. Cấu hình database trong file `.env`

4. Tạo database MySQL:
```sql
CREATE DATABASE student_grade_management;
```

5. Chạy ứng dụng:
```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## API Endpoints

### Classes (Lớp học)
- `GET /classes` - Lấy danh sách tất cả lớp
- `POST /classes` - Tạo lớp mới
- `GET /classes/:id` - Lấy thông tin lớp theo ID
- `PATCH /classes/:id` - Cập nhật lớp
- `DELETE /classes/:id` - Xóa lớp

### Students (Học sinh)
- `GET /students` - Lấy danh sách tất cả học sinh
- `GET /students?classId=1` - Lấy học sinh theo lớp
- `POST /students` - Tạo học sinh mới
- `GET /students/:id` - Lấy thông tin học sinh theo ID
- `PATCH /students/:id` - Cập nhật học sinh
- `DELETE /students/:id` - Xóa học sinh

### Tests (Bài test)
- `GET /tests` - Lấy danh sách tất cả bài test
- `GET /tests?studentId=1` - Lấy bài test theo học sinh
- `POST /tests` - Tạo bài test mới
- `GET /tests/:id` - Lấy thông tin bài test theo ID
- `PATCH /tests/:id` - Cập nhật bài test
- `DELETE /tests/:id` - Xóa bài test

### Statistics (Thống kê)
- `GET /tests/statistics` - Lấy thống kê tổng quan
- `GET /tests/passed-count` - Đếm số học sinh pass môn (>=5)
- `GET /tests/excellent-count` - Đếm số học sinh đạt loại giỏi (>=8)

## Database Schema

- **classes**: id, name, created_at, updated_at
- **students**: id, student_code, name, class_id, created_at, updated_at
- **tests**: id, student_id, score, is_passed (computed), test_name, test_date, created_at, updated_at


