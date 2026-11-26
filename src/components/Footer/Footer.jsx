// src/components/Footer/Footer.jsx
import React from 'react';

export default function Footer({ onSubscribeSuccess }) {
  const handleNewsletter = (e) => {
    e.preventDefault();
    if (onSubscribeSuccess) {
      onSubscribeSuccess();
    } else {
      alert('🎉 Đăng ký thành công! Mã ưu đãi PETJOY10 đã được gửi tới email của bạn.');
    }
    e.target.reset();
  };

  return (
    <footer className="site-footer" id="footer-contact">
      <div className="container">
        <div className="footer-top-grid">
          {/* Cột 1: Thông tin thương hiệu */}
          <div>
            <div className="footer-brand-title">
              🐾 PetCare<span>Joy</span>
            </div>
            <p className="footer-brand-desc">
              Hệ sinh thái cung cấp thú cưng thuần chủng và dịch vụ chăm sóc y tế, spa làm đẹp hàng đầu Việt Nam. Nơi tình yêu thương dành cho thú cưng được đặt lên hàng đầu.
            </p>
            <div className="footer-socials">
              <a href="#facebook" className="social-circle-btn" title="Facebook">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
              </a>
              <a href="#tiktok" className="social-circle-btn" title="TikTok">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-3.21.04-6.42.06-9.63V.02h-.02z"/></svg>
              </a>
              <a href="#instagram" className="social-circle-btn" title="Instagram">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#youtube" className="social-circle-btn" title="YouTube">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Cột 2: Thông tin liên hệ chi tiết */}
          <div>
            <h4 className="footer-col-heading">Hệ Thống Cửa Hàng & Hotline</h4>
            <ul className="footer-contact-list">
              <li className="contact-item">
                <span className="contact-icon">📍</span>
                <div>
                  <strong>Chi nhánh Hà Nội:</strong> 123 Đường Cầu Giấy, P. Quan Hoa, Q. Cầu Giấy, Hà Nội
                </div>
              </li>
              <li className="contact-item">
                <span className="contact-icon">📍</span>
                <div>
                  <strong>Chi nhánh TP.HCM:</strong> 456 Nguyễn Thị Minh Khai, Phường 5, Quận 3, TP. Hồ Chí Minh
                </div>
              </li>
              <li className="contact-item">
                <span className="contact-icon">📞</span>
                <div>
                  <strong>Hotline miễn phí:</strong> <a href="tel:19008899" style={{ color: '#ff8c42', fontWeight: 'bold' }}>1900 8899</a> - 0988 123 456
                </div>
              </li>
              <li className="contact-item">
                <span className="contact-icon">✉️</span>
                <div>
                  <strong>Email:</strong> hotro@petcarejoy.vn
                </div>
              </li>
              <li className="contact-item">
                <span className="contact-icon">⏰</span>
                <div>
                  <strong>Giờ mở cửa:</strong> 08:00 - 21:30 (Cả Thứ 7, CN & Lễ)
                </div>
              </li>
            </ul>
          </div>

          {/* Cột 3: Hỗ trợ khách hàng & Chính sách */}
          <div>
            <h4 className="footer-col-heading">Chính Sách & Hỗ Trợ</h4>
            <ul className="footer-nav-list">
              <li><a href="#guarantee" className="footer-nav-link">Bảo hành sức khỏe 30 ngày</a></li>
              <li><a href="#shipping" className="footer-nav-link">Quy trình vận chuyển an toàn</a></li>
              <li><a href="#guide" className="footer-nav-link">Cẩm nang nuôi cún & mèo con</a></li>
              <li><a href="#terms" className="footer-nav-link">Chính sách đổi trả & hoàn tiền</a></li>
              <li><a href="#privacy" className="footer-nav-link">Bảo mật thông tin khách hàng</a></li>
            </ul>
          </div>

          {/* Cột 4: Đăng ký nhận ưu đãi & Thanh toán */}
          <div>
            <h4 className="footer-col-heading">Đăng Ký Nhận Voucher 10%</h4>
            <p className="footer-newsletter-text">
              Nhập email để nhận mã giảm giá đặc biệt và lịch tiêm phòng miễn phí cho bé cưng!
            </p>

            <form className="newsletter-form" onSubmit={handleNewsletter}>
              <input
                type="email"
                required
                placeholder="Nhập email của bạn..."
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-submit-btn">
                Đăng ký
              </button>
            </form>

            <div className="payment-methods-title">Phương thức thanh toán an toàn</div>
            <div className="payment-badges-row">
              <span className="payment-tag">💳 Visa / Master</span>
              <span className="payment-tag">👛 MoMo</span>
              <span className="payment-tag">🏦 VNPay QR</span>
              <span className="payment-tag">💵 COD Tiền mặt</span>
            </div>
          </div>
        </div>

        {/* Bản quyền */}
        <div className="footer-bottom">
          <div className="footer-bottom-inner">
            <div>
              © 2026 <strong>PetCare Joy (web_thu_cung)</strong>. Thiết kế & Phát triển bởi Nhóm Sinh Viên.
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <a href="#security" style={{ color: '#94a3b8' }}>Chứng nhận kiểm dịch thú y</a>
              <span>•</span>
              <a href="#bct" style={{ color: '#94a3b8' }}>Đã đăng ký Bộ Công Thương</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
