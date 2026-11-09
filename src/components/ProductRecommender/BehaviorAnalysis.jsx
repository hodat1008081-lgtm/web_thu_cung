// src/components/ProductRecommender/BehaviorAnalysis.jsx
// Nhiệm vụ: Hiển & Vương - Hệ thống phân tích hành vi & Đề xuất sản phẩm thông minh
import React, { useState } from 'react';
import { formatCurrency } from '../../data/products';

export default function BehaviorAnalysis({ onAddComboToCart }) {
  const [selectedIssue, setSelectedIssue] = useState('shedding');

  const issuesData = {
    shedding: {
      title: 'Bé rụng lông nhiều, da bị khô xơ hoặc gàu ngứa',
      cause: 'Thiếu hụt Omega 3-6, thiếu kẽm hoặc do dùng sữa tắm người có độ pH không phù hợp.',
      solution: 'Bổ sung dầu cá hồi nguyên chất, đổi sang sữa tắm chuyên dụng dưỡng lông mượt mà và chải lông hàng ngày.',
      comboName: 'Combo Da Lông Khỏe Mạnh (Dầu cá hồi Alaska + Lược chải lông Pet)',
      comboPrice: 380000,
      comboOriginalPrice: 460000,
      items: [
        'Dầu cá hồi ép lạnh Pure Salmon Oil 250ml',
        'Lược chải lông bấm nhả nút thông minh',
        'Sữa tắm dưỡng ẩm thảo mộc PetCare',
      ],
      icon: '✨',
    },
    anorexia: {
      title: 'Bé biếng ăn, lười gặm hạt, hệ tiêu hóa kém',
      cause: 'Đổi hạt đột ngột, thiếu men tiêu hóa đường ruột hoặc giun sán chưa được đào thải.',
      solution: 'Pha men vi sinh hỗ trợ tiêu hóa vào hạt, bổ sung gel dinh dưỡng hoặc pate trộn kích thích vị giác.',
      comboName: 'Combo Kích Thích Ăn Ngon & Hồi Phục Thể Trạng',
      comboPrice: 450000,
      comboOriginalPrice: 520000,
      items: [
        'Gel dinh dưỡng Nourse 120g phục hồi sức khỏe',
        'Men vi sinh Probio Pet hỗ trợ đường ruột',
        'Hạt Royal Canin mini túi 800g',
      ],
      icon: '🥣',
    },
    chewing: {
      title: 'Bé cắn xé sofa, giày dép, hay gặm đồ đạc trong nhà',
      cause: 'Bé đang trong thời kỳ thay răng sữa ngứa nướu (3 - 7 tháng tuổi) hoặc thừa năng lượng bị stress.',
      solution: 'Cung cấp đồ chơi gặm silicon dẻo, xương canxi gặm sạch răng và dành 30 phút dắt bé đi dạo mỗi ngày.',
      comboName: 'Combo Bảo Vệ Đồ Đạc & Mài Răng Cho Cún',
      comboPrice: 260000,
      comboOriginalPrice: 320000,
      items: [
        'Xương gặm canxi sạch mảng bám vị bò',
        'Bóng gai đồ chơi silicon phát tiếng kêu',
        'Dây thừng kéo co thể thao cho pet',
      ],
      icon: '🎾',
    },
    toilet: {
      title: 'Bé đi vệ sinh bừa bãi, không đúng khay hoặc thau cát',
      cause: 'Chưa được huấn luyện phản xạ có điều kiện hoặc khay cát bị bẩn, đặt sai vị trí.',
      solution: 'Dùng xịt định vị hướng dẫn đi vệ sinh đúng chỗ, kết hợp khay vệ sinh thành cao chống văng.',
      comboName: 'Combo Huấn Luyện Vệ Sinh Chuẩn Ý Chủ',
      comboPrice: 320000,
      comboOriginalPrice: 390000,
      items: [
        'Chai xịt hướng dẫn đi vệ sinh đúng chỗ 100ml',
        'Khay vệ sinh chống tràn có cọc đánh dấu',
        'Xịt khử mùi tiêu diệt vi khuẩn chuồng',
      ],
      icon: '🚽',
    },
  };

  const currentAnalysis = issuesData[selectedIssue];

  const handleAddCombo = () => {
    if (onAddComboToCart) {
      onAddComboToCart({
        id: Date.now(),
        name: currentAnalysis.comboName,
        price: currentAnalysis.comboPrice,
        image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&auto=format&fit=crop&q=80',
        quantity: 1,
      });
    }
  };

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 36px' }}>
        <div className="section-tagline" style={{ justifyContent: 'center' }}>
          <span>💡</span> AI Recommender Dành Riêng Cho Pet
        </div>
        <h2 className="section-main-heading">
          Phân Tích Hành Vi & <span>Đề Xuất Sản Phẩm</span>
        </h2>
        <p style={{ color: '#64748b', marginTop: '10px' }}>
          Chọn vấn đề bé cưng nhà bạn đang gặp phải, thuật toán sẽ phân tích nguyên nhân và đưa ra giải pháp chăm sóc tốt nhất.
        </p>
      </div>

      <div
        style={{
          background: '#ffffff',
          borderRadius: '28px',
          padding: '36px',
          border: '1px solid #f1f5f9',
          boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
          display: 'grid',
          gridTemplateColumns: '1fr 1.3fr',
          gap: '40px',
        }}
      >
        {/* Cột trái: Chọn triệu chứng */}
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#1e293b', marginBottom: '18px' }}>
            Bé cưng đang gặp tình trạng nào?
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div
              onClick={() => setSelectedIssue('shedding')}
              style={{
                padding: '16px',
                borderRadius: '16px',
                border: `2px solid ${selectedIssue === 'shedding' ? '#ff6b35' : '#e2e8f0'}`,
                background: selectedIssue === 'shedding' ? '#fff9f6' : '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span style={{ fontSize: '1.6rem' }}>✨</span>
              <div>
                <strong style={{ color: '#1e293b', display: 'block', fontSize: '0.95rem' }}>
                  Rụng lông, gàu ngứa da
                </strong>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Lông xơ xác, rụng từng mảng</span>
              </div>
            </div>

            <div
              onClick={() => setSelectedIssue('anorexia')}
              style={{
                padding: '16px',
                borderRadius: '16px',
                border: `2px solid ${selectedIssue === 'anorexia' ? '#ff6b35' : '#e2e8f0'}`,
                background: selectedIssue === 'anorexia' ? '#fff9f6' : '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span style={{ fontSize: '1.6rem' }}>🥣</span>
              <div>
                <strong style={{ color: '#1e293b', display: 'block', fontSize: '0.95rem' }}>
                  Biếng ăn, gầy yếu
                </strong>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Bỏ bữa, ăn hạt chậm, bụng sôi</span>
              </div>
            </div>

            <div
              onClick={() => setSelectedIssue('chewing')}
              style={{
                padding: '16px',
                borderRadius: '16px',
                border: `2px solid ${selectedIssue === 'chewing' ? '#ff6b35' : '#e2e8f0'}`,
                background: selectedIssue === 'chewing' ? '#fff9f6' : '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span style={{ fontSize: '1.6rem' }}>🎾</span>
              <div>
                <strong style={{ color: '#1e293b', display: 'block', fontSize: '0.95rem' }}>
                  Cắn phá đồ đạc, ngứa răng
                </strong>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Nhai giày dép, cắn góc bàn ghế</span>
              </div>
            </div>

            <div
              onClick={() => setSelectedIssue('toilet')}
              style={{
                padding: '16px',
                borderRadius: '16px',
                border: `2px solid ${selectedIssue === 'toilet' ? '#ff6b35' : '#e2e8f0'}`,
                background: selectedIssue === 'toilet' ? '#fff9f6' : '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span style={{ fontSize: '1.6rem' }}>🚽</span>
              <div>
                <strong style={{ color: '#1e293b', display: 'block', fontSize: '0.95rem' }}>
                  Đi vệ sinh sai chỗ
                </strong>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Không chịu vào khay cát, đái bậy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cột phải: Phân tích & Combo giải pháp */}
        <div>
          <div
            style={{
              background: '#f8fafc',
              borderRadius: '24px',
              padding: '28px',
              border: '1px solid #e2e8f0',
              marginBottom: '20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <span style={{ fontSize: '1.8rem' }}>{currentAnalysis.icon}</span>
              <h4 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b' }}>
                {currentAnalysis.title}
              </h4>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <span style={{ fontSize: '0.82rem', color: '#94a3b8', display: 'block' }}>Nguyên nhân tiềm ẩn:</span>
              <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.5' }}>
                {currentAnalysis.cause}
              </p>
            </div>

            <div>
              <span style={{ fontSize: '0.82rem', color: '#94a3b8', display: 'block' }}>Lời khuyên từ bác sĩ thú y:</span>
              <p style={{ fontSize: '0.9rem', color: '#15803d', fontWeight: '600', lineHeight: '1.5' }}>
                {currentAnalysis.solution}
              </p>
            </div>
          </div>

          {/* Combo sản phẩm đề xuất */}
          <div
            style={{
              background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
              borderRadius: '24px',
              padding: '24px',
              border: '1.5px solid #fed7aa',
            }}
          >
            <div style={{ fontSize: '0.8rem', color: '#9a3412', fontWeight: '800', textTransform: 'uppercase' }}>
              COMBO ĐỀ XUẤT ĐẶC TRỊ
            </div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#1e293b', margin: '4px 0 10px' }}>
              {currentAnalysis.comboName}
            </h4>

            <ul style={{ paddingLeft: '20px', fontSize: '0.85rem', color: '#475569', lineHeight: '1.7', marginBottom: '16px' }}>
              {currentAnalysis.items.map((it, idx) => (
                <li key={idx}>{it}</li>
              ))}
            </ul>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '1.3rem', fontWeight: '800', color: '#ff6b35' }}>
                  {formatCurrency(currentAnalysis.comboPrice)}
                </span>
                <span style={{ fontSize: '0.85rem', color: '#94a3b8', textDecoration: 'line-through', marginLeft: '8px' }}>
                  {formatCurrency(currentAnalysis.comboOriginalPrice)}
                </span>
              </div>

              <button
                type="button"
                className="add-cart-btn"
                onClick={handleAddCombo}
              >
                🛒 Thêm Combo Vào Giỏ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
