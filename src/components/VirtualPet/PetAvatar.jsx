// src/components/VirtualPet/PetAvatar.jsx
// Nhiệm vụ: Đạt & Vân - Hệ thống Nuôi Thú Cưng Ảo (Virtual Pet Companion)
import React, { useState } from 'react';

export default function PetAvatar({ onAction, petState }) {
  const [animatingAction, setAnimatingAction] = useState(null);

  const handleInteract = (actionType, message) => {
    setAnimatingAction(actionType);
    if (onAction) onAction(actionType);
    setTimeout(() => {
      setAnimatingAction(null);
    }, 1500);
  };

  const currentMood =
    petState.hunger < 30
      ? '😫 Đói bụng'
      : petState.happiness < 40
      ? '🥺 Buồn chán'
      : petState.cleanliness < 30
      ? '🦨 Cần tắm gội'
      : '🥰 Hạnh phúc';

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '24px',
        padding: '28px',
        border: '1px solid #fed7aa',
        boxShadow: '0 10px 30px rgba(255, 107, 53, 0.08)',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#fff7ed', padding: '4px 12px', borderRadius: '20px', color: '#ff6b35', fontSize: '0.82rem', fontWeight: '700', marginBottom: '14px' }}>
        <span>🐾</span> BÉ CƯNG ẢO CỦA BẠN
      </div>

      <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#1e293b', marginBottom: '4px' }}>
        {petState.name || 'Bé Poodle Bon Bon'}
      </h3>
      <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '16px' }}>
        Tâm trạng hiện tại: <strong style={{ color: '#ff6b35' }}>{currentMood}</strong>
      </div>

      {/* Khung avatar thú cưng ảo */}
      <div
        style={{
          width: '180px',
          height: '180px',
          margin: '0 auto 20px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #fed7aa 0%, #ffedd5 70%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '5rem',
          boxShadow: '0 10px 25px rgba(251, 146, 60, 0.25)',
          border: '4px solid #ffffff',
          position: 'relative',
          transition: 'transform 0.3s ease',
          transform: animatingAction ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
        }}
      >
        {petState.type === 'cat' ? '🐱' : '🐶'}

        {animatingAction === 'feed' && (
          <div style={{ position: 'absolute', top: '-10px', right: '0', fontSize: '2rem' }}>🍖</div>
        )}
        {animatingAction === 'play' && (
          <div style={{ position: 'absolute', top: '-10px', right: '0', fontSize: '2rem' }}>🎾</div>
        )}
        {animatingAction === 'bath' && (
          <div style={{ position: 'absolute', top: '-10px', right: '0', fontSize: '2rem' }}>🛁</div>
        )}
      </div>

      {/* 3 Nút tương tác chính */}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button
          className="btn-secondary-cta"
          style={{ padding: '8px 14px', fontSize: '0.85rem' }}
          onClick={() => handleInteract('feed', 'Bé vừa được ăn no nê!')}
        >
          🍖 Cho ăn (+15 EXP)
        </button>

        <button
          className="btn-secondary-cta"
          style={{ padding: '8px 14px', fontSize: '0.85rem' }}
          onClick={() => handleInteract('play', 'Bé rất vui khi được chơi cùng bạn!')}
        >
          🎾 Ném bóng (+20 EXP)
        </button>

        <button
          className="btn-secondary-cta"
          style={{ padding: '8px 14px', fontSize: '0.85rem' }}
          onClick={() => handleInteract('bath', 'Bé cưng đã thơm tho sạch sẽ!')}
        >
          🛁 Tắm rửa (+10 EXP)
        </button>
      </div>
    </div>
  );
}
