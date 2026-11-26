import { ref, get, set } from "firebase/database";
import { db } from "../firebase";

const USERS_PATH = "registered_accounts";

// Lấy danh sách tài khoản từ Firebase
export async function getRegisteredAccountsFromFirebase() {
  try {
    const snapshot = await get(ref(db, USERS_PATH));
    if (!snapshot.exists()) return [];
    return Object.values(snapshot.val());
  } catch (error) {
    console.error("Lỗi khi đọc tài khoản từ Firebase:", error);
    return [];
  }
}

// Lưu tài khoản mới lên Firebase
export async function saveRegisteredAccount(newAccount) {
  if (!newAccount || !newAccount.id) return;
  try {
    await set(ref(db, `${USERS_PATH}/${newAccount.id}`), newAccount);
  } catch (error) {
    console.error("Lỗi khi lưu tài khoản lên Firebase:", error);
    throw error;
  }
}

// Kiểm tra trùng Email hoặc SĐT trên Firebase
export async function isAccountRegistered(email, phone) {
  const accounts = await getRegisteredAccountsFromFirebase();
  const cleanEmail = email?.trim().toLowerCase();
  const cleanPhone = phone?.trim();

  return accounts.some(
    (acc) =>
      (cleanEmail && acc.email?.toLowerCase() === cleanEmail) ||
      (cleanPhone && acc.phone === cleanPhone)
  );
}

// Tìm tài khoản trên Firebase để Đăng nhập
export async function findRegisteredAccount(identifier, password) {
  if (!identifier || !password) return null;
  const cleanId = identifier.trim().toLowerCase();
  const accounts = await getRegisteredAccountsFromFirebase();

  return (
    accounts.find(
      (acc) =>
        (acc.email?.toLowerCase() === cleanId || acc.phone === cleanId) &&
        acc.password === password
    ) || null
  );
}

// Giữ lại để tránh lỗi import ở mockData.js
export function getRegisteredAccounts() {
  return [];
}
export const REGISTERED_ACCOUNTS = [];