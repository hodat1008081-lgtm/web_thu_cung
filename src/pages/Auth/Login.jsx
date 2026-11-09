// src/pages/Auth/Login.jsx
// Nhiệm vụ: Trâm - Xây dựng phân hệ xác thực & Đăng nhập
import React, { useState } from 'react';

export default function Login({ onLoginSuccess, onSwitchToRegister, onClose }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!identifier || !password) {
      alert('Vui lòng nhập đầy đủ thông tin đăng nhập!');
      return;
    }
    if (onLoginSuccess) {
      onLoginSuccess({
        name: identifier.includes('@') ? identifier.split('@')[0] : 'Khách hàng PetCare',
        identifier,
      });
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
        Đăng nhập để xem giỏ hàng, lịch chăm sóc pet và nhận voucher giảm giá
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Email hoặc Số điện thoại</label>
          <input
            type="text"
            required
            className="form-input"
            placeholder="VD: 0988 123 456 hoặc tram@petcare.vn"
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
          onClick={() => onLoginSuccess && onLoginSuccess({ name: 'Google User', identifier: 'google_user@gmail.com' })}
          className="btn-secondary-cta"
          style={{ flex: 1, padding: '10px', fontSize: '0.88rem' }}
        >
          Google
        </button>
        <button
          type="button"
          onClick={() => onLoginSuccess && onLoginSuccess({ name: 'Facebook User', identifier: 'facebook_user' })}
          className="btn-secondary-cta"
          style={{ flex: 1, padding: '10px', fontSize: '0.88rem' }}
        >
          Facebook
        </button>
      </div>
    </div>
  );
}
