// src/pages/Auth/Login.jsx
// Nhiệm vụ: Trâm & Nhóm - Phân hệ Xác thực & Đăng nhập kết nối StoreContext
import { useState } from 'react';
import { useStore } from '../../context/StoreContext';

export default function Login({ onLoginSuccess, onSwitchToRegister, onClose }) {
  const { login, loginSocial } = useStore();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Hàm điền nhanh tài khoản Admin mặc định để test tiện lợi
  const handleFillAdmin = () => {
    setIdentifier('admin@petcare.com');
    setPassword('admin123');
    setErrorMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const result = login(identifier, password);
    if (!result.ok) {
      setErrorMessage(result.message);
      return;
    }

    if (onLoginSuccess) {
      onLoginSuccess(result.user);
    }
  };

  const handleSocial = (provider) => {
    const result = loginSocial(provider);
    if (result.ok && onLoginSuccess) {
      onLoginSuccess(result.user);
    }
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
        Đăng nhập để đặt mua thú cưng, theo dõi đơn hàng và tích điểm đổi quà
      </p>

      {/* Hộp gợi ý tài khoản Admin mặc định */}
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
          onClick={() => handleSocial('google')}
          className="btn-secondary-cta"
          style={{ flex: 1, padding: '10px', fontSize: '0.88rem' }}
        >
          Google
        </button>
        <button
          type="button"
          onClick={() => handleSocial('facebook')}
          className="btn-secondary-cta"
          style={{ flex: 1, padding: '10px', fontSize: '0.88rem' }}
        >
          Facebook
        </button>
      </div>
    </div>
  );
}
