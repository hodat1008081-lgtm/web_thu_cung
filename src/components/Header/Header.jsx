// src/components/Header/Header.jsx
import React from 'react';
import SearchBar from '../Search/SearchBar';

export default function Header({
  searchTerm,
  setSearchTerm,
  totalCartCount,
  wishlistCount,
  onOpenCart,
  onOpenAuth,
  activeCategory,
  setActiveCategory,
  onOpenServiceModal,
  onNavigateTab,
  currentTab = 'home',
}) {
  return (
    <header className="main-header">
      {/* Top Bar Thông Báo */}
      <div className="top-bar">
        <div className="container top-bar-inner">
          <div className="top-bar-left">
            <span className="top-bar-item">
              🎉 <strong>Ưu đãi tháng yêu thương:</strong> Giảm tới 40% cho gói dịch vụ Spa & Tặng quà 500k khi đón bé cưng!
            </span>
          </div>
          <div className="top-bar-right">
            <a href="tel:19008899" className="top-bar-item top-bar-link">
              📞 Hotline: 1900 8899 (Miễn phí)
            </a>
            <span className="top-bar-item">⏰ Mở cửa: 08:00 - 21:30</span>
            {/* Shortcut chuyển nhanh sang Tra cứu đơn & Trang Admin */}
            <button
              type="button"
              className="top-bar-item top-bar-link"
              onClick={() => onNavigateTab && onNavigateTab('tracking')}
              style={{ fontWeight: currentTab === 'tracking' ? '700' : '500' }}
            >
              🚚 Tra cứu đơn hàng
            </button>
            <button
              type="button"
              className="top-bar-item top-bar-link"
              onClick={() => onNavigateTab && onNavigateTab('admin')}
              style={{
                background: 'rgba(255,255,255,0.25)',
                padding: '2px 8px',
                borderRadius: '6px',
                fontWeight: '700',
              }}
            >
              👑 Quản trị (Admin)
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container header-main-row">
        {/* Logo */}
        <div
          className="brand-logo"
          onClick={() => {
            if (onNavigateTab) onNavigateTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div className="logo-icon-wrapper">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 13c-1.66 0-3 1.34-3 3 0 1.66 1.34 3 3 3s3-1.34 3-3c0-1.66-1.34-3-3-3zm-6.5-2C4.12 11 3 12.12 3 13.5S4.12 16 5.5 16 8 14.88 8 13.5 6.88 11 5.5 11zm13 0c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5zM8.5 4C7.12 4 6 5.12 6 6.5S7.12 9 8.5 9 11 7.88 11 6.5 9.88 4 8.5 4zm7 0C14.12 4 13 5.12 13 6.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5S16.88 4 15.5 4z" />
            </svg>
          </div>
          <div className="logo-text-group">
            <div className="logo-title">
              PetCare<span>Joy</span>
            </div>
            <span className="logo-subtitle">YÊU THƯƠNG TỪ TRÁI TIM</span>
          </div>
        </div>

        {/* Component SearchBar (Vân) */}
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={() => {
            if (onNavigateTab) onNavigateTab('home');
            const el = document.getElementById('featured-products');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Nhóm nút tương tác */}
        <div className="header-actions">
          {/* Yêu thích */}
          <button
            className="action-btn-circle"
            title="Danh sách yêu thích"
            onClick={() => {
              alert(`Bạn đang lưu ${wishlistCount} bé cưng/sản phẩm yêu thích ❤️`);
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill={wishlistCount > 0 ? '#ef4444' : 'none'}
              stroke={wishlistCount > 0 ? '#ef4444' : 'currentColor'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            {wishlistCount > 0 && <span className="badge-count">{wishlistCount}</span>}
          </button>

          {/* Giỏ hàng (Trâm) */}
          <button
            className="action-btn-circle"
            title="Xem giỏ hàng"
            onClick={onOpenCart}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            {totalCartCount > 0 && <span className="badge-count">{totalCartCount}</span>}
          </button>

          {/* Nút Đăng nhập / Đăng ký (Trâm) */}
          <button
            className="user-login-btn"
            onClick={onOpenAuth}
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span>Đăng nhập</span>
          </button>
        </div>
      </div>

      {/* Menu Danh mục & Điều hướng phân hệ nhóm */}
      <div className="nav-categories-bar">
        <div className="container">
          <ul className="nav-links-list">
            <li>
              <button
                className={`nav-item-link ${currentTab === 'home' && activeCategory === 'all' ? 'active' : ''}`}
                onClick={() => {
                  if (onNavigateTab) onNavigateTab('home');
                  setActiveCategory('all');
                }}
              >
                🏠 Trang chủ
              </button>
            </li>
            <li>
              <button
                className={`nav-item-link ${currentTab === 'home' && activeCategory === 'dog' ? 'active' : ''}`}
                onClick={() => {
                  if (onNavigateTab) onNavigateTab('home');
                  setActiveCategory('dog');
                }}
              >
                🐶 Chó cảnh <span className="nav-item-tag">Hot</span>
              </button>
            </li>
            <li>
              <button
                className={`nav-item-link ${currentTab === 'home' && activeCategory === 'cat' ? 'active' : ''}`}
                onClick={() => {
                  if (onNavigateTab) onNavigateTab('home');
                  setActiveCategory('cat');
                }}
              >
                🐱 Mèo cảnh
              </button>
            </li>
            <li>
              <button
                className={`nav-item-link ${currentTab === 'home' && activeCategory === 'food' ? 'active' : ''}`}
                onClick={() => {
                  if (onNavigateTab) onNavigateTab('home');
                  setActiveCategory('food');
                }}
              >
                🥣 Thức ăn hạt
              </button>
            </li>
            <li>
              <button
                className={`nav-item-link ${currentTab === 'home' && activeCategory === 'accessory' ? 'active' : ''}`}
                onClick={() => {
                  if (onNavigateTab) onNavigateTab('home');
                  setActiveCategory('accessory');
                }}
              >
                🎀 Phụ kiện & Đồ chơi
              </button>
            </li>
            <li>
              <button
                className="nav-item-link"
                onClick={onOpenServiceModal}
              >
                ✂️ Đặt lịch Spa
              </button>
            </li>

            {/* Các tính năng đặc biệt của các thành viên */}
            <li>
              <button
                className={`nav-item-link ${currentTab === 'virtual-pet' ? 'active' : ''}`}
                onClick={() => onNavigateTab && onNavigateTab('virtual-pet')}
                style={{ color: '#ff6b35', background: currentTab === 'virtual-pet' ? '#fff2ec' : 'transparent' }}
              >
                🎮 Nuôi Thú Ảo
              </button>
            </li>
            <li>
              <button
                className={`nav-item-link ${currentTab === 'size-advisor' ? 'active' : ''}`}
                onClick={() => onNavigateTab && onNavigateTab('size-advisor')}
                style={{ color: '#0ea5e9' }}
              >
                📏 Tư Vấn Size Chuồng
              </button>
            </li>
            <li>
              <button
                className={`nav-item-link ${currentTab === 'recommender' ? 'active' : ''}`}
                onClick={() => onNavigateTab && onNavigateTab('recommender')}
                style={{ color: '#8b5cf6' }}
              >
                💡 Chuẩn Đoán & Gợi Ý
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
