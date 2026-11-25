// src/pages/Products/ProductList.jsx
// Quản lý hiển thị danh sách sản phẩm thú cưng & phụ kiện (Nhiệm vụ: San San)
// Tích hợp: Hệ thống Tìm kiếm (SearchBar) & Bộ lọc (FilterSidebar) của Vân
import { useMemo } from 'react';

// Hàm định dạng giá tiền VNĐ (vd: 150.000 VNĐ)
const formatPriceVND = (amount) => {
  return (amount || 0).toLocaleString('vi-VN') + ' VNĐ';
};

export default function ProductList({
  products = [],
  activeCategory = 'all',
  setActiveCategory,
  searchTerm = '',
  setSearchTerm,
  priceRange = 'all',
  setPriceRange,
  sortBy = 'default',
  setSortBy,
  onResetFilters,
  wishlist = [],
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
  onViewDetail,
}) {
  // Sử dụng trực tiếp danh sách sản phẩm từ StoreContext (Single Source of Truth)
  const displayProducts = useMemo(() => {
    return Array.isArray(products) ? products : [];
  }, [products]);

  // Xử lý khi nhấn nút Xem chi tiết: hỗ trợ cả onViewDetail và onSelectProduct
  const handleDetailClick = (product) => {
    if (onViewDetail) onViewDetail(product);
    if (onSelectProduct) onSelectProduct(product);
  };

  // Label danh mục đang chọn
  const getCategoryLabel = (cat) => {
    switch (cat) {
      case 'dog':
        return '🐶 Chó cảnh';
      case 'cat':
        return '🐱 Mèo cảnh';
      case 'food':
        return '🥣 Thức ăn';
      case 'accessory':
        return '🎀 Phụ kiện';
      default:
        return 'Tất cả';
    }
  };

  // Label khoảng giá đang chọn
  const getPriceRangeLabel = (pr) => {
    switch (pr) {
      case 'under-1m':
        return '< 1.000.000₫';
      case '1m-5m':
        return '1.000.000₫ - 5.000.000₫';
      case '5m-10m':
        return '5.000.000₫ - 10.000.000₫';
      case 'above-10m':
        return '> 10.000.000₫';
      default:
        return null;
    }
  };

  // Label sắp xếp đang chọn
  const getSortLabel = (sb) => {
    switch (sb) {
      case 'price-asc':
        return 'Giá: Thấp -> Cao';
      case 'price-desc':
        return 'Giá: Cao -> Thấp';
      case 'rating-desc':
        return 'Đánh giá cao nhất';
      default:
        return null;
    }
  };

  const isFiltered =
    activeCategory !== 'all' ||
    priceRange !== 'all' ||
    sortBy !== 'default' ||
    Boolean(searchTerm && searchTerm.trim());

  return (
    <section className="products-section" id="featured-products">
      <div className="container">
        {/* Header danh sách sản phẩm */}
        <div className="section-header" style={{ marginBottom: '28px' }}>
          <div>
            <div className="section-tagline">
              <span>🐾</span> Sản Phẩm Thú Cưng Chọn Lọc
            </div>
            <h2 className="section-main-heading">
              Bộ Sưu Tập <span>Thú Cưng & Phụ Kiện Nổi Bật</span>
            </h2>
          </div>
        </div>

        {/* Thanh trạng thái bộ lọc đang áp dụng (Active Filters Bar) */}
        {isFiltered && (
          <div className="active-filters-bar">
            <div className="active-filters-info">
              <span className="results-count-badge">
                🔍 Tìm thấy <strong>{displayProducts.length}</strong> sản phẩm phù hợp
              </span>

              <div className="active-filter-chips">
                {/* Chip từ khóa tìm kiếm */}
                {searchTerm && searchTerm.trim() && (
                  <span className="filter-chip">
                    <span>Từ khóa: "{searchTerm}"</span>
                    {setSearchTerm && (
                      <button
                        type="button"
                        onClick={() => setSearchTerm('')}
                        title="Bỏ từ khóa này"
                        className="chip-remove-btn"
                      >
                        ✕
                      </button>
                    )}
                  </span>
                )}

                {/* Chip danh mục */}
                {activeCategory !== 'all' && (
                  <span className="filter-chip">
                    <span>{getCategoryLabel(activeCategory)}</span>
                    {setActiveCategory && (
                      <button
                        type="button"
                        onClick={() => setActiveCategory('all')}
                        title="Bỏ lọc danh mục"
                        className="chip-remove-btn"
                      >
                        ✕
                      </button>
                    )}
                  </span>
                )}

                {/* Chip khoảng giá */}
                {priceRange !== 'all' && getPriceRangeLabel(priceRange) && (
                  <span className="filter-chip">
                    <span>Giá: {getPriceRangeLabel(priceRange)}</span>
                    {setPriceRange && (
                      <button
                        type="button"
                        onClick={() => setPriceRange('all')}
                        title="Bỏ lọc giá"
                        className="chip-remove-btn"
                      >
                        ✕
                      </button>
                    )}
                  </span>
                )}

                {/* Chip sắp xếp */}
                {sortBy !== 'default' && getSortLabel(sortBy) && (
                  <span className="filter-chip">
                    <span>Sắp xếp: {getSortLabel(sortBy)}</span>
                    {setSortBy && (
                      <button
                        type="button"
                        onClick={() => setSortBy('default')}
                        title="Bỏ sắp xếp"
                        className="chip-remove-btn"
                      >
                        ✕
                      </button>
                    )}
                  </span>
                )}
              </div>
            </div>

            {/* Nút xóa nhanh tất cả bộ lọc */}
            {onResetFilters && (
              <button
                type="button"
                onClick={onResetFilters}
                className="reset-all-filters-btn"
                title="Xóa tất cả điều kiện tìm kiếm và bộ lọc"
              >
                ✕ Đặt lại tất cả
              </button>
            )}
          </div>
        )}

        {/* Grid sản phẩm hoặc Trạng thái rỗng */}
        {displayProducts.length === 0 ? (
          <div className="empty-products-state">
            <div className="empty-icon-circle">🔍</div>
            <h3 className="empty-title">Không tìm thấy sản phẩm nào!</h3>
            <p className="empty-desc">
              Không có thú cưng hoặc sản phẩm nào khớp với các tiêu chí tìm kiếm và bộ lọc hiện tại của bạn.
            </p>
            <div className="empty-suggestions">
              <span>Gợi ý:</span> Thử tìm với từ khóa khác, hoặc đặt lại khoảng giá và danh mục.
            </div>
            {onResetFilters ? (
              <button className="btn-primary-cta" onClick={onResetFilters}>
                ✕ Xóa bộ lọc & Xem tất cả sản phẩm
              </button>
            ) : setActiveCategory ? (
              <button className="btn-primary-cta" onClick={() => setActiveCategory('all')}>
                Xem tất cả sản phẩm
              </button>
            ) : null}
          </div>
        ) : (
          <div
            className="products-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {displayProducts.map((product) => {
              const isFavorite = wishlist && wishlist.includes(product.id);
              const stock = typeof product.stock === 'number' ? product.stock : 0;
              const isSoldOut = stock <= 0;

              return (
                <div
                  key={product.id}
                  className="product-card"
                  style={{
                    background: '#ffffff',
                    borderRadius: '20px',
                    border: isSoldOut ? '1px solid #e2e8f0' : '1px solid #f1f5f9',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    opacity: isSoldOut ? 0.92 : 1,
                  }}
                >
                  {/* Khung ảnh: Chiều cao 200px, object-fit cover */}
                  <div
                    className="product-img-box"
                    style={{
                      height: '200px',
                      width: '100%',
                      position: 'relative',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      backgroundColor: '#f8fafc',
                    }}
                    onClick={() => handleDetailClick(product)}
                    title="Bấm để xem chi tiết"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.3s ease',
                        filter: isSoldOut ? 'grayscale(45%)' : 'none',
                      }}
                    />

                    {/* Lớp phủ Overlay mờ + nhãn SOLD OUT / HẾT HÀNG khi stock <= 0 */}
                    {isSoldOut && (
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'rgba(15, 23, 42, 0.55)',
                          backdropFilter: 'blur(2px)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          zIndex: 3,
                        }}
                      >
                        <span
                          style={{
                            background: '#ef4444',
                            color: '#ffffff',
                            padding: '6px 16px',
                            borderRadius: '10px',
                            fontWeight: '800',
                            fontSize: '0.88rem',
                            letterSpacing: '0.06em',
                            boxShadow: '0 4px 16px rgba(239, 68, 68, 0.45)',
                            border: '2px solid rgba(255,255,255,0.88)',
                            transform: 'rotate(-4deg)',
                          }}
                        >
                          SOLD OUT • HẾT HÀNG
                        </span>
                      </div>
                    )}

                    {/* Badge trạng thái */}
                    {product.badge && !isSoldOut && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          background: 'linear-gradient(135deg, #ff6b35 0%, #ff8c5a 100%)',
                          color: '#ffffff',
                          padding: '4px 10px',
                          borderRadius: '50px',
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          boxShadow: '0 2px 8px rgba(255,107,53,0.3)',
                          zIndex: 2,
                        }}
                      >
                        {product.badge}
                      </div>
                    )}

                    {/* Nút thả tim (Wishlist) */}
                    {onToggleWishlist && (
                      <button
                        className={`wishlist-btn ${isFavorite ? 'active' : ''}`}
                        title={isFavorite ? 'Bỏ thích' : 'Yêu thích'}
                        style={{ zIndex: 4 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWishlist(product.id);
                        }}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill={isFavorite ? 'currentColor' : 'none'}
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Nội dung thông tin sản phẩm */}
                  <div
                    className="product-content"
                    style={{
                      padding: '18px',
                      display: 'flex',
                      flexDirection: 'column',
                      flexGrow: 1,
                    }}
                  >
                    {/* Danh mục & Đánh giá */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '8px',
                        fontSize: '0.8rem',
                      }}
                    >
                      <span style={{ color: '#ff6b35', fontWeight: '700' }}>
                        {product.categoryName}
                      </span>
                      {product.rating !== undefined && (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            color: '#f59e0b',
                            fontWeight: '700',
                          }}
                        >
                          <span>⭐</span>
                          <span>{product.rating}</span>
                          {product.reviewsCount !== undefined && (
                            <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>
                              ({product.reviewsCount})
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Tên sản phẩm */}
                    <h3
                      className="product-name"
                      onClick={() => handleDetailClick(product)}
                      style={{
                        fontSize: '1.05rem',
                        fontWeight: '700',
                        color: '#1e293b',
                        marginBottom: '8px',
                        cursor: 'pointer',
                        lineHeight: '1.4',
                        minHeight: '2.8em',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                      title={product.name}
                    >
                      {product.name}
                    </h3>

                    {/* Tình trạng tồn kho */}
                    <div style={{ marginBottom: '10px' }}>
                      {isSoldOut ? (
                        <span
                          style={{
                            fontSize: '0.74rem',
                            fontWeight: '700',
                            color: '#dc2626',
                            background: '#fee2e2',
                            padding: '2px 8px',
                            borderRadius: '6px',
                          }}
                        >
                          ✕ Hết hàng (Sold Out)
                        </span>
                      ) : stock < 5 ? (
                        <span
                          style={{
                            fontSize: '0.74rem',
                            fontWeight: '700',
                            color: '#d97706',
                            background: '#fef3c7',
                            padding: '2px 8px',
                            borderRadius: '6px',
                          }}
                        >
                          🔥 Sắp hết: còn {stock}
                        </span>
                      ) : (
                        <span
                          style={{
                            fontSize: '0.74rem',
                            fontWeight: '600',
                            color: '#10b981',
                            background: '#ecfdf5',
                            padding: '2px 8px',
                            borderRadius: '6px',
                          }}
                        >
                          ✓ Còn {stock} sản phẩm
                        </span>
                      )}
                    </div>

                    {/* Giá tiền */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '10px',
                        marginBottom: '16px',
                        marginTop: 'auto',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: '800',
                          color: isSoldOut ? '#94a3b8' : '#ff6b35',
                        }}
                      >
                        {formatPriceVND(product.price)}
                      </span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span
                          style={{
                            fontSize: '0.85rem',
                            color: '#94a3b8',
                            textDecoration: 'line-through',
                          }}
                        >
                          {formatPriceVND(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    {/* 2 nút thao tác: "Xem chi tiết" và "Thêm vào giỏ" / "Hết hàng" */}
                    <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                      <button
                        className="btn-primary-cta"
                        onClick={() => handleDetailClick(product)}
                        style={{
                          flex: 1,
                          padding: '10px 8px',
                          fontSize: '0.88rem',
                          borderRadius: '12px',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        Xem chi tiết
                      </button>

                      <button
                        className="btn-secondary-cta"
                        disabled={isSoldOut}
                        onClick={() => !isSoldOut && onAddToCart && onAddToCart(product)}
                        style={{
                          flex: 1,
                          padding: '10px 8px',
                          fontSize: '0.88rem',
                          borderRadius: '12px',
                          whiteSpace: 'nowrap',
                          opacity: isSoldOut ? 0.55 : 1,
                          cursor: isSoldOut ? 'not-allowed' : 'pointer',
                          background: isSoldOut ? '#f1f5f9' : undefined,
                          color: isSoldOut ? '#64748b' : undefined,
                          borderColor: isSoldOut ? '#cbd5e1' : undefined,
                        }}
                      >
                        {isSoldOut ? 'Hết hàng' : 'Thêm vào giỏ'}
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
