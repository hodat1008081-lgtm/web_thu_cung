// src/components/SizeAdvisor/SizeCalculator.jsx
// Pet Size Advisor – Tư vấn kích cỡ phụ kiện thú cưng (Tích hợp Bảng Size Sản Phẩm Cửa Hàng & Bảng Size Chuẩn Hóa)
import { useState, useMemo } from 'react';
import './SizeAdvisor.css';
import {
  ACCESSORY_TYPES,
  BRAND_OPTIONS,
  BREED_PRESETS,
  evaluateAccessorySize,
} from './sizeChartData';
import {
  ACCESSORY_PRODUCTS,
  matchSizeForProduct,
} from '../../pages/Products/productSizeData';

export default function SizeCalculator({ onSelectRecommendedCategory, initialProductId = '' }) {
  // State lựa chọn sản phẩm cụ thể hoặc tư vấn chung
  const [selectedProductId, setSelectedProductId] = useState(initialProductId);

  // State lựa chọn loại phụ kiện & thương hiệu (dành cho tư vấn chung)
  const [accessoryType, setAccessoryType] = useState('collar'); // 'collar' | 'harness' | 'clothing'
  const [brandId, setBrandId] = useState('general'); // 'general' | 'petcare_joy' | 'doglemi' | 'truelove'
  const [petType, setPetType] = useState('dog'); // 'dog' | 'cat'
  const [breed, setBreed] = useState('poodle');

  // State các thông số đo lường
  const [weight, setWeight] = useState(4.5);
  const [neck, setNeck] = useState(26);
  const [chest, setChest] = useState(40);
  const [backLength, setBackLength] = useState(30);

  // Cờ nhận diện: người dùng đang dùng số đo mẫu ước lượng của giống hay số đo thực tế
  const [isUsingPresetEstimate, setIsUsingPresetEstimate] = useState(false);

  // State mở rộng: hướng dẫn đo & bảng size
  const [showGuide, setShowGuide] = useState(false);
  const [showSizeTable, setShowSizeTable] = useState(false);

  // Lấy đối tượng sản phẩm cụ thể nếu được chọn
  const activeProduct = useMemo(() => {
    if (!selectedProductId) return null;
    return ACCESSORY_PRODUCTS.find((p) => String(p.id) === String(selectedProductId)) || null;
  }, [selectedProductId]);

  // Khi chọn một sản phẩm cụ thể từ danh sách
  const handleProductSelect = (prodId) => {
    setSelectedProductId(prodId);
    if (prodId) {
      const prod = ACCESSORY_PRODUCTS.find((p) => String(p.id) === String(prodId));
      if (prod && prod.accessoryType) {
        setAccessoryType(prod.accessoryType);
      }
    }
  };

  // Đổi loài thú cưng (chó/mèo)
  const handlePetTypeChange = (type) => {
    setPetType(type);
    const defaultBreed = BREED_PRESETS[type]?.[0]?.id || '';
    setBreed(defaultBreed);
  };

  // Áp dụng số đo trung bình theo giống (đánh dấu là ước lượng mẫu)
  const handleApplyBreedPreset = () => {
    const presets = BREED_PRESETS[petType] || [];
    const found = presets.find((b) => b.id === breed) || presets[0];
    if (found) {
      setWeight(found.defaultWeight);
      setNeck(found.defaultNeck);
      setChest(found.defaultChest);
      setBackLength(found.defaultBack);
      setIsUsingPresetEstimate(true);
    }
  };

  // Xóa số đo để người dùng tự nhập thước dây thực tế
  const handleClearMeasurements = () => {
    setNeck('');
    setChest('');
    setBackLength('');
    setIsUsingPresetEstimate(false);
  };

  // Khi người dùng tự nhập số đo thực tế vào bất kỳ ô nào
  const handleManualMeasurementChange = (setter, val) => {
    setter(val === '' ? '' : parseFloat(val));
    setIsUsingPresetEstimate(false);
  };

  // Tính toán kết quả tư vấn size theo thứ tự ưu tiên:
  // 1. Nếu có chọn sản phẩm cụ thể -> đối chiếu theo bảng size của chính sản phẩm đó.
  // 2. Nếu không chọn sản phẩm -> đối chiếu theo bảng size thương hiệu / tham khảo chung.
  const evaluationResult = useMemo(() => {
    if (activeProduct) {
      // Đối chiếu theo sản phẩm cụ thể
      const res = matchSizeForProduct(activeProduct, { neck, chest, backLength });
      const missingMeasurements = [];
      if (activeProduct.accessoryType === 'collar' && (!neck || neck <= 0)) {
        missingMeasurements.push('Vòng cổ (cm)');
      }
      if ((activeProduct.accessoryType === 'harness' || activeProduct.accessoryType === 'clothing') && (!chest || chest <= 0)) {
        missingMeasurements.push('Vòng ngực (cm)');
      }
      if (activeProduct.accessoryType === 'clothing' && (!backLength || backLength <= 0)) {
        missingMeasurements.push('Chiều dài lưng (cm)');
      }

      // Đánh giá mức độ tin cậy
      let confidenceLevel = 'Cao (Số đo thực tế theo sản phẩm)';
      let confidenceScore = 92;
      if (isUsingPresetEstimate) {
        confidenceLevel = 'Thấp (Ước lượng từ số đo trung bình của giống)';
        confidenceScore = 38;
      } else if (res.isBorderline) {
        confidenceLevel = 'Trung bình (Số đo ranh giới giữa 2 size)';
        confidenceScore = 72;
      } else if (missingMeasurements.length > 0) {
        confidenceLevel = 'Thấp (Chưa đủ số đo)';
        confidenceScore = 30;
      }

      return {
        ...res,
        isSpecificProduct: true,
        productName: activeProduct.name,
        productImage: activeProduct.image,
        productPrice: activeProduct.price,
        chartName: `Bảng size ${activeProduct.name}`,
        source: 'Thông số kỹ thuật sản phẩm tại cửa hàng',
        verificationStatus: activeProduct.verificationStatus || 'estimated',
        verificationBadge: 'Bảng size sản phẩm (Tham khảo)',
        isOfficialBrand: false,
        tableData: activeProduct.sizeChart,
        confidenceLevel,
        confidenceScore,
        missingMeasurements,
        isReferenceOnly: isUsingPresetEstimate,
        advice: `Kích thước chuẩn hóa theo mẫu sản phẩm ${activeProduct.name}.`,
      };
    }

    // Đối chiếu theo bảng size tiêu chuẩn / thương hiệu
    return evaluateAccessorySize({
      accessoryType,
      brandId,
      petType,
      breed,
      weight,
      neck,
      chest,
      backLength,
      isUsingPresetEstimate,
    });
  }, [activeProduct, accessoryType, brandId, petType, breed, weight, neck, chest, backLength, isUsingPresetEstimate]);

  const currentAccessory = ACCESSORY_TYPES.find((a) => a.id === accessoryType) || ACCESSORY_TYPES[0];
  const currentBrand = BRAND_OPTIONS.find((b) => b.id === brandId) || BRAND_OPTIONS[0];
  const breedList = BREED_PRESETS[petType] || [];
  const selectedBreedObj = breedList.find((b) => b.id === breed);

  return (
    <div className="container size-advisor-wrapper">
      {/* Tiêu đề trang */}
      <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 36px' }}>
        <div className="section-tagline" style={{ justifyContent: 'center' }}>
          <span>📏</span> Pet Size Advisor – Tư vấn kích cỡ phụ kiện
        </div>
        <h2 className="section-main-heading">
          Tư Vấn Kích Cỡ <span>Phụ Kiện Thú Cưng</span>
        </h2>
        <p style={{ color: '#64748b', marginTop: '10px', fontSize: '0.98rem' }}>
          Hệ thống đối chiếu kích cỡ đa tầng theo từng sản phẩm cụ thể và quy chuẩn quốc tế.
          Ưu tiên số đo thực tế từ thước dây để mang lại sự vừa vặn, thoải mái và an toàn tuyệt đối cho bé cưng!
        </p>
      </div>

      <div className="size-advisor-card">
        {/* CỘT TRÁI: FORM NHẬP THÔNG SỐ */}
        <div>
          {/* KHỐI 1: TƯ VẤN THEO SẢN PHẨM CỤ THỂ HOẶC DANH MỤC */}
          <div className="product-selector-box">
            <label className="form-label" style={{ marginBottom: '8px' }}>
              🎯 Bạn muốn tư vấn size cho sản phẩm nào?
            </label>
            <select
              className="form-input"
              value={selectedProductId}
              onChange={(e) => handleProductSelect(e.target.value)}
              style={{ background: '#ffffff', fontWeight: '600' }}
            >
              <option value="">-- Tư vấn chung theo bảng size tiêu chuẩn --</option>
              {ACCESSORY_PRODUCTS.map((prod) => (
                <option key={prod.id} value={prod.id}>
                  🛍️ {prod.name} ({prod.accessoryType === 'collar' ? 'Vòng cổ' : prod.accessoryType === 'harness' ? 'Đai yếm' : 'Quần áo'})
                </option>
              ))}
            </select>

            {/* Hiển thị card xem trước sản phẩm nếu đang chọn sản phẩm cụ thể */}
            {activeProduct && (
              <div className="product-preview-card">
                <img
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  className="product-preview-img"
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.92rem', fontWeight: '800', color: '#1e293b' }}>
                    {activeProduct.name}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#ff6b35', fontWeight: '700', marginTop: '2px' }}>
                    {activeProduct.price?.toLocaleString('vi-VN')}₫
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '2px' }}>
                    Phân loại: <strong>{activeProduct.categoryName}</strong> • {activeProduct.sizes?.join(', ')}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProductId('')}
                  style={{
                    background: '#f1f5f9',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '6px 10px',
                    fontSize: '0.74rem',
                    cursor: 'pointer',
                    color: '#64748b',
                  }}
                  title="Chuyển về tư vấn chung"
                >
                  Bỏ chọn
                </button>
              </div>
            )}
          </div>

          <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#1e293b', marginBottom: '14px' }}>
            {activeProduct ? '1. Loại Phụ Kiện Của Sản Phẩm' : '1. Chọn Loại Phụ Kiện & Bảng Size'}
          </h3>

          {/* Tab chọn loại phụ kiện */}
          <div className="accessory-selector-grid">
            {ACCESSORY_TYPES.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`accessory-card-btn ${accessoryType === item.id ? 'active' : ''}`}
                onClick={() => {
                  setAccessoryType(item.id);
                  if (activeProduct && activeProduct.accessoryType !== item.id) {
                    setSelectedProductId(''); // Bỏ chọn sản phẩm cụ thể nếu đổi loại phụ kiện không khớp
                  }
                }}
              >
                <span className="btn-icon">{item.icon}</span>
                <span className="btn-title">{item.name}</span>
              </button>
            ))}
          </div>

          {/* Chọn bảng size thương hiệu (chỉ hiện khi không chọn sản phẩm cụ thể) */}
          {!activeProduct && (
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label className="form-label" style={{ margin: 0 }}>
                  Bảng size thương hiệu áp dụng:
                </label>
                <span
                  className={`verification-badge ${
                    currentBrand.verificationStatus === 'verified_official'
                      ? 'badge-verified'
                      : currentBrand.verificationStatus === 'unverified'
                      ? 'badge-unverified'
                      : 'badge-reference'
                  }`}
                >
                  {currentBrand.verificationStatus === 'verified_official'
                    ? '✓ Đã xác minh'
                    : currentBrand.verificationStatus === 'unverified'
                    ? '⚠️ Chưa có dữ liệu số hóa'
                    : 'ℹ️ Bảng chuẩn chung'}
                </span>
              </div>
              <select
                className="form-input"
                value={brandId}
                onChange={(e) => setBrandId(e.target.value)}
              >
                {BRAND_OPTIONS.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} {b.isOfficial ? '★ (Chính hãng đã xác minh)' : ''}
                  </option>
                ))}
              </select>
              {currentBrand.verificationStatus === 'unverified' && (
                <div style={{ fontSize: '0.78rem', color: '#b45309', marginTop: '6px', lineHeight: '1.4' }}>
                  ℹ️ {currentBrand.fallbackNotice}
                </div>
              )}
            </div>
          )}

          <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#1e293b', marginTop: '22px', marginBottom: '14px' }}>
            2. Thông Tin Bé Cưng & Số Đo Thước Dây
          </h3>

          {/* Chọn Chó / Mèo */}
          <div className="form-group">
            <label className="form-label">Loài thú cưng</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                className={`tab-btn ${petType === 'dog' ? 'active' : ''}`}
                style={{ flex: 1 }}
                onClick={() => handlePetTypeChange('dog')}
              >
                🐶 Chó cưng
              </button>
              <button
                type="button"
                className={`tab-btn ${petType === 'cat' ? 'active' : ''}`}
                style={{ flex: 1 }}
                onClick={() => handlePetTypeChange('cat')}
              >
                🐱 Mèo cưng
              </button>
            </div>
          </div>

          {/* Giống loài tham khảo (không bắt buộc) */}
          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label className="form-label" style={{ margin: 0 }}>
                Giống tham khảo <span className="input-badge-optional">Không bắt buộc</span>
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={handleApplyBreedPreset}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ff6b35',
                    fontSize: '0.76rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    padding: 0,
                    textDecoration: 'underline',
                  }}
                  title="Điền số đo ước lượng trung bình của giống"
                >
                  ⚡ Ước lượng theo giống
                </button>
                {(neck !== '' || chest !== '' || backLength !== '') && (
                  <button
                    type="button"
                    onClick={handleClearMeasurements}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#64748b',
                      fontSize: '0.76rem',
                      cursor: 'pointer',
                      padding: 0,
                      textDecoration: 'underline',
                    }}
                  >
                    Xóa số đo
                  </button>
                )}
              </div>
            </div>
            <select
              className="form-input"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
            >
              {breedList.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
            {selectedBreedObj?.note && (
              <div style={{ fontSize: '0.76rem', color: '#64748b', marginTop: '4px', fontStyle: 'italic' }}>
                Đặc điểm giống: {selectedBreedObj.note}
              </div>
            )}
          </div>

          {/* Cảnh báo khi người dùng đang áp dụng số đo mẫu ước lượng */}
          {isUsingPresetEstimate && (
            <div className="preset-warning-banner">
              <strong>⚠️ CẢNH BÁO ƯỚC LƯỢNG THAM KHẢO:</strong>
              <div>
                Bạn đang sử dụng số đo trung bình của giống <strong>{selectedBreedObj?.name}</strong>.
                Đây <u>KHÔNG PHẢI</u> số đo thực tế của thú cưng. Thể trạng thực tế có thể chênh lệch do cân nặng, độ dày lông và khung xương.
                Khuyến khích dùng thước dây đo trực tiếp để đảm bảo vừa vặn 100%!
              </div>
            </div>
          )}

          {/* Cân nặng tham khảo */}
          <div className="form-group" style={{ marginTop: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label className="form-label" style={{ margin: 0 }}>
                Cân nặng hiện tại: <strong style={{ color: '#ff6b35' }}>{weight ? `${weight} kg` : 'Chưa nhập'}</strong>
                <span className="input-badge-optional">Dùng đối chiếu</span>
              </label>
              <input
                type="number"
                min="0.5"
                max="80"
                step="0.1"
                placeholder="kg"
                value={weight}
                onChange={(e) => setWeight(e.target.value === '' ? '' : parseFloat(e.target.value))}
                style={{
                  width: '80px',
                  padding: '4px 8px',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  textAlign: 'right',
                }}
              />
            </div>
            <input
              type="range"
              min="0.5"
              max="45"
              step="0.5"
              value={weight || 0}
              onChange={(e) => setWeight(parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: '#ff6b35', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94a3b8' }}>
              <span>0.5 kg (Mới sinh)</span>
              <span>15 kg</span>
              <span>45+ kg (Cỡ lớn)</span>
            </div>
          </div>

          {/* Khối nhập số đo thước dây */}
          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px', marginTop: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div>
                <span style={{ fontSize: '0.92rem', fontWeight: '700', color: '#1e293b' }}>
                  Số Đo Thước Dây Thực Tế
                </span>
                <span style={{ fontSize: '0.74rem', color: '#16a34a', fontWeight: '600', marginLeft: '6px' }}>
                  [Ưu tiên số 1]
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowGuide(!showGuide)}
                style={{
                  background: '#f1f5f9',
                  border: 'none',
                  color: '#475569',
                  fontSize: '0.75rem',
                  padding: '4px 10px',
                  borderRadius: '999px',
                  cursor: 'pointer',
                  fontWeight: '600',
                }}
              >
                📐 {showGuide ? 'Ẩn cách đo' : 'Xem cách đo thước dây'}
              </button>
            </div>

            {showGuide && (
              <div className="guide-box">
                <div style={{ fontWeight: '700', color: '#1e293b', marginBottom: '6px' }}>
                  📏 Hướng dẫn lấy số đo chuẩn xác bằng thước dây:
                </div>
                <ul style={{ paddingLeft: '18px', margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <li>
                    <strong>Vòng cổ (Neck):</strong> Đo quanh gốc cổ (nơi đeo vòng). Chèn thêm 2 ngón tay vào giữa thước và cổ để bé thở dễ chịu.
                  </li>
                  <li>
                    <strong>Vòng ngực (Chest):</strong> Đo quanh chu vi nở nhất của lồng ngực (ngay sau hai nách chân trước).
                  </li>
                  <li>
                    <strong>Chiều dài lưng (Back):</strong> Đo từ gáy sống lưng đến sát cuống đuôi (không tính đuôi).
                  </li>
                </ul>
              </div>
            )}

            <div className="measurement-input-grid" style={{ marginTop: '12px' }}>
              {/* Vòng cổ */}
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">
                  Vòng cổ (cm)
                  {accessoryType === 'collar' ? (
                    <span className="input-badge-required">Bắt buộc cho vòng cổ</span>
                  ) : (
                    <span className="input-badge-optional">Tùy chọn</span>
                  )}
                </label>
                <input
                  type="number"
                  className="form-input"
                  min="5"
                  max="120"
                  step="0.5"
                  placeholder="Ví dụ: 26"
                  value={neck}
                  onChange={(e) => handleManualMeasurementChange(setNeck, e.target.value)}
                  style={{
                    borderColor: accessoryType === 'collar' ? '#ff6b35' : '#e2e8f0',
                    background: accessoryType === 'collar' ? '#fffaf5' : '#ffffff',
                  }}
                />
              </div>

              {/* Vòng ngực */}
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">
                  Vòng ngực (cm)
                  {accessoryType === 'harness' || accessoryType === 'clothing' ? (
                    <span className="input-badge-required">Bắt buộc</span>
                  ) : (
                    <span className="input-badge-optional">Tùy chọn</span>
                  )}
                </label>
                <input
                  type="number"
                  className="form-input"
                  min="10"
                  max="150"
                  step="0.5"
                  placeholder="Ví dụ: 40"
                  value={chest}
                  onChange={(e) => handleManualMeasurementChange(setChest, e.target.value)}
                  style={{
                    borderColor: accessoryType === 'harness' || accessoryType === 'clothing' ? '#ff6b35' : '#e2e8f0',
                    background: accessoryType === 'harness' || accessoryType === 'clothing' ? '#fffaf5' : '#ffffff',
                  }}
                />
              </div>

              {/* Chiều dài lưng */}
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">
                  Chiều dài lưng (cm)
                  {accessoryType === 'clothing' ? (
                    <span className="input-badge-required">Quan trọng cho áo</span>
                  ) : (
                    <span className="input-badge-optional">Không bắt buộc</span>
                  )}
                </label>
                <input
                  type="number"
                  className="form-input"
                  min="10"
                  max="120"
                  step="0.5"
                  placeholder="Ví dụ: 30"
                  value={backLength}
                  onChange={(e) => handleManualMeasurementChange(setBackLength, e.target.value)}
                  style={{
                    borderColor: accessoryType === 'clothing' ? '#ff6b35' : '#e2e8f0',
                    background: accessoryType === 'clothing' ? '#fffaf5' : '#ffffff',
                  }}
                />
              </div>

              {/* Ghi chú thứ tự ưu tiên */}
              <div
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '10px 12px',
                  fontSize: '0.74rem',
                  color: '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                ⚖️ <strong>Thứ tự ưu tiên:</strong> 1. Số đo thước dây ➔ 2. Bảng size sản phẩm ➔ 3. Bảng size hãng ➔ 4. Ước lượng giống
              </div>
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: KẾT QUẢ TƯ VẤN & BÁO CÁO ĐỘ TIN CẬY */}
        <div>
          <div className="result-card-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '0.82rem', color: '#9a3412', fontWeight: '800', textTransform: 'uppercase' }}>
                KẾT QUẢ ĐỐI CHIẾU SIZE PHỤ KIỆN
              </div>
              <span style={{ fontSize: '0.78rem', background: '#fed7aa', color: '#9a3412', padding: '3px 8px', borderRadius: '6px', fontWeight: '700' }}>
                {activeProduct ? activeProduct.name : currentAccessory.name}
              </span>
            </div>

            {/* Thông báo chuyển tiếp bảng size nếu thương hiệu chưa có bảng size chính thức */}
            {evaluationResult.isFallback && evaluationResult.fallbackReason && (
              <div style={{ background: '#fef3c7', border: '1px solid #fde68a', borderRadius: '10px', padding: '10px 12px', marginTop: '12px', fontSize: '0.78rem', color: '#92400e' }}>
                ℹ️ <strong>Thông báo chuyển tiếp:</strong> {evaluationResult.fallbackReason}
              </div>
            )}

            {/* Trường hợp lỗi thông số âm hoặc vượt ngưỡng */}
            {evaluationResult.status === 'error' && (
              <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '16px', borderRadius: '14px', marginTop: '16px', fontSize: '0.88rem' }}>
                ❌ <strong>Lỗi thông số:</strong> {evaluationResult.message}
              </div>
            )}

            {/* Trường hợp thiếu hoàn toàn số đo */}
            {evaluationResult.status === 'waiting_input' && (
              <div style={{ background: '#fffbeb', color: '#b45309', padding: '20px', borderRadius: '16px', marginTop: '16px', border: '1px dashed #fde68a' }}>
                <div style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '8px' }}>
                  ⏳ Cần thêm số đo để đối chiếu bảng size
                </div>
                <p style={{ margin: 0, fontSize: '0.86rem', lineHeight: '1.5' }}>
                  {evaluationResult.message}
                </p>
                <div style={{ marginTop: '12px', fontSize: '0.78rem', color: '#92400e' }}>
                  * Nếu bạn chưa có thước dây tại nhà, hãy chọn giống và nhấn nút <strong>"⚡ Ước lượng theo giống"</strong> ở cột bên trái để nhận dự đoán sơ bộ.
                </div>
              </div>
            )}

            {/* Trường hợp chỉ nhập cân nặng (không có số đo) */}
            {evaluationResult.status === 'only_weight' && (
              <div style={{ background: '#fef2f2', border: '1.5px solid #fecaca', borderRadius: '16px', padding: '18px', marginTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="confidence-badge confidence-low">
                    ⚠️ Mức độ tin cậy: Thấp (Chỉ có cân nặng)
                  </span>
                  <span style={{ fontSize: '0.72rem', color: '#991b1b', fontWeight: '700' }}>
                    Điểm tin cậy: {evaluationResult.confidenceScore}/100
                  </span>
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: '800', color: '#b91c1c', marginBottom: '8px' }}>
                  {evaluationResult.suggestedSize}
                </div>
                <p style={{ fontSize: '0.84rem', color: '#7f1d1d', lineHeight: '1.5', margin: '0 0 10px' }}>
                  {evaluationResult.reason}
                </p>
                <div style={{ fontSize: '0.8rem', color: '#991b1b', fontWeight: '600' }}>
                  👉 {evaluationResult.advice}
                </div>
              </div>
            )}

            {/* Trường hợp có kết quả size (Thành công hoặc Ngoại cỡ) */}
            {(evaluationResult.status === 'success' || evaluationResult.status === 'out_of_range') && (
              <>
                {/* Size đề xuất & Badge mức độ tin cậy */}
                <div style={{ margin: '14px 0 10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ fontSize: '2.1rem', fontWeight: '800', color: '#ff6b35', lineHeight: '1.1' }}>
                      {evaluationResult.suggestedSize}
                    </div>
                    {/* Badge độ tin cậy */}
                    <div
                      className={`confidence-badge ${
                        evaluationResult.confidenceScore >= 85
                          ? 'confidence-high'
                          : evaluationResult.confidenceScore >= 65
                          ? 'confidence-medium'
                          : 'confidence-low'
                      }`}
                    >
                      {evaluationResult.confidenceScore >= 85 ? '✓' : evaluationResult.confidenceScore >= 65 ? 'ℹ️' : '⚠️'} Mức độ tin cậy: {evaluationResult.confidenceLevel}
                    </div>
                  </div>

                  {evaluationResult.isReferenceOnly && (
                    <div style={{ fontSize: '0.76rem', color: '#c2410c', fontWeight: '700', marginTop: '6px' }}>
                      * Lưu ý: Kết quả đang dựa trên số đo ước lượng mẫu. Khuyến khích đo thực tế bằng thước dây!
                    </div>
                  )}
                </div>

                {/* Cảnh báo nằm giữa 2 size (Borderline alert) */}
                {evaluationResult.isBorderline && (
                  <div className="borderline-alert">
                    <div style={{ fontWeight: '700', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>⚠️</span> Số đo nằm ở ranh giới giữa 2 size!
                    </div>
                    <div>{evaluationResult.borderlineNote}</div>
                  </div>
                )}

                {/* Khối thông tin bảng size & Nguồn dữ liệu */}
                <div
                  style={{
                    background: '#ffffff',
                    border: '1px solid #fed7aa',
                    borderRadius: '14px',
                    padding: '12px 14px',
                    marginBottom: '14px',
                    fontSize: '0.8rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#64748b' }}>📋 Bảng size sử dụng:</span>
                    <strong style={{ color: '#1e293b' }}>{evaluationResult.chartName}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#64748b' }}>🏛️ Nguồn dữ liệu:</span>
                    <span style={{ color: '#475569', fontSize: '0.76rem', textAlign: 'right', maxWidth: '65%' }}>
                      {evaluationResult.source}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#64748b' }}>🛡️ Trạng thái xác minh:</span>
                    <span
                      className={`verification-badge ${
                        evaluationResult.verificationStatus === 'verified_official'
                          ? 'badge-verified'
                          : 'badge-reference'
                      }`}
                    >
                      {evaluationResult.verificationBadge}
                    </span>
                  </div>
                </div>

                {/* Các tiêu chí đối chiếu chi tiết */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                  <div className="result-metric-item">
                    <span style={{ fontSize: '1.25rem' }}>🎯</span>
                    <div>
                      <strong style={{ fontSize: '0.86rem', color: '#1e293b' }}>Lý do đề xuất:</strong>
                      <div style={{ fontSize: '0.82rem', color: '#475569', marginTop: '2px', lineHeight: '1.45' }}>
                        {evaluationResult.reason}
                      </div>
                    </div>
                  </div>

                  <div className="result-metric-item">
                    <span style={{ fontSize: '1.25rem' }}>💡</span>
                    <div>
                      <strong style={{ fontSize: '0.86rem', color: '#1e293b' }}>Lời khuyên chọn phụ kiện:</strong>
                      <div style={{ fontSize: '0.82rem', color: '#ea580c', fontWeight: '600', marginTop: '2px' }}>
                        {evaluationResult.advice}
                      </div>
                    </div>
                  </div>

                  {/* Hiển thị số đo còn thiếu nếu có */}
                  {evaluationResult.missingMeasurements && evaluationResult.missingMeasurements.length > 0 && (
                    <div className="result-metric-item" style={{ background: '#fffbeb', border: '1px solid #fde68a' }}>
                      <span style={{ fontSize: '1.25rem' }}>📏</span>
                      <div>
                        <strong style={{ fontSize: '0.84rem', color: '#92400e' }}>Số đo còn thiếu có thể bổ sung:</strong>
                        <div className="missing-pills-container">
                          {evaluationResult.missingMeasurements.map((m, idx) => (
                            <span key={idx} className="missing-pill">
                              + {m}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {evaluationResult.sizeItem && evaluationResult.sizeItem.exampleBreeds && (
                    <div className="result-metric-item">
                      <span style={{ fontSize: '1.25rem' }}>🐕</span>
                      <div>
                        <strong style={{ fontSize: '0.84rem', color: '#1e293b' }}>Các giống phổ biến cùng size:</strong>
                        <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>
                          {evaluationResult.sizeItem.exampleBreeds}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bật/Tắt bảng size chi tiết */}
                <div style={{ marginBottom: '14px' }}>
                  <button
                    type="button"
                    onClick={() => setShowSizeTable(!showSizeTable)}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #fed7aa',
                      color: '#c2410c',
                      padding: '8px 14px',
                      borderRadius: '10px',
                      fontSize: '0.82rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                    }}
                  >
                    📊 {showSizeTable ? 'Ẩn bảng size chi tiết' : `Xem toàn bộ bảng size ${activeProduct ? activeProduct.name : currentAccessory.shortName}`}
                  </button>

                  {/* Bảng size chi tiết đối chiếu */}
                  {showSizeTable && (
                    <div className="size-table-container">
                      <div style={{ fontSize: '0.78rem', fontWeight: '700', color: '#9a3412', marginBottom: '8px' }}>
                        {evaluationResult.chartName.toUpperCase()}
                      </div>

                      <table className="size-table">
                        <thead>
                          <tr>
                            <th>Size</th>
                            {accessoryType === 'collar' && <th>Vòng cổ vừa (cm)</th>}
                            {accessoryType === 'collar' && <th>Bản rộng</th>}
                            {accessoryType === 'harness' && <th>Vòng ngực vừa (cm)</th>}
                            {accessoryType === 'harness' && <th>Vòng cổ yếm (cm)</th>}
                            {accessoryType === 'clothing' && <th>Ngực áo (cm)</th>}
                            {accessoryType === 'clothing' && <th>Dài lưng (cm)</th>}
                            <th>Cân nặng tham khảo</th>
                          </tr>
                        </thead>
                        <tbody>
                          {evaluationResult.tableData?.map((row) => {
                            const isCurrent = evaluationResult.sizeItem?.size === row.size;
                            return (
                              <tr key={row.size} className={isCurrent ? 'highlighted-row' : ''}>
                                <td>{row.size} {isCurrent && '👈'}</td>
                                {accessoryType === 'collar' && (
                                  <td>{row.minPetNeck ? `${row.minPetNeck} - ${row.maxPetNeck} cm` : `${row.minNeck} - ${row.maxNeck} cm`}</td>
                                )}
                                {accessoryType === 'collar' && <td>{row.strapWidth ? `${row.strapWidth} cm` : row.width}</td>}
                                {accessoryType === 'harness' && (
                                  <td>{row.minPetChest ? `${row.minPetChest} - ${row.maxPetChest} cm` : `${row.minChest} - ${row.maxChest} cm`}</td>
                                )}
                                {accessoryType === 'harness' && <td>{row.productNeck ? `${row.productNeck} cm` : (row.minNeck ? `${row.minNeck} - ${row.maxNeck} cm` : '—')}</td>}
                                {accessoryType === 'clothing' && <td>{row.productChest ? `${row.productChest} cm` : `${row.minChest} - ${row.maxChest} cm`}</td>}
                                {accessoryType === 'clothing' && <td>{row.productBack ? `${row.productBack} cm` : (row.minBack ? `${row.minBack} - ${row.maxBack} cm` : '—')}</td>}
                                <td>{row.weightEstimate || `${row.minWeight} - ${row.maxWeight} kg`}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Nút CTA xem phụ kiện */}
                {onSelectRecommendedCategory && (
                  <button
                    type="button"
                    className="submit-btn-full"
                    onClick={() => onSelectRecommendedCategory('accessory')}
                    style={{ margin: 0, cursor: 'pointer' }}
                  >
                    {activeProduct
                      ? `Xem Phụ Kiện "${activeProduct.name}" Cùng Loại →`
                      : 'Xem Các Phụ Kiện Phù Hợp Size Này →'}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
