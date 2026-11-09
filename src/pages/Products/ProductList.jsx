// src/pages/Products/ProductList.jsx
 feature/danhsachsp
// Quản lý hiển thị danh sách sản phẩm thú cưng & phụ kiện (Nhiệm vụ: San San)
import React from 'react';

// Danh sách 6 sản phẩm thú cưng mẫu với hình ảnh thật nét từ Unsplash
export const SAMPLE_PRODUCTS = [
  {
    id: 1,
    name: 'Thức ăn hạt Royal Canin Maxi Puppy 2kg',
    price: 420000,
    originalPrice: 480000,
    categoryName: 'Thức ăn & Dinh dưỡng',
    badge: '-12%',
    badgeType: 'discount',
    rating: 5.0,
    reviewsCount: 128,
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800&auto=format&fit=crop&q=80',
    description: 'Thức ăn hạt dinh dưỡng cao cấp xuất xứ từ Pháp, công thức đặc chế giàu protein chất lượng cao, men vi sinh tiêu hóa và DHA giúp phát triển trí não tối ưu cho chó mèo con dưới 12 tháng tuổi.',
    specs: {
      'Thương hiệu': 'Royal Canin (Pháp)',
      'Trọng lượng': '2.0 kg',
      'Độ tuổi phù hợp': 'Dành cho thú cưng dưới 12 tháng tuổi',
      'Hạn sử dụng': '24 tháng kể từ ngày sản xuất',
    },
  },
  {
    id: 2,
    name: 'Pâté mèo sốt cá ngừ & gà thượng hạng 85g',
    price: 150000,
    originalPrice: 180000,
    categoryName: 'Thức ăn ướt & Pâté',
    badge: 'Bestseller',
    badgeType: 'hot',
    rating: 4.9,
    reviewsCount: 95,
    image: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=800&auto=format&fit=crop&q=80',
    description: 'Pâté tươi ngon được nấu từ phi lê cá ngừ đại dương và ức gà tươi hảo hạng, bổ sung khoáng chất Taurine giúp sáng mắt, mượt lông và hỗ trợ thận cho mèo mọi lứa tuổi.',
    specs: {
      'Thương hiệu': 'Whiskas Gourmet',
      'Quy cách': 'Combo hộp 6 gói (85g/gói)',
      'Thành phần': 'Cá ngừ 45%, ức gà 30%, thạch bổ sung Taurine',
      'Hạn sử dụng': '18 tháng',
    },
  },
  {
    id: 3,
    name: 'Đồ chơi xương gặm cao su mài răng sạch mảng bám',
    price: 80000,
    originalPrice: 110000,
    categoryName: 'Đồ chơi thú cưng',
    badge: 'Yêu thích',
    badgeType: 'purebred',
    rating: 4.8,
    reviewsCount: 64,
    image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800&auto=format&fit=crop&q=80',
    description: 'Đồ chơi gặm hình xương làm từ cao su tự nhiên cao cấp an toàn tuyệt đối, độ đàn hồi cực dai có gai massage nướu, giúp cún làm sạch cao răng và không cắn phá đồ đạc trong nhà.',
    specs: {
      'Chất liệu': 'Cao su nhiệt dẻo TPR không độc hại, không mùi',
      'Kích thước': 'Dài 15cm x rộng 4.5cm',
      'Tính năng': 'Chịu lực cắn mạnh, nổi trên mặt nước, có rãnh massage',
      'Xuất xứ': 'Nhập khẩu cao cấp',
    },
  },
  {
    id: 4,
    name: 'Vòng cổ chuông đồng thời trang phong cách Retro',
    price: 120000,
    originalPrice: 150000,
    categoryName: 'Phụ kiện thời trang',
    badge: 'Hot trend',
    badgeType: 'new',
    rating: 4.9,
    reviewsCount: 78,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&auto=format&fit=crop&q=80',
    description: 'Vòng cổ vải dệt thủ công hoa văn vintage sang trọng, kèm chuông đồng leng keng giúp bạn dễ định vị bé cưng. Chốt kim loại bền bỉ có thể nới rộng vừa vặn cho cả chó và mèo.',
    specs: {
      'Chất liệu': 'Vải dệt Canvas cao cấp & khóa hợp kim chống gỉ',
      'Kích cỡ': 'Chu vi cổ từ 19cm - 32cm (tự do điều chỉnh)',
      'Đối tượng': 'Phù hợp cho mèo và các giống chó nhỏ/vừa',
      'Phụ kiện kèm': 'Chuông đồng phong thủy mini siêu xinh',
    },
  },
  {
    id: 5,
    name: 'Nệm êm nhung tuyết bồng bềnh chống trượt cao cấp',
    price: 250000,
    originalPrice: 320000,
    categoryName: 'Ổ nệm & Đồ ngủ',
    badge: '-22%',
    badgeType: 'discount',
    rating: 5.0,
    reviewsCount: 110,
    image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=800&auto=format&fit=crop&q=80',
    description: 'Nệm tròn lông nhung tuyết êm ái tựa đám mây với lõi bông PP đàn hồi cao cấp, đáy phủ hạt cao su chống trượt trên nền gạch men, mang lại giấc ngủ sâu và ấm áp bảo vệ xương khớp cho thú cưng.',
    specs: {
      'Chất liệu vỏ': 'Nhung tuyết siêu mềm mịn không rụng lông',
      'Lõi đệm': 'Bông gòn tinh khiết PP 3D đàn hồi cao',
      'Kích thước': 'Đường kính 50cm (phù hợp pet dưới 8kg)',
      'Vệ sinh': 'Có thể giặt máy hoặc giặt tay tiện lợi',
    },
  },
  {
    id: 6,
    name: 'Cần câu mèo đàn hồi gắn lông vũ tự nhiên & chuông',
    price: 60000,
    originalPrice: 90000,
    categoryName: 'Đồ chơi mèo',
    badge: 'Bán chạy',
    badgeType: 'hot',
    rating: 4.8,
    reviewsCount: 52,
    image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=800&auto=format&fit=crop&q=80',
    description: 'Cần câu mèo dây thép dẻo trợ lực đàn hồi cực nhạy, đầu cần gắn chùm lông vũ tự nhiên bắt mắt và chuông kích hoạt bản năng săn mồi, giúp các bé mèo giải tỏa căng thẳng và vận động linh hoạt.',
    specs: {
      'Chiều dài': 'Cần 90cm, dây nối dài 60cm',
      'Chất liệu': 'Sợi carbon dẻo uốn cong 360 độ & lông gà tự nhiên',
      'Trọng lượng': 'Chỉ 45g, thao tác vung nhẹ nhàng',
      'Công dụng': 'Tăng tương tác giữa sen và hoàng thượng',
    },
  },
];

// Hàm định dạng giá tiền VNĐ (vd: 150.000 VNĐ)
export const formatPriceVND = (amount) => {
  return (amount || 0).toLocaleString('vi-VN') + ' VNĐ';
};

export default function ProductList({
  products,
  onViewDetail,
=======
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
main
  onSelectProduct,
  onAddToCart,
}) {
 feature/danhsachsp
  // Ưu tiên hiển thị 6 sản phẩm mẫu chuẩn theo yêu cầu
  const displayProducts = SAMPLE_PRODUCTS;

  // Xử lý khi nhấn nút Xem chi tiết: hỗ trợ cả onViewDetail và onSelectProduct (của App.jsx)
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

 main
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

 feature/danhsachsp
        {/* Grid danh sách 6 sản phẩm */}
        <div
          className="products-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {displayProducts.map((product) => (
            <div
              key={product.id}
              className="product-card"
              style={{
                background: '#ffffff',
                borderRadius: '20px',
                border: '1px solid #f1f5f9',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              {/* Khung ảnh: Ép kích thước khung ảnh height: 200px, object-fit: cover */}
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
                  }}
                />

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
 main

                {/* Badge trạng thái */}
                {product.badge && (
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
                    }}
                  >
                    {product.badge}
                  </div>
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f59e0b', fontWeight: '700' }}>
                    <span>⭐</span>
                    <span>{product.rating}</span>
                    <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>({product.reviewsCount})</span>
                  </div>
                </div>

                {/* Tên sản phẩm */}
                <h3
                  className="product-name"
                  onClick={() => handleDetailClick(product)}
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: '700',
                    color: '#1e293b',
                    marginBottom: '12px',
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

                {/* Giá tiền định dạng VNĐ */}
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
                      color: '#ff6b35',
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

                {/* 2 nút thao tác: "Xem chi tiết" và "Thêm vào giỏ" */}
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
                    onClick={() => onAddToCart && onAddToCart(product)}
                    style={{
                      flex: 1,
                      padding: '10px 8px',
                      fontSize: '0.88rem',
                      borderRadius: '12px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
