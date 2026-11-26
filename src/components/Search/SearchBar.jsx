// src/components/Search/SearchBar.jsx
// Nhiệm vụ: Vân - Phát triển hệ thống tìm kiếm thông minh & lọc nhanh thú cưng

export default function SearchBar({
  searchTerm = '',
  setSearchTerm,
  activeCategory = 'all',
  setActiveCategory,
  priceRange = 'all',
  setPriceRange,
  onSearch,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchTerm);
  };

  const handleClear = () => {
    if (setSearchTerm) setSearchTerm('');
    if (onSearch) onSearch('');
  };

  // Các danh mục/loài thú cưng để lọc nhanh: Chó, Mèo, Phụ kiện, Thức ăn
  const quickCategories = [
    { id: 'all', label: 'Tất cả' },
    { id: 'dog', label: '🐶 Chó' },
    { id: 'cat', label: '🐱 Mèo' },
    { id: 'accessory', label: '🎀 Phụ kiện' },
    { id: 'food', label: '🥣 Thức ăn' },
  ];

  // Khoảng giá lọc nhanh
  const priceOptions = [
    { id: 'all', label: '💰 Mọi mức giá' },
    { id: 'under-1m', label: '< 1 triệu' },
    { id: '1m-5m', label: '1 - 5 triệu' },
    { id: '5m-10m', label: '5 - 10 triệu' },
    { id: 'above-10m', label: '> 10 triệu' },
  ];

  // Từ khóa tìm kiếm gợi ý phổ biến
  const quickKeywords = ['Poodle', 'Mèo Anh', 'Corgi', 'Hạt Royal Canin', 'Cat Tree'];

  return (
    <div className="header-search-box">
      {/* Khung ô tìm kiếm chính */}
      <form className="search-input-wrapper" onSubmit={handleSubmit} role="search">
        {/* Icon kính lúp */}
        <svg
          className="search-icon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>

        {/* Input nhập từ khóa */}
        <input
          type="text"
          className="search-input"
          placeholder="Tìm chó cưng, mèo cưng, phụ kiện, thức ăn..."
          value={searchTerm}
          onChange={(e) => {
            if (setSearchTerm) setSearchTerm(e.target.value);
          }}
          aria-label="Tìm kiếm sản phẩm"
        />

        {/* Nút xóa từ khóa khi đã nhập */}
        {searchTerm && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={handleClear}
            title="Xóa tìm kiếm"
            aria-label="Xóa từ khóa tìm kiếm"
          >
            ✕
          </button>
        )}

        {/* Bộ lọc khoảng giá nhanh tích hợp ngay trên thanh tìm kiếm */}
        {setPriceRange && (
          <div className="search-price-filter-wrap">
            <select
              value={priceRange}
              onChange={(e) => {
                setPriceRange(e.target.value);
                if (onSearch) onSearch(searchTerm);
              }}
              className="search-price-select"
              aria-label="Lọc theo khoảng giá"
              title="Lọc nhanh theo mức giá"
            >
              {priceOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Nút submit Tìm kiếm */}
        <button type="submit" className="search-btn" aria-label="Thực hiện tìm kiếm">
          <span>Tìm</span>
        </button>
      </form>

      {/* Thanh lọc nhanh theo loài / danh mục thú cưng & từ khóa phổ biến */}
      <div className="search-quick-bar">
        {/* Lọc nhanh theo loài/danh mục: Dog, Cat, Accessories */}
        {setActiveCategory && (
          <div className="search-category-chips">
            {quickCategories.map((cat) => {
              const isActive = (activeCategory || 'all') === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat.id);
                    if (onSearch) onSearch(searchTerm);
                  }}
                  className={`search-cat-chip ${isActive ? 'active' : ''}`}
                  title={`Lọc theo danh mục: ${cat.label}`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Gợi ý từ khóa tìm kiếm nhanh */}
        <div className="search-keywords-list">
          <span className="search-keywords-label">Gợi ý:</span>
          {quickKeywords.map((kw, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                if (setSearchTerm) setSearchTerm(kw);
                if (onSearch) onSearch(kw);
              }}
              className="search-keyword-tag"
            >
              {kw}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
