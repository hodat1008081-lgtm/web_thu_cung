// src/components/SizeAdvisor/steps/Step4Measurements.jsx
// Bước 4: Nhập số đo cơ thể với hướng dẫn đo chi tiết

import React from 'react';

// Hướng dẫn đo cho từng vị trí
const MEASURE_GUIDES = {
  neck: {
    label: 'Vòng Cổ',
    icon: '📏',
    emoji: '🔵',
    instruction:
      'Dùng thước dây đo quanh phần dưới cổ của thú cưng, ngay phía trên vai. Giữ thước không quá chặt (nên luồn được 1 ngón tay vào giữa).',
    example: 'VD: 28',
    placeholder: 'cm',
    visual: '〰️ Đo quanh cổ',
  },
  chest: {
    label: 'Vòng Ngực',
    icon: '📐',
    emoji: '🔴',
    instruction:
      'Đo quanh phần rộng nhất của lồng ngực, ngay phía sau hai chân trước khi thú cưng đứng tự nhiên. Đây là số đo quan trọng nhất.',
    example: 'VD: 42',
    placeholder: 'cm',
    visual: '〰️ Đo sau chân trước',
  },
  back: {
    label: 'Chiều Dài Lưng',
    icon: '📏',
    emoji: '🟢',
    instruction:
      'Đo từ điểm bắt đầu cổ (ngay sau tai) đến điểm bắt đầu đuôi khi thú cưng đứng tự nhiên. Đừng để bé ngồi khi đo.',
    example: 'VD: 35',
    placeholder: 'cm',
    visual: '↔️ Đo dọc sống lưng',
  },
  pawLength: {
    label: 'Chiều Dài Bàn Chân',
    icon: '🐾',
    emoji: '🟡',
    instruction:
      'Cho thú cưng đặt chân lên tờ giấy, dùng bút đánh dấu điểm đầu và cuối bàn chân, sau đó đo khoảng cách. Đo cả 4 chân và lấy số lớn nhất.',
    example: 'VD: 5.5',
    placeholder: 'cm',
    visual: '⬆️ Đo đầu đến cuối bàn chân',
  },
  pawWidth: {
    label: 'Chiều Rộng Bàn Chân',
    icon: '🐾',
    emoji: '🟠',
    instruction:
      'Tương tự như chiều dài, đo chiều ngang rộng nhất của bàn chân (thường ở phần ngón chân). Chọn số lớn nhất trong 4 bàn chân.',
    example: 'VD: 4.5',
    placeholder: 'cm',
    visual: '↔️ Đo ngang bàn chân',
  },
};

// Các trường cần đo theo loại phụ kiện
const REQUIRED_FIELDS = {
  clothes: ['neck', 'chest', 'back'],
  collar:  ['neck'],
  harness: ['neck', 'chest'],
  shoes:   ['pawLength', 'pawWidth'],
  leash:   [],
};

const LEASH_PURPOSES = [
  { id: 'training', label: '🎯 Huấn luyện', desc: 'Kiểm soát tốt, khoảng cách ngắn' },
  { id: 'daily',    label: '🌅 Đi dạo hàng ngày', desc: 'Vừa đủ, linh hoạt cho mọi địa hình' },
  { id: 'walking',  label: '🌳 Dạo chơi công viên', desc: 'Dài hơn, bé có không gian khám phá' },
  { id: 'outdoor',  label: '🏕️ Ngoài trời rộng', desc: 'Dây tự thu, tự do chạy nhảy' },
];

export default function Step4Measurements({
  accessoryType,
  petType,
  measurements,
  onChange,
  errors,
  leashPurpose,
  onLeashPurposeChange,
}) {
  const requiredFields = REQUIRED_FIELDS[accessoryType] || [];

  // Nếu là dây dắt: hiển thị chọn mục đích
  if (accessoryType === 'leash') {
    return (
      <div>
        <h2 className="sa-card-title">Bước 4: Chọn mục đích sử dụng</h2>
        <p className="sa-card-desc">
          Dây dắt không cần số đo cơ thể. Hãy cho chúng tôi biết bạn thường dùng dây dắt để làm gì.
        </p>

        <div className="sa-leash-options">
          {LEASH_PURPOSES.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`sa-leash-option${leashPurpose === p.id ? ' selected' : ''}`}
              onClick={() => onLeashPurposeChange(p.id)}
            >
              <div className="sa-leash-radio">
                <div className="sa-leash-radio-dot" />
              </div>
              <div>
                <div className="sa-leash-option-label">{p.label}</div>
                <div className="sa-leash-option-desc">{p.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Các loại khác: hiển thị form nhập số đo + hướng dẫn
  const guideItems = requiredFields.map((f) => MEASURE_GUIDES[f]).filter(Boolean);

  return (
    <div>
      <h2 className="sa-card-title">Bước 4: Nhập số đo thực tế</h2>
      <p className="sa-card-desc">
        Dùng thước dây mềm (loại thường dùng may đồ) để đo. Kết quả tư vấn hoàn toàn dựa trên số đo
        thực tế này, không phải chỉ dựa vào cân nặng.
      </p>

      <div className="sa-measure-layout">
        {/* Cột trái: Form nhập */}
        <div>
          {requiredFields.map((field) => {
            const guide = MEASURE_GUIDES[field];
            if (!guide) return null;
            return (
              <div className="sa-form-group" key={field}>
                <label className="sa-label" htmlFor={`measure-${field}`}>
                  <span>{guide.emoji}</span>
                  {guide.label}
                  <span className="sa-label-required">*</span>
                  <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 400, marginLeft: 4 }}>
                    (cm)
                  </span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    id={`measure-${field}`}
                    type="number"
                    className={`sa-input${errors[field] ? ' error' : ''}`}
                    placeholder={`${guide.example} ${guide.placeholder}`}
                    value={measurements[field] || ''}
                    onChange={(e) => onChange(field, e.target.value)}
                    min="1"
                    max="200"
                    step="0.1"
                    style={{ paddingRight: '44px' }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      right: '14px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#94a3b8',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                    }}
                  >
                    cm
                  </span>
                </div>
                {errors[field] && (
                  <div className="sa-error-msg">
                    <span>⚠️</span> {errors[field]}
                  </div>
                )}
              </div>
            );
          })}

          <div
            style={{
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '14px',
              padding: '14px 16px',
              fontSize: '0.83rem',
              color: '#166534',
              lineHeight: '1.5',
              marginTop: '8px',
            }}
          >
            ✅ <strong>Mẹo đo chính xác:</strong> Đo khi thú cưng đứng hoặc nằm thẳng người. Đừng kéo thước
            quá chặt – giữ ở mức chạm da nhẹ. Nên đo lại 2 lần để chắc chắn.
          </div>
        </div>

        {/* Cột phải: Hướng dẫn đo */}
        <div className="sa-measure-guide">
          <div className="sa-guide-title">
            <span>📖</span> Hướng dẫn đo
          </div>
          {guideItems.map((guide, idx) => (
            <div className="sa-guide-item" key={idx}>
              <div className="sa-guide-icon">{guide.icon}</div>
              <div className="sa-guide-text">
                <strong>
                  {guide.emoji} {guide.label}
                </strong>
                <p>{guide.instruction}</p>
                <p style={{ marginTop: '4px', fontStyle: 'italic', color: '#7dd3fc', fontSize: '0.76rem' }}>
                  {guide.visual}
                </p>
              </div>
            </div>
          ))}

          <div
            style={{
              background: 'rgba(255,255,255,0.7)',
              borderRadius: '12px',
              padding: '10px 12px',
              fontSize: '0.78rem',
              color: '#0c4a6e',
              marginTop: '8px',
            }}
          >
            🛒 Dụng cụ cần: thước dây mềm (thước may đồ), tờ giấy và bút (nếu đo bàn chân).
          </div>
        </div>
      </div>
    </div>
  );
}
