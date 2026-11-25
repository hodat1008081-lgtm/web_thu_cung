// src/data/mockData.js
// Dữ liệu dùng chung cho Hệ thống Tài khoản (Auth) & Đơn hàng (Orders)
import { getRegisteredAccounts } from './account_register';

// 1. Tài khoản Quản trị viên (Admin) cố định
export const ADMIN_ACCOUNT = {
  id: 'USR-ADMIN',
  email: 'admin@petcare.com',
  password: 'admin123',
  name: 'Quản Trị Viên (Admin)',
  phone: '1900 8899',
  role: 'admin',
  createdAt: '2026-01-01',
};

// 2. Danh sách tài khoản người dùng ban đầu:
// Không tạo data giả về người dùng, chỉ giữ lại const tài khoản admin
// và nạp các tài khoản khách hàng thực tế đã đăng ký từ file account_register
export const INITIAL_USERS = [
  ADMIN_ACCOUNT,
  ...getRegisteredAccounts(),
];

// 2. Danh sách đơn đặt hàng ban đầu kết nối giữa Khách hàng và Admin
export const INITIAL_ORDERS = [
  {
    id: 'PET-2026-8899',
    customerName: 'Trần Minh Hiển',
    phone: '0988 666 888',
    deliveryAddress: '456 Nguyễn Thị Minh Khai, Phường 5, Quận 3, TP. Hồ Chí Minh',
    note: 'Chuẩn bị chuồng đệm ấm cho bé',
    petName: 'Chó Poodle Teacup Nâu Đỏ Siêu Xinh',
    items: [
      {
        id: 1,
        name: 'Chó Poodle Teacup Nâu Đỏ Siêu Xinh',
        price: 4800000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1516371535707-512a1e83bb9a?w=600&auto=format&fit=crop&q=80',
      },
    ],
    totalAmount: 4800000,
    paymentMethod: 'COD Tiền mặt',
    status: 'shipping', // 'pending' | 'shipping' | 'completed' | 'cancelled'
    createdAt: '11:20 Hôm nay',
    estimatedArrival: '15:30 Hôm nay (Khoảng 45 phút nữa)',
    driverName: 'Nguyễn Văn Hùng (Tài xế chuyên dụng PetCare)',
    driverPhone: '0912 345 678',
    driverVehicle: 'Xe ô tô bán tải chuyên dụng máy lạnh (Biển số: 51A-987.65)',
  },
  {
    id: 'PET-2026-7721',
    customerName: 'Lê Hoàng Trâm',
    phone: '0977 123 456',
    deliveryAddress: '128 Hai Bà Trưng, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
    note: 'Giao giờ hành chính giúp mình',
    petName: 'Mèo Anh Lông Ngắn (Aln) Xám Xanh',
    items: [
      {
        id: 2,
        name: 'Mèo Anh Lông Ngắn (Aln) Xám Xanh',
        price: 5500000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop&q=80',
      },
    ],
    totalAmount: 5500000,
    paymentMethod: 'Chuyển khoản VietQR',
    status: 'completed',
    createdAt: '09:15 Hôm nay',
    estimatedArrival: 'Đã hoàn tất giao bé an toàn lúc 11:00 AM',
    driverName: 'Lê Thanh Phong (Tài xế PetCare)',
    driverPhone: '0903 888 999',
    driverVehicle: 'Xe van máy lạnh chuyên dụng',
  },
  {
    id: 'PET-2026-6612',
    customerName: 'Nguyễn San San',
    phone: '0933 999 111',
    deliveryAddress: '72 Lê Thánh Tôn, Bến Nghé, Quận 1, TP. Hồ Chí Minh',
    note: 'Để trước cửa nhà giúp mình nếu không nghe máy',
    petName: 'Hạt Royal Canin 2kg + Nhà Cây Cat Tree',
    items: [
      {
        id: 7,
        name: 'Hạt Royal Canin Cao Cấp Cho Chó Mèo Con 2kg',
        price: 420000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&auto=format&fit=crop&q=80',
      },
      {
        id: 9,
        name: 'Trụ Cào Móng & Nhà Cây Cho Mèo Cat Tree',
        price: 690000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=600&auto=format&fit=crop&q=80',
      },
    ],
    totalAmount: 1110000,
    paymentMethod: 'Ví MoMo',
    status: 'completed',
    createdAt: 'Hôm qua',
    estimatedArrival: 'Đã giao thành công lúc 16:30',
    driverName: 'Trần Quốc Đạt (Giao vận Express)',
    driverPhone: '0918 222 333',
    driverVehicle: 'Xe máy thùng giữ nhiệt PetCare',
  },
  {
    id: 'PET-2026-5503',
    customerName: 'Phạm Thị Vân',
    phone: '0909 333 777',
    deliveryAddress: '230 Hoàng Văn Thụ, Phường 4, Quận Tân Bình, TP. Hồ Chí Minh',
    note: 'Bé cún cần chuồng lót ấm',
    petName: 'Chó Golden Retriever Vàng Kim',
    items: [
      {
        id: 5,
        name: 'Chó Golden Retriever Vàng Kim Thông Minh',
        price: 7200000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&auto=format&fit=crop&q=80',
      },
    ],
    totalAmount: 7200000,
    paymentMethod: 'COD Tiền mặt',
    status: 'pending', // Chờ xác nhận
    createdAt: 'Hôm qua',
    estimatedArrival: 'Dự kiến sau khi Admin xác nhận xuất chuồng',
    driverName: 'Đang phân công tài xế',
    driverPhone: '1900 8899',
    driverVehicle: 'Xe ô tô chuyên dụng PetCare',
  },
];
