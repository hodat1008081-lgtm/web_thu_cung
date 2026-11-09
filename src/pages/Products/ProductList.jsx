// src/pages/Products/ProductList.jsx
// Nhiệm vụ: San San - Quản lý hiển thị danh sách sản phẩm thú cưng & phụ kiện
import React from 'react';
import { formatCurrency } from '../../data/products';

export default function ProductList({
  products = [],
  activeCategory = 'all',
  setActiveCategory,
  wishlist = [],
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
}) {
  return (
    <section className="products-section" id="featured-products">
      <div className="container">
        {/* Header danh sách & bộ lọc Tabs */}
        <div className="section-header">
          <div>
            <div className="section-tagline">
              <span>🐾</span> BST Thú Cưng Đáng Yêu Nhất
            </div>
            <h2 className="section-main-heading">
              Các Bé Chó & Mèo <span>Nổi Bật Hôm Nay</span>
            </h2>
          </div>

          {/* Tabs danh mục */}
          {setActiveCategory && (
            <div className="filter-tabs-wrapper">
              <button
                className={`tab-btn ${activeCategory === 'all' ? 'active' : ''}`}
                onClick={() => setActiveCategory('all')}
              >
                Tất cả ({products.length})
              </button>
              <button
                className={`tab-btn ${activeCategory === 'dog' ? 'active' : ''}`}
                onClick={() => setActiveCategory('dog')}
              >
                🐶 Chó cảnh
              </button>
              <button
                className={`tab-btn ${activeCategory === 'cat' ? 'active' : ''}`}
                onClick={() => setActiveCategory('cat')}
              >
                🐱 Mèo cảnh
              </button>
              <button
                className={`tab-btn ${activeCategory === 'food' ? 'active' : ''}`}
                onClick={() => setActiveCategory('food')}
              >
                🥣 Thức ăn
              </button>
              <button
                className={`tab-btn ${activeCategory === 'accessory' ? 'active' : ''}`}
                onClick={() => setActiveCategory('accessory')}
              >
                🎀 Phụ kiện
              </button>
            </div>
          )}
        </div>

        {/* Grid sản phẩm */}
        {products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: '24px' }}>
            <p style={{ fontSize: '1.2rem', color: '#64748b', marginBottom: '16px' }}>
              Không tìm thấy sản phẩm nào trong danh mục này!
            </p>
            {setActiveCategory && (
              <button className="btn-primary-cta" onClick={() => setActiveCategory('all')}>
                Xem tất cả sản phẩm
              </button>
            )}
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => {
              const isFavorite = wishlist.includes(product.id);

              return (
                <div key={product.id} className="product-card">
                  {/* Ảnh sản phẩm */}
                  <div
                    className="product-img-box"
                    onClick={() => onSelectProduct && onSelectProduct(product)}
                    style={{ cursor: 'pointer' }}
                    title="Click xem chi tiết bé này"
                  >
                    <img src={product.image} alt={product.name} className="product-img" />

                    {/* Badge trạng thái */}
                    <div className="badge-tag-wrap">
                      <span className={`badge-pill-status ${product.badgeType || 'discount'}`}>
                        {product.badge}
                      </span>
                    </div>

                    {/* Nút thả tim */}
                    <button
                      className={`wishlist-btn ${isFavorite ? 'active' : ''}`}
                      title={isFavorite ? 'Bỏ thích' : 'Yêu thích'}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onToggleWishlist) onToggleWishlist(product.id);
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                    </button>
                  </div>

                  {/* Thông tin sản phẩm */}
                  <div className="product-content">
                    <div className="product-meta-row">
                      <span className="product-category-name">{product.categoryName}</span>
                      <div className="product-rating">
                        <span>⭐</span>
                        <span>{product.rating}</span>
                        <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>({product.reviewsCount})</span>
                      </div>
                    </div>

                    <h3
                      className="product-name"
                      title={product.name}
                      onClick={() => onSelectProduct && onSelectProduct(product)}
                      style={{ cursor: 'pointer' }}
                    >
                      {product.name}
                    </h3>

                    {/* Tags thông số */}
                    <div className="product-tags-row">
                      {product.tags &&
                        product.tags.map((tag, idx) => (
                          <span key={idx} className="tag-spec">
                            {tag}
                          </span>
                        ))}
                    </div>

                    {/* Giá & nút thêm vào giỏ */}
                    <div className="product-bottom-row">
                      <div className="price-box">
                        <span className="price-current">{formatCurrency(product.price)}</span>
                        {product.originalPrice > product.price && (
                          <span className="price-original">{formatCurrency(product.originalPrice)}</span>
                        )}
                      </div>

                      <button
                        className="add-cart-btn"
                        title="Thêm vào giỏ hàng"
                        onClick={() => onAddToCart && onAddToCart(product)}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        <span>Thêm vào giỏ</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
