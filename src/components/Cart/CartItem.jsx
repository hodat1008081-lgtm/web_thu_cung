// src/components/Cart/CartItem.jsx
// Nhiệm vụ: Trâm - Component hiển thị từng món hàng trong giỏ kèm kiểm tra tồn kho
import { formatCurrency } from '../../data/products';

export default function CartItem({ item, maxStock, onUpdateQty, onRemoveItem }) {
  if (!item) return null;

  const effectiveMaxStock = typeof maxStock === 'number' ? maxStock : (item.stock ?? 99);
  const reachedMax = item.quantity >= effectiveMaxStock;

  return (
    <div className="cart-item-row">
      <img src={item.image} alt={item.name} className="cart-item-thumb" />

      <div className="cart-item-details">
        <div className="cart-item-name" title={item.name}>
          {item.name}
          {item.selectedSize && (
            <span style={{ marginLeft: '6px', fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>
              (Size {item.selectedSize})
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span className="cart-item-price">{formatCurrency(item.price)}</span>
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: '700',
              color: effectiveMaxStock <= 0 ? '#dc2626' : reachedMax ? '#d97706' : '#64748b',
              background: effectiveMaxStock <= 0 ? '#fee2e2' : reachedMax ? '#fef3c7' : '#f1f5f9',
              padding: '1px 6px',
              borderRadius: '6px',
            }}
          >
            {effectiveMaxStock <= 0
              ? 'Hết hàng'
              : reachedMax
              ? `Tối đa kho (${effectiveMaxStock})`
              : `Kho còn: ${effectiveMaxStock}`}
          </span>
        </div>
      </div>

      <div className="cart-qty-ctrls">
        <button
          className="cart-qty-btn"
          onClick={() => onUpdateQty && onUpdateQty(item.id, -1, item.selectedSize)}
          title="Giảm 1"
        >
          -
        </button>

        <span style={{ fontWeight: '700', minWidth: '18px', textAlign: 'center', fontSize: '0.9rem' }}>
          {item.quantity}
        </span>

        <button
          className="cart-qty-btn"
          disabled={reachedMax}
          onClick={() => onUpdateQty && onUpdateQty(item.id, 1, item.selectedSize)}
          title={reachedMax ? `Không thể vượt quá tồn kho (${effectiveMaxStock})` : 'Tăng 1'}
          style={{
            opacity: reachedMax ? 0.45 : 1,
            cursor: reachedMax ? 'not-allowed' : 'pointer',
          }}
        >
          +
        </button>

        {onRemoveItem && (
          <button
            onClick={() => onRemoveItem(item.id, item.selectedSize)}
            style={{ color: '#ef4444', marginLeft: '6px', fontSize: '0.85rem' }}
            title="Xóa món này"
          >
            🗑️
          </button>
        )}
      </div>
    </div>
  );
}
