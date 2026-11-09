// src/pages/Products/ProductDetail.jsx
// Nhiệm vụ: San San - Trang hiển thị chi tiết thú cưng / sản phẩm
import React, { useState } from 'react';
import { formatCurrency } from '../../data/products';

export default function ProductDetail({ product, onBack, onAddToCart, onBuyNow }) {
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container" style={{ padding: '60px 0', textAlign: 'center' }}>
        <h2>Không tìm thấy sản phẩm!</h2>
        <button className="btn-primary-cta" onClick={onBack} style={{ marginTop: '20px' }}>
          Quay lại danh sách
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      {/* Nút quay lại */}
      <button
        onClick={onBack}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: '700',
          color: '#ff6b35',
          marginBottom: '24px',
          fontSize: '0.95rem',
        }}
      >
        ← Quay lại danh sách sản phẩm
      </button>

      <div
        style={{
          background: '#ffffff',
          borderRadius: '28px',
          padding: '36px',
          border: '1px solid #f1f5f9',
          boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
        }}
      >
        {/* Cột trái: Hình ảnh lớn */}
        <div>
          <div
            style={{
              width: '100%',
              height: '420px',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              position: 'relative',
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <span
              className={`badge-pill-status ${product.badgeType || 'discount'}`}
              style={{ position: 'absolute', top: '16px', left: '16px', fontSize: '0.85rem' }}
            >
              {product.badge}
            </span>
          </div>

          {/* Cam kết an toàn sức khỏe */}
          <div
            style={{
              marginTop: '24px',
              background: '#f8fafc',
              borderRadius: '18px',
              padding: '20px',
              border: '1px solid #e2e8f0',
            }}
          >
            <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#1e293b', marginBottom: '10px' }}>
              🛡️ Cam Kết An Toàn Sức Khỏe PetCare Joy:
            </h4>
            <ul style={{ paddingLeft: '20px', fontSize: '0.85rem', color: '#475569', lineHeight: '1.7' }}>
              <li>Bảo hành sức khỏe 30 ngày (miễn phí đổi bé mới nếu mắc Care/Parvo).</li>
              <li>Bác sĩ thú y kiểm tra lâm sàng và xét nghiệm trước khi bàn giao.</li>
              <li>Hỗ trợ tư vấn chăm sóc trọn đời 24/7 từ đội ngũ thú y giàu kinh nghiệm.</li>
            </ul>
          </div>
        </div>

        {/* Cột phải: Thông tin chi tiết */}
        <div>
          <div style={{ fontSize: '0.85rem', color: '#ff6b35', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px' }}>
            {product.categoryName}
          </div>

          <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#1e293b', lineHeight: '1.3', marginBottom: '14px' }}>
            {product.name}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
            <span style={{ color: '#f59e0b', fontWeight: '700', fontSize: '1.05rem' }}>
              ⭐ {product.rating}
            </span>
            <span style={{ color: '#94a3b8' }}>•</span>
            <span style={{ color: '#64748b', fontSize: '0.9rem' }}>
              ({product.reviewsCount} khách hàng hài lòng)
            </span>
            <span style={{ color: '#94a3b8' }}>•</span>
            <span style={{ color: '#10b981', fontWeight: '700', fontSize: '0.85rem' }}>
              ✓ Đang có sẵn tại shop
            </span>
          </div>

          {/* Khung giá */}
          <div
            style={{
              background: '#fff7ed',
              padding: '16px 20px',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'baseline',
              gap: '14px',
              marginBottom: '24px',
            }}
          >
            <span style={{ fontSize: '2.1rem', fontWeight: '800', color: '#ff6b35' }}>
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span style={{ fontSize: '1.1rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          <p style={{ color: '#475569', lineHeight: '1.7', marginBottom: '24px' }}>
            {product.description || 'Bé cưng thuần chủng được chăm sóc với chế độ dinh dưỡng cao cấp tại PetCare Joy.'}
          </p>

          {/* Bảng hồ sơ bé cưng */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '30px' }}>
            <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '12px' }}>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block' }}>Độ tuổi</span>
              <strong style={{ color: '#1e293b' }}>{product.age || '2 tháng tuổi'}</strong>
            </div>
            <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '12px' }}>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block' }}>Giới tính</span>
              <strong style={{ color: '#1e293b' }}>{product.gender || 'Đực'}</strong>
            </div>
            <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '12px' }}>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block' }}>Tiêm phòng</span>
              <strong style={{ color: '#1e293b' }}>{product.vaccine || 'Đã tiêm vắc xin'}</strong>
            </div>
            <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '12px' }}>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block' }}>Nguồn gốc</span>
              <strong style={{ color: '#1e293b' }}>{product.origin || 'Việt Nam'}</strong>
            </div>
          </div>

          {/* Số lượng & Cụm nút CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                className="cart-qty-btn"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <span style={{ fontWeight: '700', minWidth: '24px', textAlign: 'center' }}>
                {quantity}
              </span>
              <button
                className="cart-qty-btn"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>

            <button
              className="btn-secondary-cta"
              style={{ flex: 1 }}
              onClick={() => onAddToCart && onAddToCart({ ...product, quantity })}
            >
              🛒 Thêm Vào Giỏ
            </button>

            <button
              className="btn-primary-cta"
              style={{ flex: 1 }}
              onClick={() => onBuyNow && onBuyNow({ ...product, quantity })}
            >
              🐾 Đón Bé Ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
