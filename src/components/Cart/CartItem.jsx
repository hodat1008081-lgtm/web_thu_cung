// src/components/Cart/CartItem.jsx
// Nhiệm vụ: Trâm - Component hiển thị từng món hàng trong giỏ
import { formatCurrency } from '../../data/products';
import CartCheckbox from './CartCheckbox';

export default function CartItem({
  item,
  isSelected,
  onToggleSelect,
  onUpdateQty,
  onRemoveItem,
}) {
  if (!item) return null;

  const checked = typeof isSelected === 'boolean' ? isSelected : item.selected !== false;

  return (
    <div
      className={`cart-item-row flex items-center gap-3.5 pb-3.5 border-b border-slate-100 transition-all duration-200 ${
        checked ? 'opacity-100' : 'opacity-60'
      }`}
    >
      <CartCheckbox
        checked={checked}
        onChange={() => onToggleSelect && onToggleSelect(item.id)}
        ariaLabel={`Chọn ${item.name}`}
        title={checked ? 'Bỏ chọn sản phẩm này' : 'Chọn sản phẩm này để thanh toán'}
      />

      <img src={item.image} alt={item.name} className="cart-item-thumb" />

      <div className="cart-item-details">
        <div className="cart-item-name" title={item.name}>
          {item.name}
        </div>
        <div className="cart-item-price">{formatCurrency(item.price)}</div>
      </div>

      <div className="cart-qty-ctrls">
        <button
          className="cart-qty-btn"
          onClick={() => onUpdateQty && onUpdateQty(item.id, -1)}
          title="Giảm 1"
        >
          -
        </button>

        <span style={{ fontWeight: '700', minWidth: '18px', textAlign: 'center', fontSize: '0.9rem' }}>
          {item.quantity}
        </span>

        <button
          className="cart-qty-btn"
          onClick={() => onUpdateQty && onUpdateQty(item.id, 1)}
          title="Tăng 1"
        >
          +
        </button>

        {onRemoveItem && (
          <button
            onClick={() => onRemoveItem(item.id)}
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
