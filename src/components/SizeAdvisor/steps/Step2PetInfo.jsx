// src/components/SizeAdvisor/steps/Step2PetInfo.jsx
// Bước 2: Nhập thông tin thú cưng (tên, giống, cân nặng, tuổi)

import React from 'react';
import { DOG_BREEDS, CAT_BREEDS } from '../data/sizeCharts';

export default function Step2PetInfo({ petType, petInfo, onChange, errors }) {
  const breeds = petType === 'dog' ? DOG_BREEDS : CAT_BREEDS;
  const isCustomBreed =
    petInfo.breed === 'Khác (Nhập tên giống)' ||
    (petInfo.breed && !breeds.includes(petInfo.breed) && petInfo.breed !== '');

  const handleBreedChange = (e) => {
    const val = e.target.value;
    if (val === 'Khác (Nhập tên giống)') {
      onChange('breed', val);
      onChange('customBreed', '');
    } else {
      onChange('breed', val);
      onChange('customBreed', '');
    }
  };

  const ageOptions = [
    { value: '', label: '-- Chọn độ tuổi --' },
    { value: 'under3m', label: 'Dưới 3 tháng (Sơ sinh)' },
    { value: '3m-6m', label: '3 – 6 tháng (Con non)' },
    { value: '6m-1y', label: '6 tháng – 1 năm' },
    { value: '1y-3y', label: '1 – 3 tuổi (Trưởng thành)' },
    { value: '3y-7y', label: '3 – 7 tuổi (Trung niên)' },
    { value: 'over7y', label: 'Trên 7 tuổi (Cao tuổi)' },
  ];

  return (
    <div>
      <h2 className="sa-card-title">Bước 2: Thông tin bé cưng</h2>
      <p className="sa-card-desc">
        Thông tin cân nặng và giống giúp hệ thống tham khảo thêm, nhưng kết quả tư vấn sẽ được xác định chính
        xác bằng số đo thực tế ở bước tiếp theo.
      </p>

      {/* Tên thú cưng */}
      <div className="sa-form-group">
        <label className="sa-label" htmlFor="pet-name">
          <span>🏷️</span>
          Tên bé cưng
          <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 400 }}>(không bắt buộc)</span>
        </label>
        <input
          id="pet-name"
          type="text"
          className="sa-input"
          placeholder={petType === 'dog' ? 'VD: Bon Bon, Lucky, Mochi...' : 'VD: Kitty, Miso, Luna...'}
          value={petInfo.name || ''}
          onChange={(e) => onChange('name', e.target.value)}
          maxLength={40}
        />
      </div>

      {/* Giống */}
      <div className="sa-form-group">
        <label className="sa-label" htmlFor="pet-breed">
          <span>{petType === 'dog' ? '🐕' : '🐈'}</span>
          Giống thú cưng
          <span className="sa-label-required">*</span>
        </label>
        <select
          id="pet-breed"
          className={`sa-select${errors.breed ? ' error' : ''}`}
          value={
            isCustomBreed && petInfo.breed !== 'Khác (Nhập tên giống)'
              ? 'Khác (Nhập tên giống)'
              : petInfo.breed || ''
          }
          onChange={handleBreedChange}
        >
          <option value="">-- Chọn giống --</option>
          {breeds.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
        {errors.breed && (
          <div className="sa-error-msg">
            <span>⚠️</span> {errors.breed}
          </div>
        )}

        {/* Nhập tên giống tùy chỉnh */}
        {(petInfo.breed === 'Khác (Nhập tên giống)' || isCustomBreed) && (
          <input
            type="text"
            className={`sa-input${errors.breed ? ' error' : ''}`}
            style={{ marginTop: '8px' }}
            placeholder="Nhập tên giống thú cưng của bạn..."
            value={petInfo.customBreed || ''}
            onChange={(e) => onChange('customBreed', e.target.value)}
            maxLength={60}
          />
        )}
      </div>

      {/* Cân nặng và Độ tuổi */}
      <div className="sa-form-row">
        <div className="sa-form-group">
          <label className="sa-label" htmlFor="pet-weight">
            <span>⚖️</span>
            Cân nặng (kg)
            <span className="sa-label-required">*</span>
          </label>
          <input
            id="pet-weight"
            type="number"
            className={`sa-input${errors.weight ? ' error' : ''}`}
            placeholder={petType === 'dog' ? 'VD: 5.5' : 'VD: 3.2'}
            value={petInfo.weight || ''}
            onChange={(e) => onChange('weight', e.target.value)}
            min="0.1"
            max="100"
            step="0.1"
          />
          {errors.weight ? (
            <div className="sa-error-msg">
              <span>⚠️</span> {errors.weight}
            </div>
          ) : (
            <div className="sa-input-hint">Nhập chính xác để kết quả tham khảo tốt hơn</div>
          )}
        </div>

        <div className="sa-form-group">
          <label className="sa-label" htmlFor="pet-age">
            <span>🎂</span>
            Độ tuổi
            <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 400 }}>(không bắt buộc)</span>
          </label>
          <select
            id="pet-age"
            className="sa-select"
            value={petInfo.age || ''}
            onChange={(e) => onChange('age', e.target.value)}
          >
            {ageOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tips */}
      {petInfo.age === 'under3m' || petInfo.age === '3m-6m' ? (
        <div
          style={{
            background: '#fff7ed',
            border: '1px solid #fed7aa',
            borderRadius: '14px',
            padding: '14px 16px',
            fontSize: '0.85rem',
            color: '#c2410c',
            lineHeight: '1.5',
            marginTop: '8px',
          }}
        >
          💡 <strong>Lưu ý:</strong> Bé còn nhỏ đang trong giai đoạn phát triển nhanh. Có thể cân nhắc chọn
          thêm 1 size để sử dụng lâu dài hơn.
        </div>
      ) : null}
    </div>
  );
}
