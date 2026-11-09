// src/components/Search/SearchBar.jsx
// Nhiệm vụ: Vân - Phát triển hệ thống tìm kiếm thông minh
import React from 'react';

export default function SearchBar({ searchTerm, setSearchTerm, onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchTerm);
  };

  const quickKeywords = ['Poodle', 'Mèo Anh', 'Corgi', 'Hạt Royal Canin', 'Cat Tree'];

  return (
    <div className="header-search-box">
      <form className="search-input-wrapper" onSubmit={handleSubmit}>
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
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>

        <input
          type="text"
          className="search-input"
          placeholder="Tìm chó cưng, mèo cưng, thức ăn, phụ kiện..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {searchTerm && (
          <button
            type="button"
            style={{ color: '#94a3b8', padding: '0 8px', fontSize: '1rem' }}
            onClick={() => setSearchTerm('')}
            title="Xóa tìm kiếm"
          >
            ✕
          </button>
        )}

        <button type="submit" className="search-btn">
          Tìm kiếm
        </button>
      </form>

      {/* Gợi ý từ khóa tìm kiếm nhanh */}
      <div style={{ display: 'flex', gap: '6px', marginTop: '6px', paddingLeft: '8px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Gợi ý:</span>
        {quickKeywords.map((kw, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setSearchTerm(kw);
              if (onSearch) onSearch(kw);
            }}
            style={{
              fontSize: '0.72rem',
              color: '#64748b',
              background: '#f1f5f9',
              borderRadius: '10px',
              padding: '1px 8px',
            }}
          >
            {kw}
          </button>
        ))}
      </div>
    </div>
  );
}
