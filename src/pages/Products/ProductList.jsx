// src/pages/Products/ProductList.jsx
// Nhiệm vụ: San San - Quản lý hiển thị danh sách sản phẩm thú cưng & phụ kiện
// Tích hợp: Hệ thống Tìm kiếm (SearchBar) & Bộ lọc (FilterSidebar) của Vân
import { formatCurrency } from '../../data/products';

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
}) {
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

        {/* Thanh trạng thái bộ lọc đang áp dụng (Active Filters Bar) */}
        {isFiltered && (
          <div className="active-filters-bar">
            <div className="active-filters-info">
              <span className="results-count-badge">
                🔍 Tìm thấy <strong>{products.length}</strong> sản phẩm phù hợp
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
        {products.length === 0 ? (
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
