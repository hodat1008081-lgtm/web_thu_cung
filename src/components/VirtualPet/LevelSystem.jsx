// src/components/VirtualPet/LevelSystem.jsx
// Nhiệm vụ: Đạt & Vân - Hệ thống cấp độ & Đổi quà ưu đãi thật
import React from 'react';

export default function LevelSystem({ petState, onClaimVoucher }) {
  const maxExpForNextLevel = petState.level * 100;
  const progressPercent = Math.min(100, Math.round((petState.exp / maxExpForNextLevel) * 100));

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '24px',
        padding: '28px',
        border: '1px solid #f1f5f9',
        boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <div>
          <span style={{ fontSize: '0.85rem', color: '#ff6b35', fontWeight: '800' }}>
            CẤP ĐỘ {petState.level}
          </span>
          <h4 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b' }}>
            {petState.title || 'Cún Con Tinh Nghịch'}
          </h4>
        </div>

        <div
          style={{
            background: '#fef3c7',
            color: '#b45309',
            padding: '6px 14px',
            borderRadius: '20px',
            fontWeight: '700',
            fontSize: '0.85rem',
          }}
        >
          ⭐ {petState.points || 150} Điểm Thưởng
        </div>
      </div>

      {/* Thanh kinh nghiệm EXP */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748b', marginBottom: '6px' }}>
          <span>Kinh nghiệm thăng cấp:</span>
          <strong>
            {petState.exp} / {maxExpForNextLevel} EXP ({progressPercent}%)
          </strong>
        </div>
        <div style={{ width: '100%', height: '10px', background: '#f1f5f9', borderRadius: '10px', overflow: 'hidden' }}>
          <div
            style={{
              width: `${progressPercent}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #ff6b35, #ffb703)',
              borderRadius: '10px',
              transition: 'width 0.4s ease',
            }}
          ></div>
        </div>
      </div>

      {/* 3 Chỉ số sức khỏe */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '24px' }}>
        <div style={{ background: '#fff7ed', padding: '10px', borderRadius: '14px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: '#9a3412', fontWeight: '600' }}>Độ no</div>
          <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ff6b35' }}>{petState.hunger}%</div>
        </div>
        <div style={{ background: '#ecfdf5', padding: '10px', borderRadius: '14px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: '#065f46', fontWeight: '600' }}>Hạnh phúc</div>
          <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#10b981' }}>{petState.happiness}%</div>
        </div>
        <div style={{ background: '#eff6ff', padding: '10px', borderRadius: '14px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: '#1e40af', fontWeight: '600' }}>Sạch sẽ</div>
          <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#3b82f6' }}>{petState.cleanliness}%</div>
        </div>
      </div>

      {/* Đổi điểm nhận Voucher thật */}
      <div
        style={{
          background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
          padding: '16px',
          borderRadius: '16px',
          border: '1px dashed #fed7aa',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: '700', color: '#9a3412', fontSize: '0.92rem' }}>
              🎁 Đổi Điểm Nhận Voucher 50.000₫
            </div>
            <div style={{ fontSize: '0.75rem', color: '#b45309' }}>
              Cần 100 Điểm Thưởng • Áp dụng cho mọi đơn hàng phụ kiện
            </div>
          </div>
          <button
            type="button"
            className="search-btn"
            style={{ padding: '6px 14px', fontSize: '0.8rem' }}
            onClick={() => onClaimVoucher && onClaimVoucher(50000)}
          >
            Đổi Ngay
          </button>
        </div>
      </div>
    </div>
  );
}
