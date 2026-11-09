// src/components/Search/FilterSidebar.jsx
// Nhiệm vụ: Vân - Bộ lọc nâng cao theo tiêu chí thú cưng & giá cả
import React from 'react';

export default function FilterSidebar({
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy,
  onResetFilters,
}) {
  const categories = [
    { id: 'all', label: 'Tất cả thú cưng & phụ kiện' },
    { id: 'dog', label: '🐶 Chó cảnh thuần chủng' },
    { id: 'cat', label: '🐱 Mèo cảnh quý tộc' },
    { id: 'food', label: '🥣 Thức ăn & Dinh dưỡng' },
    { id: 'accessory', label: '🎀 Phụ kiện & Đồ chơi' },
  ];

  const priceRanges = [
    { id: 'all', label: 'Mọi mức giá' },
    { id: 'under-1m', label: 'Dưới 1 triệu' },
    { id: '1m-5m', label: '1 triệu - 5 triệu' },
    { id: '5m-10m', label: '5 triệu - 10 triệu' },
    { id: 'above-10m', label: 'Trên 10 triệu' },
  ];

  return (
    <aside
      style={{
        background: '#ffffff',
        borderRadius: '20px',
        padding: '24px',
        border: '1px solid #f1f5f9',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#1e293b' }}>
          🔍 Bộ Lọc Nâng Cao
        </h3>
        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            style={{ fontSize: '0.8rem', color: '#ff6b35', fontWeight: '600' }}
          >
            Đặt lại
          </button>
        )}
      </div>

      {/* Sắp xếp */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '8px' }}>
          Sắp xếp theo:
        </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="form-input"
          style={{ padding: '8px 12px', fontSize: '0.88rem' }}
        >
          <option value="default">Mặc định (Nổi bật nhất)</option>
          <option value="price-asc">Giá: Thấp đến Cao</option>
          <option value="price-desc">Giá: Cao đến Thấp</option>
          <option value="rating-desc">Đánh giá cao nhất</option>
        </select>
      </div>

      {/* Lọc danh mục */}
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#475569', marginBottom: '10px' }}>
          Danh mục sản phẩm
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {categories.map((cat) => (
            <label
              key={cat.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.88rem',
                color: selectedCategory === cat.id ? '#ff6b35' : '#64748b',
                fontWeight: selectedCategory === cat.id ? '700' : '500',
                cursor: 'pointer',
              }}
            >
              <input
                type="radio"
                name="category"
                checked={selectedCategory === cat.id}
                onChange={() => setSelectedCategory(cat.id)}
                style={{ accentColor: '#ff6b35' }}
              />
              {cat.label}
            </label>
          ))}
        </div>
      </div>

      {/* Lọc theo khoảng giá */}
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#475569', marginBottom: '10px' }}>
          Khoảng giá
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {priceRanges.map((pr) => (
            <label
              key={pr.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.88rem',
                color: priceRange === pr.id ? '#ff6b35' : '#64748b',
                fontWeight: priceRange === pr.id ? '700' : '500',
                cursor: 'pointer',
              }}
            >
              <input
                type="radio"
                name="priceRange"
                checked={priceRange === pr.id}
                onChange={() => setPriceRange(pr.id)}
                style={{ accentColor: '#ff6b35' }}
              />
              {pr.label}
            </label>
          ))}
        </div>
      </div>

      {/* Cam kết */}
      <div
        style={{
          background: '#fff9e6',
          padding: '12px',
          borderRadius: '12px',
          border: '1px dashed #ffd8cc',
          fontSize: '0.78rem',
          color: '#c2410c',
          lineHeight: '1.4',
        }}
      >
        🐾 <strong>Cam kết PetCare Joy:</strong> 100% thú cưng đã được xét nghiệm Parvo & Care âm tính trước khi xuất chuồng!
      </div>
    </aside>
  );
}
