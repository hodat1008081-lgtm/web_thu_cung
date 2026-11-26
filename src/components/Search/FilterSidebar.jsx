// src/components/Search/FilterSidebar.jsx
// Nhiệm vụ: Vân - Bộ lọc nâng cao đa tiêu chí cho thú cưng & sản phẩm

export default function FilterSidebar({
  selectedCategory,
  activeCategory,
  setSelectedCategory,
  setActiveCategory,
  priceRange = 'all',
  setPriceRange,
  sortBy = 'default',
  setSortBy,
  searchTerm = '',
  setSearchTerm,
  totalResults,
  onResetFilters,
}) {
  // Đồng bộ props linh hoạt
  const currentCategory = selectedCategory || activeCategory || 'all';
  const handleCategoryChange = (val) => {
    if (setSelectedCategory) setSelectedCategory(val);
    if (setActiveCategory) setActiveCategory(val);
  };

  // Danh mục sản phẩm / Loài thú cưng
  const categories = [
    { id: 'all', label: 'Tất cả thú cưng & phụ kiện', icon: '🐾', countLabel: 'Toàn bộ' },
    { id: 'dog', label: 'Chó cảnh thuần chủng (Dog)', icon: '🐶', countLabel: 'Poodle, Corgi, Golden' },
    { id: 'cat', label: 'Mèo cảnh quý tộc (Cat)', icon: '🐱', countLabel: 'Anh lông ngắn, Ragdoll, Munchkin' },
    { id: 'food', label: 'Thức ăn & Dinh dưỡng', icon: '🥣', countLabel: 'Hạt Royal Canin, Pate' },
    { id: 'accessory', label: 'Phụ kiện & Đồ chơi (Accessories)', icon: '🎀', countLabel: 'Cat Tree, Dây dắt, Đồ cào' },
  ];

  // Khoảng giá lọc sản phẩm
  const priceRanges = [
    { id: 'all', label: 'Mọi mức giá', sub: 'Tất cả các sản phẩm' },
    { id: 'under-1m', label: 'Dưới 1 triệu', sub: 'Dưới 1.000.000₫' },
    { id: '1m-5m', label: '1 triệu - 5 triệu', sub: '1.000.000₫ đến 5.000.000₫' },
    { id: '5m-10m', label: '5 triệu - 10 triệu', sub: '5.000.000₫ đến 10.000.000₫' },
    { id: 'above-10m', label: 'Trên 10 triệu', sub: 'Từ 10.000.000₫ trở lên' },
  ];

  // Các tùy chọn sắp xếp
  const sortOptions = [
    { id: 'default', label: '⚡ Nổi bật nhất (Mặc định)' },
    { id: 'price-asc', label: '💵 Giá: Thấp đến Cao' },
    { id: 'price-desc', label: '💎 Giá: Cao đến Thấp' },
    { id: 'rating-desc', label: '⭐ Đánh giá cao nhất' },
  ];

  // Kiểm tra xem có bộ lọc nào đang hoạt động hay không
  const isFiltered =
    currentCategory !== 'all' ||
    priceRange !== 'all' ||
    sortBy !== 'default' ||
    Boolean(searchTerm && searchTerm.trim());

  // Đếm số lượng bộ lọc đang kích hoạt
  const activeCount =
    (currentCategory !== 'all' ? 1 : 0) +
    (priceRange !== 'all' ? 1 : 0) +
    (sortBy !== 'default' ? 1 : 0) +
    (searchTerm && searchTerm.trim() ? 1 : 0);

  const handleReset = () => {
    if (onResetFilters) {
      onResetFilters();
    } else {
      handleCategoryChange('all');
      if (setPriceRange) setPriceRange('all');
      if (setSortBy) setSortBy('default');
      if (setSearchTerm) setSearchTerm('');
    }
  };

  return (
    <aside
      className="filter-sidebar bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-6"
      aria-label="Bộ lọc tìm kiếm sản phẩm"
    >
      {/* Header bộ lọc */}
      <div className="filter-header flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center font-bold text-sm">
            ⚙️
          </div>
          <div>
            <h3 className="font-extrabold text-slate-800 text-base leading-tight">
              Bộ Lọc Nâng Cao
            </h3>
            <span className="text-xs text-slate-400">
              {typeof totalResults === 'number'
                ? `Có ${totalResults} kết quả phù hợp`
                : 'Tìm kiếm chính xác theo nhu cầu'}
            </span>
          </div>
        </div>

        {/* Nút đặt lại nhanh khi có filter active */}
        {isFiltered && (
          <button
            type="button"
            onClick={handleReset}
            className="filter-reset-btn text-xs font-semibold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-2.5 py-1 rounded-full transition-colors"
            title="Đặt lại toàn bộ tiêu chí lọc về mặc định"
          >
            Đặt lại {activeCount > 0 && `(${activeCount})`}
          </button>
        )}
      </div>

      {/* Hiển thị từ khóa tìm kiếm hiện tại nếu có */}
      {searchTerm && searchTerm.trim() && (
        <div className="filter-active-search bg-orange-50/60 border border-orange-100 rounded-xl p-3 flex items-center justify-between">
          <div className="text-xs text-slate-700">
            <span className="text-slate-400">Từ khóa:</span>{' '}
            <strong className="text-orange-600 font-bold">"{searchTerm}"</strong>
          </div>
          {setSearchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="text-xs text-slate-400 hover:text-rose-500 p-1"
              title="Xóa từ khóa tìm kiếm"
            >
              ✕
            </button>
          )}
        </div>
      )}

      {/* 1. Lọc theo danh mục / Loài thú cưng */}
      <div className="filter-section">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <span>🏷️</span> Danh mục / Loài
          </h4>
          {currentCategory !== 'all' && (
            <button
              type="button"
              onClick={() => handleCategoryChange('all')}
              className="text-[11px] text-orange-500 hover:underline"
            >
              Xem tất cả
            </button>
          )}
        </div>

        <div className="filter-options-list flex flex-col gap-1.5">
          {categories.map((cat) => {
            const isSelected = currentCategory === cat.id;
            return (
              <label
                key={cat.id}
                className={`filter-category-item flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-orange-50/70 border-orange-200 text-orange-600 font-bold shadow-xs'
                    : 'bg-slate-50/50 hover:bg-slate-100 border-transparent text-slate-600 hover:text-slate-900 font-medium'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="category-filter"
                    value={cat.id}
                    checked={isSelected}
                    onChange={() => handleCategoryChange(cat.id)}
                    className="accent-orange-500 w-4 h-4 cursor-pointer"
                  />
                  <span className="text-base">{cat.icon}</span>
                  <span className="text-xs leading-snug">{cat.label}</span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* 2. Lọc theo khoảng giá */}
      <div className="filter-section">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <span>💰</span> Khoảng giá
          </h4>
          {priceRange !== 'all' && setPriceRange && (
            <button
              type="button"
              onClick={() => setPriceRange('all')}
              className="text-[11px] text-orange-500 hover:underline"
            >
              Mọi mức giá
            </button>
          )}
        </div>

        <div className="filter-options-list flex flex-col gap-1.5">
          {priceRanges.map((pr) => {
            const isSelected = priceRange === pr.id;
            return (
              <label
                key={pr.id}
                className={`filter-price-item flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-orange-50/70 border-orange-200 text-orange-600 font-bold shadow-xs'
                    : 'bg-slate-50/50 hover:bg-slate-100 border-transparent text-slate-600 hover:text-slate-900 font-medium'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="price-filter"
                    value={pr.id}
                    checked={isSelected}
                    onChange={() => setPriceRange && setPriceRange(pr.id)}
                    className="accent-orange-500 w-4 h-4 cursor-pointer"
                  />
                  <div>
                    <div className="text-xs">{pr.label}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{pr.sub}</div>
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* 3. Tùy chọn sắp xếp */}
      {setSortBy && (
        <div className="filter-section">
          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-2.5">
            <span>🔄</span> Sắp xếp hiển thị
          </h4>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-sort-select w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-orange-500 focus:bg-white transition-all cursor-pointer"
            aria-label="Sắp xếp danh sách sản phẩm"
          >
            {sortOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Nút Xóa tất cả bộ lọc */}
      {isFiltered && (
        <button
          type="button"
          onClick={handleReset}
          className="w-full py-2.5 px-4 rounded-xl border border-dashed border-orange-300 text-orange-600 hover:bg-orange-500 hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-2"
        >
          <span>✕</span> Xóa tất cả bộ lọc & tìm kiếm
        </button>
      )}

      {/* Hộp cam kết chất lượng của PetCare Joy */}
      <div className="filter-guarantee-box bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 text-[11px] text-amber-800 leading-relaxed">
        <p className="font-bold mb-1">🐾 Cam Kết PetCare Joy:</p>
        <p className="text-amber-700">
          100% thú cưng thuần chủng, được tiêm phòng vắc xin và bảo hành sức khỏe Care/Parvo 30 ngày.
        </p>
      </div>
    </aside>
  );
}
