// src/pages/Products/ProductDetail.jsx
// Trang chi tiết cho từng sản phẩm thú cưng
import React from 'react';
import { formatCurrency } from '../../data/products';

/**
 * Props:
 *   product: object                // Product object (must contain image, name, price, description, ...)
 *   onBack: () => void            // Called when user clicks "Quay lại danh sách"
 *   onAddToCart: (product) => void // Called when user clicks "Thêm vào giỏ"
 */
export default function ProductDetail({ product, onBack, onAddToCart }) {
  // Nếu không có sản phẩm thì hiển thị thông báo
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
        ← Quay lại danh sách
      </button>

      <div
        style={{
          background: '#fff',
          borderRadius: '24px',
          padding: '36px',
          border: '1px solid #f1f5f9',
          boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
        }}
      >
        {/* Cột trái: Ảnh lớn + badge */}
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
            {/* Badge nếu có */}
            {product.badge && (
              <span
                className={`badge-pill-status ${product.badgeType || 'discount'}`}
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  background: '#ff6b35',
                  color: '#fff',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '0.85rem',
                }}
              >
                {product.badge}
              </span>
            )}
          </div>
        </div>

        {/* Cột phải: Thông tin chi tiết */}
        <div>
          {/* Danh mục */}
          {product.categoryName && (
            <div style={{ color: '#ff6b35', fontWeight: '700', fontSize: '0.9rem', marginBottom: '8px' }}>
              {product.categoryName}
            </div>
          )}
          {/* Tên sản phẩm */}
          <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '14px' }}>{product.name}</h1>
          {/* Đánh giá */}
          {product.rating !== undefined && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ color: '#f59e0b', fontWeight: '700' }}>⭐ {product.rating}</span>
              {product.reviewsCount !== undefined && (
                <span style={{ color: '#64748b', fontSize: '0.9rem' }}>( {product.reviewsCount} đánh giá )</span>
              )}
            </div>
          )}
          {/* Giá */}
          <div
            style={{
              background: '#fff7ed',
              padding: '12px 20px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'baseline',
              gap: '12px',
              marginBottom: '20px',
            }}
          >
            <span style={{ fontSize: '2rem', fontWeight: '800', color: '#ff6b35' }}>
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span style={{ fontSize: '1.2rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>
          {/* Mô tả */}
          <p style={{ color: '#475569', lineHeight: '1.7', marginBottom: '24px' }}>
            {product.description || 'Chưa có mô tả chi tiết.'}
          </p>
          {/* Nút Thêm vào giỏ */}
          <button
            className="btn-primary-cta"
            onClick={() => onAddToCart && onAddToCart(product)}
            style={{ padding: '12px 24px', fontSize: '1rem' }}
          >
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  );
}
