// src/pages/Auth/Login.jsx
// Nhiệm vụ: Trâm & Nhóm - Phân hệ Xác thực & Đăng nhập (Role-based Authentication)
import { useState } from 'react';
import { ADMIN_ACCOUNT } from '../../data/mockData';
import { findRegisteredAccount } from '../../data/account_register';

export default function Login({ onLoginSuccess, onSwitchToRegister, onClose, users = [] }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Hàm điền nhanh tài khoản Admin mặc định để test tiện lợi
  const handleFillAdmin = () => {
    setIdentifier(ADMIN_ACCOUNT.email);
    setPassword(ADMIN_ACCOUNT.password);
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanId = identifier.trim().toLowerCase();

    // 1. Kiểm tra tài khoản Admin cố định
    if (cleanId === ADMIN_ACCOUNT.email.toLowerCase() && password === ADMIN_ACCOUNT.password) {
      if (onLoginSuccess) {
        onLoginSuccess(ADMIN_ACCOUNT);
      }
      return;
    }

    // 2. Tìm kiếm trong tài khoản khách hàng đã đăng ký (lưu trong account_register) hoặc danh sách users
    const registeredUser = await findRegisteredAccount(cleanId, password);
    const matchedUser =
      registeredUser ||
      users.find(
        (u) =>
          (u.email?.toLowerCase() === cleanId || u.phone === cleanId) &&
          u.password === password
      );

    if (matchedUser) {
      if (onLoginSuccess) {
        onLoginSuccess({
          name: matchedUser.name,
          email: matchedUser.email,
          role: matchedUser.role || 'user',
          phone: matchedUser.phone,
        });
      }
      return;
    }

    // 3. Nếu cố tình nhập email Admin mà sai mật khẩu
    if (cleanId === ADMIN_ACCOUNT.email.toLowerCase()) {
      setErrorMessage(`Mật khẩu tài khoản Admin không đúng! (Mặc định: ${ADMIN_ACCOUNT.password})`);
      return;
    }

    if (cleanId && password.length >= 6) {
      // Đăng nhập thành công với vai trò user
      const displayName = cleanId.includes('@')
        ? cleanId.split('@')[0]
        : `Khách hàng ${cleanId.slice(-4)}`;
      if (onLoginSuccess) {
        onLoginSuccess({
          name: displayName,
          email: cleanId.includes('@') ? cleanId : `${cleanId}@petcare.local`,
          role: 'user',
          phone: !cleanId.includes('@') ? cleanId : '',
        });
      }
      return;
    }

    setErrorMessage('Email/Số điện thoại hoặc mật khẩu không hợp lệ (tối thiểu 6 ký tự)!');
  };

  return (
    <div className="modal-content-box" onClick={(e) => e.stopPropagation()}>
      {onClose && (
        <button className="modal-close-btn" onClick={onClose} title="Đóng">
          ✕
        </button>
      )}

      {/* Tabs chuyển đổi Đăng nhập / Đăng ký */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button className="tab-btn active" style={{ flex: 1 }}>
          Đăng nhập
        </button>
        <button
          className="tab-btn"
          style={{ flex: 1 }}
          onClick={onSwitchToRegister}
        >
          Đăng ký mới
        </button>
      </div>

      <h3 className="modal-title">Chào Mừng Trở Lại! 🐾</h3>
      <p className="modal-subtitle">
        Đăng nhập để xem giỏ hàng, tra cứu đơn hàng và quản lý tài khoản
      </p>

      {/* Hộp gợi ý tài khoản Admin theo yêu cầu */}
      <div
        style={{
          background: '#fff7ed',
          border: '1.5px dashed #fed7aa',
          padding: '12px 14px',
          borderRadius: '12px',
          marginBottom: '18px',
          fontSize: '0.82rem',
          color: '#9a3412',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
        }}
      >
        <div>
          <strong>👑 Tài khoản Quản trị (Admin):</strong>
          <div style={{ fontSize: '0.78rem', color: '#c2410c' }}>
            admin@petcare.com • Mật khẩu: <code>admin123</code>
          </div>
        </div>
        <button
          type="button"
          onClick={handleFillAdmin}
          className="btn-secondary-cta"
          style={{ padding: '4px 10px', fontSize: '0.75rem', whiteSpace: 'nowrap' }}
        >
          ⚡ Điền nhanh Admin
        </button>
      </div>

      {errorMessage && (
        <div
          style={{
            background: '#fef2f2',
            color: '#dc2626',
            border: '1px solid #fecaca',
            padding: '8px 12px',
            borderRadius: '8px',
            fontSize: '0.82rem',
            marginBottom: '16px',
            fontWeight: '600',
          }}
        >
          ⚠️ {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Email hoặc Số điện thoại</label>
          <input
            type="text"
            required
            className="form-input"
            placeholder="VD: admin@petcare.com hoặc 0988 123 456"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </div>

        <div className="form-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <label className="form-label" style={{ margin: 0 }}>Mật khẩu</label>
            <a href="#forgot" style={{ fontSize: '0.8rem', color: '#ff6b35' }}>
              Quên mật khẩu?
            </a>
          </div>
          <input
            type="password"
            required
            className="form-input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            style={{ accentColor: '#ff6b35' }}
          />
          <label htmlFor="rememberMe" style={{ fontSize: '0.85rem', color: '#64748b', cursor: 'pointer' }}>
            Ghi nhớ đăng nhập trên thiết bị này
          </label>
        </div>

        <button type="submit" className="submit-btn-full">
          Đăng Nhập Ngay
        </button>
      </form>

      {/* Đăng nhập mạng xã hội */}
      <div style={{ textAlign: 'center', margin: '20px 0 14px', fontSize: '0.82rem', color: '#94a3b8' }}>
        Hoặc tiếp tục với
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          type="button"
          onClick={() =>
            onLoginSuccess &&
            onLoginSuccess({
              name: 'Google Member',
              email: 'google_user@gmail.com',
              role: 'user',
            })
          }
          className="btn-secondary-cta"
          style={{ flex: 1, padding: '10px', fontSize: '0.88rem' }}
        >
          Google
        </button>
        <button
          type="button"
          onClick={() =>
            onLoginSuccess &&
            onLoginSuccess({
              name: 'Facebook Member',
              email: 'facebook_user@petcare.vn',
              role: 'user',
            })
          }
          className="btn-secondary-cta"
          style={{ flex: 1, padding: '10px', fontSize: '0.88rem' }}
        >
          Facebook
        </button>
      </div>
    </div>
  );
}
