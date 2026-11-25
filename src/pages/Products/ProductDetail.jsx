// src/pages/Products/ProductDetail.jsx
// Trang chi tiết cho từng sản phẩm thú cưng - Tích hợp chọn Size & Bảng kích thước chuẩn hóa
import { useState, useMemo } from 'react';
import { formatCurrency } from '../../data/products';
import { getProductSizeData, matchSizeForProduct, ACCESSORY_PRODUCTS } from './productSizeData';
import { useStore } from '../../context/StoreContext';
import './ProductDetail.css';

export default function ProductDetail({ product: initialProduct, onBack, onAddToCart, onBuyNow, onOpenSizeAdvisor }) {
  const { products } = useStore();

  // Luôn lấy dữ liệu sản phẩm mới nhất từ StoreContext để đồng bộ stock thời gian thực
  const product = useMemo(() => {
    if (!initialProduct) return null;
    return products.find((p) => p.id === initialProduct.id) || initialProduct;
  }, [products, initialProduct]);

  const stock = typeof product?.stock === 'number' ? product.stock : 0;
  const isSoldOut = stock <= 0;

  // Lấy dữ liệu kích thước của sản phẩm (nếu là phụ kiện có size)
  const productSizeInfo = useMemo(() => {
    if (!product) return null;
    if (product.sizeChart && product.sizeChart.length > 0) return product;
    return (
      getProductSizeData(product.id) ||
      ACCESSORY_PRODUCTS.find((p) => p.name.toLowerCase() === (product.name || '').toLowerCase()) ||
      null
    );
  }, [product]);

  // State chọn size & số lượng mua
  const [selectedSize, setSelectedSize] = useState(() => {
    return productSizeInfo?.sizes?.[0] || 'S';
  });
  const [buyQty, setBuyQty] = useState(1);

  // State mở rộng bảng size chi tiết & công cụ tư vấn nhanh
  const [showFullTable, setShowFullTable] = useState(false);
  const [showQuickAdvisor, setShowQuickAdvisor] = useState(false);

  // State số đo cho công cụ tư vấn nhanh trong trang chi tiết
  const [petNeck, setPetNeck] = useState('');
  const [petChest, setPetChest] = useState('');
  const [petBack, setPetBack] = useState('');

  // Kết quả tư vấn nhanh theo sản phẩm cụ thể
  const quickAdviceResult = useMemo(() => {
    if (!productSizeInfo || !showQuickAdvisor) return null;
    return matchSizeForProduct(productSizeInfo, {
      neck: petNeck,
      chest: petChest,
      backLength: petBack,
    });
  }, [productSizeInfo, showQuickAdvisor, petNeck, petChest, petBack]);

  // Áp dụng size đề xuất từ công cụ tư vấn nhanh
  const handleApplySuggestedSize = (sizeStr) => {
    if (!sizeStr) return;
    const cleanSize = sizeStr.replace('Size ', '').trim();
    setSelectedSize(cleanSize);
  };

  // Xử lý thêm vào giỏ kèm size & số lượng đã chọn
  const handleAddToCartWithSize = () => {
    if (isSoldOut) return;
    const safeQty = Math.min(Math.max(1, buyQty), stock);
    if (onAddToCart) {
      onAddToCart({
        ...product,
        selectedSize: productSizeInfo ? selectedSize : undefined,
        quantity: safeQty,
      });
    }
  };

  // Xử lý mua ngay kèm size & số lượng đã chọn
  const handleBuyNowWithSize = () => {
    if (isSoldOut) return;
    const safeQty = Math.min(Math.max(1, buyQty), stock);
    if (onBuyNow) {
      onBuyNow({
        ...product,
        selectedSize: productSizeInfo ? selectedSize : undefined,
        quantity: safeQty,
      });
    } else if (onAddToCart) {
      onAddToCart({
        ...product,
        selectedSize: productSizeInfo ? selectedSize : undefined,
        quantity: safeQty,
      });
    }
  };

  if (!product) {
    return (
      <div className="container" style={{ padding: '60px 0', textAlign: 'center' }}>
        <h2>Không tìm thấy sản phẩm!</h2>
        <button className="btn-primary-cta" onClick={onBack} style={{ marginTop: '20px' }}>
          Quay lại danh sách
        </button>
      </div>
    );
  }

  // Tìm thông số chi tiết của size đang được chọn
  const currentSizeSpec = productSizeInfo?.sizeChart?.find((s) => s.size === selectedSize);

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      {/* Nút quay lại */}
      <button
        onClick={onBack}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: '700',
          color: '#ff6b35',
          marginBottom: '24px',
          fontSize: '0.95rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
        }}
      >
        ← Quay lại danh sách
      </button>

      <div className="product-detail-layout">
        {/* CỘT TRÁI: ẢNH LỚN + BADGE */}
        <div>
          <div
            style={{
              width: '100%',
              height: '420px',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              position: 'relative',
              background: '#f8fafc',
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: isSoldOut ? 'grayscale(45%)' : 'none',
              }}
            />
            {isSoldOut && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(15, 23, 42, 0.55)',
                  backdropFilter: 'blur(3px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 3,
                }}
              >
                <span
                  style={{
                    background: '#ef4444',
                    color: '#ffffff',
                    padding: '10px 26px',
                    borderRadius: '14px',
                    fontWeight: '800',
                    fontSize: '1.2rem',
                    letterSpacing: '0.08em',
                    boxShadow: '0 8px 24px rgba(239, 68, 68, 0.45)',
                    border: '2px solid rgba(255,255,255,0.9)',
                    transform: 'rotate(-4deg)',
                  }}
                >
                  SOLD OUT • HẾT HÀNG
                </span>
              </div>
            )}
            {product.badge && !isSoldOut && (
              <span
                className={`badge-pill-status ${product.badgeType || 'discount'}`}
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  background: '#ff6b35',
                  color: '#fff',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                }}
              >
                {product.badge}
              </span>
            )}
          </div>
        </div>

        {/* CỘT PHẢI: THÔNG TIN CHI TIẾT & BẢNG SIZE */}
        <div>
          {/* Danh mục */}
          {product.categoryName && (
            <div style={{ color: '#ff6b35', fontWeight: '700', fontSize: '0.9rem', marginBottom: '8px' }}>
              {product.categoryName}
            </div>
          )}

          {/* Tên sản phẩm */}
          <h1 style={{ fontSize: '1.9rem', fontWeight: '800', color: '#1e293b', marginBottom: '12px', lineHeight: '1.25' }}>
            {product.name}
          </h1>

          {/* Đánh giá & Tình trạng kho */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px', flexWrap: 'wrap' }}>
            {product.rating !== undefined && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#f59e0b', fontWeight: '700' }}>⭐ {product.rating}</span>
                {product.reviewsCount !== undefined && (
                  <span style={{ color: '#64748b', fontSize: '0.9rem' }}>({product.reviewsCount} đánh giá)</span>
                )}
              </div>
            )}
            <span
              style={{
                fontSize: '0.82rem',
                fontWeight: '700',
                padding: '3px 10px',
                borderRadius: '20px',
                background: isSoldOut ? '#fee2e2' : stock < 5 ? '#fef3c7' : '#ecfdf5',
                color: isSoldOut ? '#dc2626' : stock < 5 ? '#d97706' : '#10b981',
              }}
            >
              {isSoldOut
                ? '✕ Hết hàng (Tồn kho: 0)'
                : stock < 5
                ? `🔥 Sắp hết hàng (Chỉ còn ${stock})`
                : `✓ Còn hàng (Tồn kho: ${stock})`}
            </span>
          </div>

          {/* Giá tiền */}
          <div
            style={{
              background: '#fff7ed',
              padding: '12px 20px',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'baseline',
              gap: '12px',
              marginBottom: '20px',
            }}
          >
            <span style={{ fontSize: '2rem', fontWeight: '800', color: isSoldOut ? '#94a3b8' : '#ff6b35' }}>
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span style={{ fontSize: '1.15rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Mô tả sản phẩm */}
          <p style={{ color: '#475569', lineHeight: '1.65', marginBottom: '20px', fontSize: '0.94rem' }}>
            {product.description || 'Chưa có mô tả chi tiết.'}
          </p>

          {/* KHỐI KÍCH CỠ SẢN PHẨM (NẾU CÓ DỮ LIỆU SIZE) */}
          {productSizeInfo && (
            <div className="size-selector-container">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '0.92rem', fontWeight: '800', color: '#1e293b' }}>
                  Kích Cỡ (Size): <span style={{ color: '#ff6b35' }}>{selectedSize}</span>
                </label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {onOpenSizeAdvisor && (
                    <button
                      type="button"
                      onClick={() => onOpenSizeAdvisor(product)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#16a34a',
                        fontSize: '0.8rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        padding: 0,
                        textDecoration: 'underline',
                      }}
                    >
                      🔍 Mở Size Advisor
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowQuickAdvisor(!showQuickAdvisor)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ff6b35',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      padding: 0,
                      textDecoration: 'underline',
                    }}
                  >
                    📏 {showQuickAdvisor ? 'Ẩn tư vấn size' : 'Tư vấn chọn size nhanh'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowFullTable(!showFullTable)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#0284c7',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      padding: 0,
                      textDecoration: 'underline',
                    }}
                  >
                    📊 {showFullTable ? 'Ẩn bảng size' : 'Bảng size chi tiết'}
                  </button>
                </div>
              </div>

              {/* Danh sách các nút chọn size (Pills) */}
              <div className="size-pills-list">
                {productSizeInfo.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`size-pill-btn ${selectedSize === s ? 'active' : ''}`}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Thông số preview của size đang chọn */}
              {currentSizeSpec && (
                <div className="size-spec-preview">
                  <div style={{ fontWeight: '700', color: '#1e293b', marginBottom: '4px' }}>
                    {currentSizeSpec.label}:
                  </div>
                  {productSizeInfo.accessoryType === 'collar' && (
                    <div>
                      • Chiều dài dây: <strong>{currentSizeSpec.productLength}cm</strong> (Bản rộng: {currentSizeSpec.strapWidth}cm)<br />
                      • Vòng cổ thú cưng phù hợp: <strong>{currentSizeSpec.minPetNeck} - {currentSizeSpec.maxPetNeck} cm</strong><br />
                      • Cân nặng tham khảo: {currentSizeSpec.weightEstimate}
                    </div>
                  )}
                  {productSizeInfo.accessoryType === 'harness' && (
                    <div>
                      • Vòng ngực thú cưng phù hợp: <strong>{currentSizeSpec.minPetChest} - {currentSizeSpec.maxPetChest} cm</strong><br />
                      • Vòng cổ yếm: {currentSizeSpec.productNeck}cm | Phạm vi điều chỉnh: {currentSizeSpec.adjustmentRange}<br />
                      • Dây dắt kèm theo: dài {currentSizeSpec.leashLength}cm | Cân nặng: {currentSizeSpec.weightEstimate}
                    </div>
                  )}
                  {productSizeInfo.accessoryType === 'clothing' && (
                    <div>
                      • Kích thước áo: Ngực áo <strong>{currentSizeSpec.productChest}cm</strong>, Dài lưng áo <strong>{currentSizeSpec.productBack}cm</strong>, Cổ áo {currentSizeSpec.productNeck}cm<br />
                      • Số đo bé phù hợp: Ngực {currentSizeSpec.minPetChest} - {currentSizeSpec.maxPetChest}cm, Lưng {currentSizeSpec.minPetBack} - {currentSizeSpec.maxPetBack}cm<br />
                      • Cân nặng tham khảo: {currentSizeSpec.weightEstimate}
                    </div>
                  )}
                  <div style={{ marginTop: '4px', fontSize: '0.74rem', color: '#94a3b8', fontStyle: 'italic' }}>
                    * Ghi chú: {productSizeInfo.verificationNote}
                  </div>
                </div>
              )}

              {/* WIDGET TƯ VẤN SIZE NHANH NGAY TRONG TRANG CHI TIẾT */}
              {showQuickAdvisor && (
                <div className="quick-advisor-box">
                  <div style={{ fontWeight: '800', color: '#9a3412', fontSize: '0.88rem', marginBottom: '6px' }}>
                    📐 Nhập số đo thú cưng để đối chiếu size cho sản phẩm này:
                  </div>
                  <div className="quick-advisor-grid">
                    {productSizeInfo.accessoryType === 'collar' && (
                      <div>
                        <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569' }}>
                          Vòng cổ bé (cm):
                        </label>
                        <input
                          type="number"
                          placeholder="Ví dụ: 25"
                          value={petNeck}
                          onChange={(e) => setPetNeck(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '6px 10px',
                            borderRadius: '8px',
                            border: '1px solid #fed7aa',
                            marginTop: '2px',
                            fontSize: '0.85rem',
                          }}
                        />
                      </div>
                    )}
                    {(productSizeInfo.accessoryType === 'harness' || productSizeInfo.accessoryType === 'clothing') && (
                      <div>
                        <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569' }}>
                          Vòng ngực bé (cm):
                        </label>
                        <input
                          type="number"
                          placeholder="Ví dụ: 38"
                          value={petChest}
                          onChange={(e) => setPetChest(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '6px 10px',
                            borderRadius: '8px',
                            border: '1px solid #fed7aa',
                            marginTop: '2px',
                            fontSize: '0.85rem',
                          }}
                        />
                      </div>
                    )}
                    {productSizeInfo.accessoryType === 'clothing' && (
                      <div>
                        <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569' }}>
                          Chiều dài lưng (cm):
                        </label>
                        <input
                          type="number"
                          placeholder="Ví dụ: 28"
                          value={petBack}
                          onChange={(e) => setPetBack(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '6px 10px',
                            borderRadius: '8px',
                            border: '1px solid #fed7aa',
                            marginTop: '2px',
                            fontSize: '0.85rem',
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Kết quả tư vấn nhanh */}
                  {quickAdviceResult && (
                    <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #fed7aa' }}>
                      {quickAdviceResult.status === 'success' && (
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '0.9rem', color: '#16a34a', fontWeight: '800' }}>
                              ✓ Đề xuất: {quickAdviceResult.suggestedSize}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleApplySuggestedSize(quickAdviceResult.suggestedSize)}
                              style={{
                                background: '#ff6b35',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '4px 10px',
                                fontSize: '0.76rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                              }}
                            >
                              Chọn size này
                            </button>
                          </div>
                          <div style={{ fontSize: '0.78rem', color: '#475569', marginTop: '4px', lineHeight: '1.4' }}>
                            {quickAdviceResult.reason}
                          </div>
                          {quickAdviceResult.isBorderline && (
                            <div style={{ fontSize: '0.76rem', color: '#b45309', marginTop: '4px', fontWeight: '600' }}>
                              ⚠️ {quickAdviceResult.borderlineNote}
                            </div>
                          )}
                        </div>
                      )}
                      {quickAdviceResult.status === 'waiting_input' && (
                        <div style={{ fontSize: '0.78rem', color: '#b45309' }}>
                          ℹ️ {quickAdviceResult.message}
                        </div>
                      )}
                      {quickAdviceResult.status === 'out_of_range' && (
                        <div style={{ fontSize: '0.78rem', color: '#dc2626' }}>
                          ⚠️ {quickAdviceResult.suggestedSize}: {quickAdviceResult.reason}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* BẢNG SIZE TOÀN BỘ CỦA SẢN PHẨM */}
              {showFullTable && (
                <div style={{ marginTop: '16px', overflowX: 'auto' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: '800', color: '#9a3412', marginBottom: '6px' }}>
                    BẢNG THÔNG SỐ KÍCH THƯỚC CHUẨN - {product.name.toUpperCase()}
                  </div>
                  <table className="product-size-table">
                    <thead>
                      <tr>
                        <th>Size</th>
                        {productSizeInfo.accessoryType === 'collar' && <th>Dài dây (cm)</th>}
                        {productSizeInfo.accessoryType === 'collar' && <th>Vòng cổ vừa (cm)</th>}
                        {productSizeInfo.accessoryType === 'collar' && <th>Bản rộng</th>}
                        {productSizeInfo.accessoryType === 'harness' && <th>Vòng ngực vừa (cm)</th>}
                        {productSizeInfo.accessoryType === 'harness' && <th>Vòng cổ yếm (cm)</th>}
                        {productSizeInfo.accessoryType === 'harness' && <th>Điều chỉnh</th>}
                        {productSizeInfo.accessoryType === 'clothing' && <th>Ngực áo (cm)</th>}
                        {productSizeInfo.accessoryType === 'clothing' && <th>Dài lưng áo (cm)</th>}
                        {productSizeInfo.accessoryType === 'clothing' && <th>Ngực bé vừa (cm)</th>}
                        <th>Cân nặng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productSizeInfo.sizeChart.map((row) => {
                        const isCurrent = row.size === selectedSize;
                        return (
                          <tr key={row.size} className={isCurrent ? 'active-size-row' : ''}>
                            <td>{row.size} {isCurrent && '👈'}</td>
                            {productSizeInfo.accessoryType === 'collar' && <td>{row.productLength} cm</td>}
                            {productSizeInfo.accessoryType === 'collar' && <td>{row.minPetNeck} - {row.maxPetNeck} cm</td>}
                            {productSizeInfo.accessoryType === 'collar' && <td>{row.strapWidth} cm</td>}
                            {productSizeInfo.accessoryType === 'harness' && <td>{row.minPetChest} - {row.maxPetChest} cm</td>}
                            {productSizeInfo.accessoryType === 'harness' && <td>{row.productNeck} cm</td>}
                            {productSizeInfo.accessoryType === 'harness' && <td>{row.adjustmentRange}</td>}
                            {productSizeInfo.accessoryType === 'clothing' && <td>{row.productChest} cm</td>}
                            {productSizeInfo.accessoryType === 'clothing' && <td>{row.productBack} cm</td>}
                            {productSizeInfo.accessoryType === 'clothing' && <td>{row.minPetChest} - {row.maxPetChest} cm</td>}
                            <td>{row.weightEstimate}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '6px' }}>
                    * Ghi chú: {productSizeInfo.verificationNote}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Chọn số lượng (chặn vượt quá tồn kho) */}
          {!isSoldOut && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '14px', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#475569' }}>Số lượng:</span>
              <div style={{ display: 'inline-flex', alignItems: 'center', border: '1.5px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
                <button
                  type="button"
                  onClick={() => setBuyQty((q) => Math.max(1, q - 1))}
                  style={{ padding: '6px 14px', background: '#f8fafc', border: 'none', cursor: 'pointer', fontWeight: '700', fontSize: '1rem' }}
                >
                  -
                </button>
                <span style={{ padding: '6px 16px', fontWeight: '800', fontSize: '0.95rem', color: '#1e293b' }}>
                  {Math.min(buyQty, stock)}
                </span>
                <button
                  type="button"
                  disabled={buyQty >= stock}
                  onClick={() => setBuyQty((q) => Math.min(stock, q + 1))}
                  style={{
                    padding: '6px 14px',
                    background: '#f8fafc',
                    border: 'none',
                    cursor: buyQty >= stock ? 'not-allowed' : 'pointer',
                    fontWeight: '700',
                    fontSize: '1rem',
                    opacity: buyQty >= stock ? 0.45 : 1,
                  }}
                >
                  +
                </button>
              </div>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>(Tối đa {stock})</span>
            </div>
          )}

          {/* Các nút hành động: Thêm vào giỏ & Mua ngay */}
          <div style={{ display: 'flex', gap: '14px', marginTop: '10px' }}>
            <button
              className="btn-primary-cta"
              disabled={isSoldOut}
              onClick={handleAddToCartWithSize}
              style={{
                padding: '14px 28px',
                fontSize: '1rem',
                flex: 1,
                opacity: isSoldOut ? 0.55 : 1,
                cursor: isSoldOut ? 'not-allowed' : 'pointer',
                background: isSoldOut ? '#94a3b8' : undefined,
              }}
            >
              {isSoldOut ? 'Hết hàng' : `🛒 Thêm vào giỏ ${productSizeInfo ? `(${selectedSize})` : ''}`}
            </button>
            <button
              type="button"
              disabled={isSoldOut}
              onClick={handleBuyNowWithSize}
              style={{
                background: isSoldOut ? '#cbd5e1' : '#ea580c',
                color: isSoldOut ? '#475569' : '#ffffff',
                border: 'none',
                borderRadius: '14px',
                padding: '14px 28px',
                fontSize: '1rem',
                fontWeight: '700',
                cursor: isSoldOut ? 'not-allowed' : 'pointer',
                flex: 1,
              }}
            >
              {isSoldOut ? 'Hết hàng' : '⚡ Mua ngay'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
