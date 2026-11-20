// src/pages/Auth/Register.jsx
// Nhiệm vụ: Trâm & Nhóm - Phân hệ Đăng ký tài khoản thành viên (Mặc định role: "user")
import { useState } from 'react';

export default function Register({ onRegisterSuccess, onSwitchToLogin, onClose }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (password !== confirmPassword) {
      setErrorMessage('Mật khẩu xác nhận không khớp! Vui lòng kiểm tra lại.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Mật khẩu phải có tối thiểu 6 ký tự!');
      return;
    }
    if (!agreeTerms) {
      setErrorMessage('Vui lòng đồng ý với điều khoản sử dụng của PetCare Joy!');
      return;
    }

    // Yêu cầu đề bài: "Khi người dùng đăng ký tài khoản mới qua Register, mặc định lưu thông tin người dùng với role: 'user'"
    const newUser = {
      id: `USR-${Date.now()}`,
      name: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      password,
      role: 'user', // Mặc định role: "user" theo yêu cầu 1
      createdAt: new Date().toLocaleDateString('vi-VN'),
    };

    if (onRegisterSuccess) {
      onRegisterSuccess(newUser);
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
          <label className="form-label">Họ và tên của bạn *</label>
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
            <label className="form-label">Email *</label>
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
            <label className="form-label">Số điện thoại *</label>
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
            <label className="form-label">Mật khẩu *</label>
            <input
              type="password"
              required
              className="form-input"
              placeholder="Tối thiểu 6 ký tự"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Xác nhận mật khẩu *</label>
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

        {/* Thông tin vai trò mặc định */}
        <div
          style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '8px 12px',
            fontSize: '0.78rem',
            color: '#64748b',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>🛡️</span>
          <span>
            Tài khoản mới được tạo với vai trò: <strong style={{ color: '#ff6b35' }}>Khách hàng (User)</strong>
          </span>
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
