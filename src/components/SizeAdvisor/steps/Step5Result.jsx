// src/components/SizeAdvisor/steps/Step5Result.jsx
// Bước 5: Hiển thị kết quả tư vấn size

import React from 'react';
import { ACCESSORY_LABELS } from '../data/sizeCharts';

export default function Step5Result({
  result,
  petInfo,
  petType,
  accessoryType,
  measurements,
  onRestart,
  onEdit,
  onViewProducts,
}) {
  if (!result) return null;

  const petName = petInfo.name || (petType === 'dog' ? 'Bé cún' : 'Bé mèo');
  const breed =
    petInfo.customBreed && petInfo.customBreed.trim()
      ? petInfo.customBreed
      : petInfo.breed;
  const accInfo = ACCESSORY_LABELS[accessoryType] || { label: accessoryType, icon: '📦' };

  const measurementLabels = {
    neck: 'Vòng cổ',
    chest: 'Vòng ngực',
    back: 'Chiều dài lưng',
    pawLength: 'Chiều dài bàn chân',
    pawWidth: 'Chiều rộng bàn chân',
  };

  // ---- TRƯỜNG HỢP DÂY DẮT ----
  if (result.status === 'leash') {
    return (
      <div className="sa-result-wrapper">
        <PetSummaryHeader petName={petName} petType={petType} breed={breed} petInfo={petInfo} />

        <div
          style={{ textAlign: 'center', marginBottom: '20px' }}
        >
          <div className="sa-size-badge">
            <div style={{ fontSize: '2rem' }}>{accInfo.icon}</div>
            <div className="sa-size-label">{accInfo.label}</div>
          </div>
        </div>

        <div className="sa-leash-result">
          <div style={{ fontSize: '0.85rem', color: '#c2410c', fontWeight: 700, marginBottom: '6px', textTransform: 'uppercase' }}>
            Đề xuất cho bạn
          </div>
          <div className="sa-leash-recommended">{result.recommended.label}</div>
          <div className="sa-leash-desc">{result.recommended.description}</div>
          {result.extraTip && (
            <div className="sa-leash-tip">
              <span>💡</span>
              <span>{result.extraTip}</span>
            </div>
          )}
        </div>

        {/* Các lựa chọn khác */}
        <div style={{ marginBottom: '20px' }}>
          <div className="sa-measure-table-title">
            <span>📋</span> Tất cả các loại dây dắt
          </div>
          {result.allOptions.map((opt) => (
            <div
              key={opt.purpose}
              style={{
                display: 'flex',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '14px',
                marginBottom: '8px',
                background: opt.purpose === result.recommended.purpose ? '#fff7ed' : '#f8fafc',
                border: `1.5px solid ${opt.purpose === result.recommended.purpose ? '#fed7aa' : '#f1f5f9'}`,
              }}
            >
              <span style={{ fontSize: '1.1rem' }}>
                {opt.purpose === result.recommended.purpose ? '⭐' : '○'}
              </span>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1e293b' }}>{opt.label}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>{opt.description}</div>
              </div>
            </div>
          ))}
        </div>

        <DemoBanner note={result.note} />

        <ResultActions onRestart={onRestart} onEdit={onEdit} onViewProducts={onViewProducts} />
      </div>
    );
  }

  // ---- TRƯỜNG HỢP KHÔNG TÌM ĐƯỢC SIZE ----
  if (result.status === 'no_match') {
    return (
      <div className="sa-result-wrapper">
        <PetSummaryHeader petName={petName} petType={petType} breed={breed} petInfo={petInfo} />
        <div className="sa-no-match">
          <div className="sa-no-match-emoji">😔</div>
          <h3>Không tìm thấy size phù hợp</h3>
          <p>{result.message}</p>
        </div>
        <ResultActions onRestart={onRestart} onEdit={onEdit} onViewProducts={onViewProducts} />
      </div>
    );
  }

  // ---- TRƯỜNG HỢP LỖI / DỮ LIỆU THIẾU ----
  if (result.status === 'error' || result.status === 'missing_data') {
    return (
      <div className="sa-result-wrapper">
        <div className="sa-no-match">
          <div className="sa-no-match-emoji">⚠️</div>
          <h3>Dữ liệu chưa đầy đủ</h3>
          <p>{result.message}</p>
        </div>
        <ResultActions onRestart={onRestart} onEdit={() => onEdit(4)} onViewProducts={null} />
      </div>
    );
  }

  // ---- TRƯỜNG HỢP THÀNH CÔNG ----
  const { recommendedSize, confidence, measurementDetails, explanation, note, isDemo } = result;
  const isHighConfidence = confidence === 'high';

  return (
    <div className="sa-result-wrapper">
      {/* Thông tin thú cưng */}
      <PetSummaryHeader petName={petName} petType={petType} breed={breed} petInfo={petInfo} />

      {/* Size đề xuất */}
      <div className="sa-size-badge-row">
        <div className="sa-size-badge">
          <div style={{ fontSize: '1.8rem' }}>{accInfo.icon}</div>
          <div className="sa-size-label">{accInfo.label}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
            Kích thước đề xuất
          </div>
          <div className={`sa-size-value ${isHighConfidence ? 'high-confidence' : 'medium-confidence'}`}>
            {recommendedSize}
          </div>
          <div className={`sa-confidence-pill ${isHighConfidence ? 'high' : 'medium'}`}>
            {isHighConfidence ? (
              <><span>✅</span> Phù hợp hoàn toàn</>
            ) : (
              <><span>⚠️</span> Gần phù hợp nhất</>
            )}
          </div>
        </div>
      </div>

      {/* Giải thích */}
      <div className="sa-explanation-box">
        <strong>📌 Lý do đề xuất:</strong> {explanation}
      </div>

      {/* Bảng so sánh số đo */}
      {measurementDetails && measurementDetails.length > 0 && (
        <>
          <div className="sa-measure-table-title">
            <span>📊</span> Chi tiết so sánh số đo với bảng size {recommendedSize}
          </div>
          <table className="sa-measure-table">
            <thead>
              <tr>
                <th>Số đo</th>
                <th>Giá trị bé</th>
                <th>Khoảng size {recommendedSize}</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {measurementDetails.map((d) => (
                <tr key={d.key}>
                  <td style={{ fontWeight: 600 }}>{d.label}</td>
                  <td style={{ fontWeight: 700, color: '#1e293b' }}>
                    {d.value} {d.unit}
                  </td>
                  <td style={{ color: '#64748b', fontSize: '0.85rem' }}>
                    {d.rangeMin} – {d.rangeMax} {d.unit}
                  </td>
                  <td>
                    {d.fits ? (
                      <span className="sa-fit-status fits">✓ Vừa vặn</span>
                    ) : d.high ? (
                      <span className="sa-fit-status too-high">↑ Hơi lớn hơn (+{d.delta.toFixed(1)} cm)</span>
                    ) : (
                      <span className="sa-fit-status too-low">↓ Hơi nhỏ hơn (-{d.delta.toFixed(1)} cm)</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Cảnh báo nếu không hoàn toàn vừa */}
      {!isHighConfidence && (
        <div
          style={{
            background: '#fefce8',
            border: '1.5px solid #fde047',
            borderRadius: '14px',
            padding: '14px 18px',
            fontSize: '0.88rem',
            color: '#854d0e',
            lineHeight: '1.5',
            marginBottom: '20px',
            display: 'flex',
            gap: '10px',
            alignItems: 'flex-start',
          }}
        >
          <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>⚠️</span>
          <div>
            <strong>Lưu ý:</strong> Một số số đo của bé nằm ngoài khoảng size {recommendedSize} tiêu chuẩn.
            Chúng tôi đề xuất đây là size gần nhất nhưng không đảm bảo 100% vừa vặn. Bạn nên thử sản phẩm
            trước khi quyết định, hoặc liên hệ hỗ trợ để được tư vấn trực tiếp.
          </div>
        </div>
      )}

      {/* Demo banner */}
      <DemoBanner note={note} />

      <ResultActions onRestart={onRestart} onEdit={onEdit} onViewProducts={onViewProducts} />
    </div>
  );
}

// ---- Sub-components ----

function PetSummaryHeader({ petName, petType, breed, petInfo }) {
  return (
    <div className="sa-result-header">
      <div className="sa-result-pet-avatar">{petType === 'dog' ? '🐶' : '🐱'}</div>
      <div className="sa-result-pet-info">
        <h3>Kết quả tư vấn cho {petName}</h3>
        <div className="sa-result-pet-tags">
          <span className="sa-pet-tag">
            <span>{petType === 'dog' ? '🐕' : '🐈'}</span>
            {petType === 'dog' ? 'Chó' : 'Mèo'}
          </span>
          {breed && (
            <span className="sa-pet-tag">
              <span>🏷️</span> {breed}
            </span>
          )}
          {petInfo.weight && (
            <span className="sa-pet-tag">
              <span>⚖️</span> {petInfo.weight} kg
            </span>
          )}
          {petInfo.age && (
            <span className="sa-pet-tag">
              <span>🎂</span>{' '}
              {petInfo.age === 'under3m'
                ? '< 3 tháng'
                : petInfo.age === '3m-6m'
                ? '3-6 tháng'
                : petInfo.age === '6m-1y'
                ? '6th-1 năm'
                : petInfo.age === '1y-3y'
                ? '1-3 tuổi'
                : petInfo.age === '3y-7y'
                ? '3-7 tuổi'
                : '> 7 tuổi'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function DemoBanner({ note }) {
  if (!note) return null;
  return (
    <div className="sa-demo-banner">
      <span className="sa-demo-banner-icon">📋</span>
      <div>
        <strong>Lưu ý về dữ liệu:</strong> {note}
      </div>
    </div>
  );
}

function ResultActions({ onRestart, onEdit, onViewProducts }) {
  return (
    <div className="sa-result-actions">
      <button type="button" className="sa-btn-restart" onClick={onRestart}>
        <span>🔄</span> Tư vấn lại
      </button>
      <button type="button" className="sa-btn-change" onClick={() => onEdit && onEdit(4)}>
        <span>✏️</span> Thay đổi thông tin
      </button>
      {onViewProducts && (
        <button type="button" className="sa-btn-products" onClick={onViewProducts}>
          <span>🛍️</span> Xem phụ kiện phù hợp
        </button>
      )}
    </div>
  );
}
