// src/components/SizeAdvisor/steps/Step3Accessory.jsx
// Bước 3: Chọn loại phụ kiện cần tư vấn size

import React from 'react';
import { ACCESSORY_LABELS } from '../data/sizeCharts';

const ACCESSORIES = [
  { id: 'clothes', emoji: '👗', label: 'Quần Áo', desc: 'Áo, váy, bộ đồ cho thú cưng' },
  { id: 'collar',  emoji: '🏷️', label: 'Vòng Cổ', desc: 'Vòng cổ, dây đeo tag' },
  { id: 'harness', emoji: '🦺', label: 'Yếm Ngực', desc: 'Dây đeo ngực, harness' },
  { id: 'shoes',   emoji: '👟', label: 'Giày', desc: 'Giày bảo hộ chân thú cưng', dogOnly: true },
  { id: 'leash',   emoji: '🔗', label: 'Dây Dắt', desc: 'Dây dắt khi đi dạo, huấn luyện' },
];

export default function Step3Accessory({ petType, accessoryType, onSelect }) {
  const available = ACCESSORIES.filter((a) => !(a.dogOnly && petType === 'cat'));

  return (
    <div>
      <h2 className="sa-card-title">Bước 3: Chọn loại phụ kiện</h2>
      <p className="sa-card-desc">
        Mỗi loại phụ kiện có cách đo và bảng kích thước riêng. Hãy chọn loại bạn muốn tư vấn.
      </p>

      <div className="sa-accessory-grid">
        {available.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`sa-accessory-card${accessoryType === item.id ? ' selected' : ''}`}
            onClick={() => onSelect(item.id)}
            aria-pressed={accessoryType === item.id}
          >
            <div className="sa-accessory-check">✓</div>
            <div className="sa-accessory-icon">{item.emoji}</div>
            <div>
              <div className="sa-accessory-label">{item.label}</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>{item.desc}</div>
            </div>
          </button>
        ))}
      </div>

      {accessoryType && (
        <div
          style={{
            marginTop: '20px',
            padding: '14px 18px',
            background: '#f0f9ff',
            borderRadius: '14px',
            border: '1px solid #bae6fd',
            fontSize: '0.88rem',
            color: '#0369a1',
            lineHeight: '1.5',
          }}
        >
          <strong>ℹ️ Về {ACCESSORY_LABELS[accessoryType]?.label || accessoryType}:</strong>{' '}
          {accessoryType === 'clothes' &&
            'Cần đo vòng cổ, vòng ngực và chiều dài lưng. Đây là 3 số đo quan trọng nhất cho quần áo thú cưng.'}
          {accessoryType === 'collar' &&
            'Chỉ cần đo vòng cổ. Lưu ý đo đủ chặt tay không lọt qua nhưng vẫn đủ thở (nên thêm 2cm so với số đo).'}
          {accessoryType === 'harness' &&
            'Cần đo vòng cổ và vòng ngực. Yếm đeo ngực tốt hơn vòng cổ vì phân tán lực kéo lên toàn thân.'}
          {accessoryType === 'shoes' &&
            'Cần đo chiều dài và chiều rộng bàn chân. Đo cả 4 chân vì kích thước có thể khác nhau.'}
          {accessoryType === 'leash' &&
            'Không cần đo cơ thể. Chỉ cần cho biết mục đích sử dụng để tư vấn chiều dài dây phù hợp.'}
        </div>
      )}
    </div>
  );
}
