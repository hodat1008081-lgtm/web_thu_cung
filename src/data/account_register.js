// src/data/account_register.js
// Quản lý và lưu trữ tài khoản khách hàng đăng ký (Persistence storage cho lần đăng nhập sau)

const STORAGE_KEY = 'petcare_registered_accounts';

/**
 * Lấy danh sách tài khoản khách hàng đã đăng ký
 * @returns {Array} Danh sách tài khoản khách hàng
 */
export function getRegisteredAccounts() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      // Loại bỏ tài khoản giả mẫu cũ nếu có
      return parsed.filter(
        (u) => u && u.id !== 'USR-001' && u.id !== 'USR-002' && u.id !== 'USR-003'
      );
    }
    return [];
  } catch (error) {
    console.error('Lỗi khi đọc tài khoản khách hàng từ localStorage:', error);
    return [];
  }
}

/**
 * Lưu tài khoản khách hàng mới khi đăng ký (Dùng cho lần đăng nhập sau)
 * @param {Object} newAccount - Thông tin tài khoản người dùng đăng ký
 * @returns {Array} Danh sách tài khoản sau khi thêm mới
 */
export function saveRegisteredAccount(newAccount) {
  if (!newAccount) return getRegisteredAccounts();

  try {
    const currentAccounts = getRegisteredAccounts();
    // Kiểm tra xem tài khoản đã tồn tại chưa (theo email hoặc phone hoặc id)
    const existsIndex = currentAccounts.findIndex(
      (acc) =>
        (acc.email && newAccount.email && acc.email.toLowerCase() === newAccount.email.toLowerCase()) ||
        (acc.phone && newAccount.phone && acc.phone === newAccount.phone) ||
        acc.id === newAccount.id
    );

    let updatedAccounts;
    if (existsIndex >= 0) {
      // Cập nhật thông tin nếu đã tồn tại
      updatedAccounts = [...currentAccounts];
      updatedAccounts[existsIndex] = { ...updatedAccounts[existsIndex], ...newAccount };
    } else {
      // Thêm mới tài khoản vào đầu danh sách
      updatedAccounts = [newAccount, ...currentAccounts];
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAccounts));
    }
    return updatedAccounts;
  } catch (error) {
    console.error('Lỗi khi lưu tài khoản đăng ký vào localStorage:', error);
    return getRegisteredAccounts();
  }
}

/**
 * Tìm tài khoản khách hàng đã đăng ký để xác thực đăng nhập
 * @param {string} identifier - Email hoặc số điện thoại
 * @param {string} password - Mật khẩu
 * @returns {Object|null} Tài khoản nếu khớp, ngược lại null
 */
export function findRegisteredAccount(identifier, password) {
  if (!identifier || !password) return null;
  const cleanId = identifier.trim().toLowerCase();
  const accounts = getRegisteredAccounts();

  return (
    accounts.find(
      (acc) =>
        (acc.email?.toLowerCase() === cleanId || acc.phone === cleanId) &&
        acc.password === password
    ) || null
  );
}

/**
 * Kiểm tra xem email hoặc số điện thoại đã được đăng ký trước đó chưa
 * @param {string} email
 * @param {string} phone
 * @returns {boolean}
 */
export function isAccountRegistered(email, phone) {
  const accounts = getRegisteredAccounts();
  const cleanEmail = email?.trim().toLowerCase();
  const cleanPhone = phone?.trim();

  return accounts.some(
    (acc) =>
      (cleanEmail && acc.email?.toLowerCase() === cleanEmail) ||
      (cleanPhone && acc.phone === cleanPhone)
  );
}

// Khởi tạo danh sách tài khoản khách hàng đã đăng ký
export const REGISTERED_ACCOUNTS = getRegisteredAccounts();
