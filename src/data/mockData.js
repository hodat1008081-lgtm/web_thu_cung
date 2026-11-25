// src/data/mockData.js
// Cấu hình tài khoản Admin mặc định ban đầu cho StoreContext

export const DEFAULT_ADMIN_USER = {
  id: 'USR-ADMIN',
  email: 'admin@petcare.com',
  password: 'admin123',
  name: 'Quản Trị Viên (Admin)',
  phone: '1900 8899',
  address: 'Trụ sở chính PetCare Joy, Quận 1, TP.HCM',
  role: 'admin',
  createdAt: '01/01/2026',
};

// Danh sách users khởi tạo ban đầu (chỉ gồm tài khoản Admin mặc định)
export const INITIAL_USERS = [DEFAULT_ADMIN_USER];

// Đơn hàng khởi tạo mặc định là mảng rỗng (chỉ chứa đơn hàng thực tế do khách đặt)
export const INITIAL_ORDERS = [];
