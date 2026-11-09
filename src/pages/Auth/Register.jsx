// src/pages/Auth/Register.jsx
// Nhiệm vụ: Trâm - Xây dựng phân hệ Đăng ký tài khoản thành viên
import React, { useState } from 'react';

export default function Register({ onRegisterSuccess, onSwitchToLogin, onClose }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Mật khẩu xác nhận không khớp! Vui lòng kiểm tra lại.');
      return;
    }
    if (!agreeTerms) {
      alert('Vui lòng đồng ý với điều khoản sử dụng của PetCare Joy!');
      return;
    }
    if (onRegisterSuccess) {
      onRegisterSuccess({
        name: fullName,
        email,
        phone,
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
        <button
          className="tab-btn"
          style={{ flex: 1 }}
          onClick={onSwitchToLogin}
        >
          Đăng nhập
        </button>
        <button className="tab-btn active" style={{ flex: 1 }}>
          Đăng ký mới
        </button>
      </div>

      <h3 className="modal-title">Gia Nhập PetCare Joy! 🐶</h3>
      <p className="modal-subtitle">
        Tạo tài khoản thành viên để nhận voucher <strong>10%</strong> và tích điểm đổi quà
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Họ và tên của bạn</label>
          <input
            type="text"
            required
            className="form-input"
            placeholder="VD: Nguyễn Văn An"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              required
              className="form-input"
              placeholder="an@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Số điện thoại</label>
            <input
              type="tel"
              required
              className="form-input"
              placeholder="0988 xxx xxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div className="form-group">
            <label className="form-label">Mật khẩu</label>
            <input
              type="password"
              required
              className="form-input"
              placeholder="Ít nhất 6 ký tự"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Xác nhận mật khẩu</label>
            <input
              type="password"
              required
              className="form-input"
              placeholder="Nhập lại mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '18px' }}>
          <input
            type="checkbox"
            id="agreeTerms"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            style={{ accentColor: '#ff6b35', marginTop: '3px' }}
          />
          <label htmlFor="agreeTerms" style={{ fontSize: '0.82rem', color: '#64748b', cursor: 'pointer', lineHeight: '1.4' }}>
            Tôi đồng ý với <a href="#terms" style={{ color: '#ff6b35' }}>Điều khoản dịch vụ</a> và <a href="#privacy" style={{ color: '#ff6b35' }}>Chính sách bảo mật</a> của PetCare Joy.
          </label>
        </div>

        <button type="submit" className="submit-btn-full">
          Hoàn Tất Đăng Ký
        </button>
      </form>
    </div>
  );
}
