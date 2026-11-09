// src/components/SizeAdvisor/SizeCalculator.jsx
// Nhiệm vụ: Trâm & San San - Công cụ tính toán size chuồng, quần áo & đệm ngủ cho thú cưng
import React, { useState } from 'react';

export default function SizeCalculator({ onSelectRecommendedCategory }) {
  const [petType, setPetType] = useState('dog');
  const [weight, setWeight] = useState(4.5);
  const [breed, setBreed] = useState('poodle');

  // Tính toán size dựa trên cân nặng
  const calculateResult = () => {
    const w = parseFloat(weight) || 0;
    if (w <= 2.5) {
      return {
        size: 'Size XS (Siêu nhỏ)',
        cageSize: '45cm x 30cm x 35cm',
        harnessSize: 'Vòng ngực 28 - 35cm',
        bedSize: 'Đệm tròn đường kính 40cm',
        backpack: 'Balo phi thuyền mini dưới 3kg',
        advice: 'Bé cưng thuộc size mini, cần chuồng có nan dày để tránh lọt chân và đệm lót thật êm.',
      };
    } else if (w <= 6) {
      return {
        size: 'Size S (Nhỏ)',
        cageSize: '60cm x 42cm x 50cm',
        harnessSize: 'Vòng ngực 36 - 45cm',
        bedSize: 'Đệm êm đường kính 50cm',
        backpack: 'Balo phi thuyền tiêu chuẩn (chịu lực 7kg)',
        advice: 'Kích cỡ phù hợp cho Poodle, Mèo Anh lông ngắn, Phốc sóc. Nên chọn chuồng có khay vệ sinh kéo rời.',
      };
    } else if (w <= 12) {
      return {
        size: 'Size M (Trung bình)',
        cageSize: '75cm x 50cm x 60cm',
        harnessSize: 'Vòng ngực 46 - 60cm',
        bedSize: 'Đệm sofa kích thước 70cm x 55cm',
        backpack: 'Túi kéo du lịch hoặc xe đẩy thú cưng',
        advice: 'Phù hợp cho Corgi, Shiba Inu, Mèo Maine Coon. Không nên dùng balo đeo vai quá lâu tránh đau vai.',
      };
    } else {
      return {
        size: 'Size L / XL (Lớn)',
        cageSize: '90cm - 110cm x 70cm x 85cm (Khung thép sơn tĩnh điện)',
        harnessSize: 'Vòng ngực 65 - 85cm (Dây đai trợ lực ngực)',
        bedSize: 'Đệm nằm nệm mút kích thước 90cm x 75cm',
        backpack: 'Chỉ phù hợp di chuyển bằng lồng hàng không chuyên dụng',
        advice: 'Phù hợp cho Golden Retriever, Husky, Alaska, Labrador. Cần chọn chuồng sắt sơn tĩnh điện dày dặn.',
      };
    }
  };

  const result = calculateResult();

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 36px' }}>
        <div className="section-tagline" style={{ justifyContent: 'center' }}>
          <span>📏</span> Tư Vấn Chính Xác 100%
        </div>
        <h2 className="section-main-heading">
          Công Cụ Tính Size <span>Chuồng, Balo & Phụ Kiện</span>
        </h2>
        <p style={{ color: '#64748b', marginTop: '10px' }}>
          Tránh mua nhầm chuồng quá chật hay quần áo không vừa. Hãy để chuyên gia PetCare Joy tính toán chuẩn xác cho bé!
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
          gridTemplateColumns: '1fr 1.2fr',
          gap: '40px',
        }}
      >
        {/* Cột trái: Nhập thông số */}
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#1e293b', marginBottom: '20px' }}>
            Nhập Thông Tin Bé Cưng
          </h3>

          <div className="form-group">
            <label className="form-label">Loài thú cưng</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                className={`tab-btn ${petType === 'dog' ? 'active' : ''}`}
                style={{ flex: 1 }}
                onClick={() => setPetType('dog')}
              >
                🐶 Chó cưng
              </button>
              <button
                type="button"
                className={`tab-btn ${petType === 'cat' ? 'active' : ''}`}
                style={{ flex: 1 }}
                onClick={() => setPetType('cat')}
              >
                🐱 Mèo cưng
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Cân nặng hiện tại của bé: <strong style={{ color: '#ff6b35' }}>{weight} kg</strong></label>
            <input
              type="range"
              min="0.5"
              max="35"
              step="0.5"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              style={{ width: '100%', accentColor: '#ff6b35', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8' }}>
              <span>0.5 kg (Mới sinh)</span>
              <span>15 kg</span>
              <span>35 kg (Cỡ lớn)</span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Giống loài tham khảo</label>
            <select
              className="form-input"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
            >
              {petType === 'dog' ? (
                <>
                  <option value="poodle">Poodle (Tiny / Toy / Standard)</option>
                  <option value="corgi">Corgi Pembroke</option>
                  <option value="pomeranian">Phốc Sóc (Pomeranian)</option>
                  <option value="golden">Golden Retriever / Labrador</option>
                  <option value="pug">Chó Pug / Bulldog Pháp</option>
                </>
              ) : (
                <>
                  <option value="aln">Mèo Anh Lông Ngắn / Dài</option>
                  <option value="ragdoll">Mèo Ragdoll</option>
                  <option value="munchkin">Mèo Munchkin Chân Ngắn</option>
                  <option value="persian">Mèo Ba Tư</option>
                </>
              )}
            </select>
          </div>

          <div
            style={{
              background: '#f8fafc',
              padding: '16px',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              fontSize: '0.82rem',
              color: '#64748b',
              lineHeight: '1.5',
            }}
          >
            💡 <strong>Mẹo chuyên gia:</strong> Nếu bé cưng đang trong giai đoạn phát triển (dưới 6 tháng tuổi), bạn nên chọn chuồng lớn hơn 1 size để dùng lâu dài.
          </div>
        </div>

        {/* Cột phải: Kết quả tư vấn */}
        <div>
          <div
            style={{
              background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
              borderRadius: '24px',
              padding: '28px',
              border: '1.5px solid #fed7aa',
            }}
          >
            <div style={{ fontSize: '0.85rem', color: '#9a3412', fontWeight: '800', textTransform: 'uppercase' }}>
              KẾT QUẢ ĐỀ XUẤT PHÙ HỢP NHẤT
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#ff6b35', margin: '6px 0 16px' }}>
              {result.size}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              <div style={{ background: '#ffffff', padding: '12px 16px', borderRadius: '12px', display: 'flex', gap: '10px' }}>
                <span style={{ fontSize: '1.3rem' }}>🏠</span>
                <div>
                  <strong style={{ fontSize: '0.9rem', color: '#1e293b' }}>Kích thước chuồng đề xuất:</strong>
                  <div style={{ fontSize: '0.85rem', color: '#ff6b35', fontWeight: '700' }}>{result.cageSize}</div>
                </div>
              </div>

              <div style={{ background: '#ffffff', padding: '12px 16px', borderRadius: '12px', display: 'flex', gap: '10px' }}>
                <span style={{ fontSize: '1.3rem' }}>🦺</span>
                <div>
                  <strong style={{ fontSize: '0.9rem', color: '#1e293b' }}>Vòng đai dắt & áo:</strong>
                  <div style={{ fontSize: '0.85rem', color: '#475569' }}>{result.harnessSize}</div>
                </div>
              </div>

              <div style={{ background: '#ffffff', padding: '12px 16px', borderRadius: '12px', display: 'flex', gap: '10px' }}>
                <span style={{ fontSize: '1.3rem' }}>🛏️</span>
                <div>
                  <strong style={{ fontSize: '0.9rem', color: '#1e293b' }}>Đệm nằm ngủ lý tưởng:</strong>
                  <div style={{ fontSize: '0.85rem', color: '#475569' }}>{result.bedSize}</div>
                </div>
              </div>

              <div style={{ background: '#ffffff', padding: '12px 16px', borderRadius: '12px', display: 'flex', gap: '10px' }}>
                <span style={{ fontSize: '1.3rem' }}>🎒</span>
                <div>
                  <strong style={{ fontSize: '0.9rem', color: '#1e293b' }}>Dụng cụ di chuyển:</strong>
                  <div style={{ fontSize: '0.85rem', color: '#475569' }}>{result.backpack}</div>
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#9a3412', fontStyle: 'italic', marginBottom: '20px' }}>
              {result.advice}
            </p>

            {onSelectRecommendedCategory && (
              <button
                className="submit-btn-full"
                onClick={() => onSelectRecommendedCategory('accessory')}
                style={{ margin: 0 }}
              >
                Xem Các Mẫu Chuồng & Phụ Kiện Phù Hợp →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
