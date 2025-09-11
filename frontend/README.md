# Student Grade Management Frontend

Frontend cho hệ thống quản lý điểm số học sinh sử dụng Next.js và TypeScript.

## Cài đặt

1. Cài đặt dependencies:

```bash
npm install
```

2. Tạo file `.env.local` từ `env.local.example`:

```bash
cp env.local.example .env.local
```

3. Cấu hình API URL trong file `.env.local`

4. Chạy ứng dụng:

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

## Tính năng

- **Trang chủ**: Hiển thị thống kê tổng quan
- **Quản lý lớp học**: CRUD operations cho lớp học
- **Quản lý học sinh**: CRUD operations cho học sinh
- **Quản lý bài test**: CRUD operations cho điểm số
- **Thống kê**: Báo cáo chi tiết về điểm số

## Công nghệ sử dụng

- Next.js 14 với App Router
- TypeScript
- Tailwind CSS
- Axios cho API calls
- Lucide React cho icons
- Headless UI cho components
