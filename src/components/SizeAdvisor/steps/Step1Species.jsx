// src/components/SizeAdvisor/steps/Step1Species.jsx
// Bước 1: Chọn loài thú cưng (chó / mèo)

import React from 'react';

export default function Step1Species({ petType, onSelect }) {
  const species = [
    {
      id: 'dog',
      emoji: '🐶',
      name: 'Chó cưng',
      sub: 'Dogs',
      desc: 'Mọi giống chó từ Toy Poodle đến Golden Retriever',
    },
    {
      id: 'cat',
      emoji: '🐱',
      name: 'Mèo cưng',
      sub: 'Cats',
      desc: 'Mèo Anh, Ragdoll, Maine Coon và tất cả giống mèo',
    },
  ];

  return (
    <div>
      <h2 className="sa-card-title">Bước 1: Thú cưng của bạn là?</h2>
      <p className="sa-card-desc">
        Chọn loài để hệ thống sử dụng bảng kích thước phù hợp cho từng loại thú cưng.
      </p>

      <div className="sa-species-grid">
        {species.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`sa-species-card${petType === s.id ? ' selected' : ''}`}
            onClick={() => onSelect(s.id)}
            aria-pressed={petType === s.id}
          >
            <div className="sa-species-check">✓</div>
            <div className="sa-species-emoji">{s.emoji}</div>
            <div>
              <div className="sa-species-name">{s.name}</div>
              <div className="sa-species-sub">{s.sub}</div>
            </div>
          </button>
        ))}
      </div>

      {petType && (
        <p
          style={{
            marginTop: '20px',
            textAlign: 'center',
            fontSize: '0.9rem',
            color: '#64748b',
            padding: '12px',
            background: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
          }}
        >
          {petType === 'dog'
            ? '🐾 Tuyệt vời! Hệ thống sẽ dùng bảng size dành riêng cho các bé chó cưng.'
            : '🐾 Tuyệt vời! Hệ thống sẽ dùng bảng size dành riêng cho các bé mèo cưng.'}
        </p>
      )}
    </div>
  );
}
