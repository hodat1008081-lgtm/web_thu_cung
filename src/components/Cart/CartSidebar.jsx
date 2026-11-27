// src/components/Cart/CartSidebar.jsx
// Nhiệm vụ: Trâm - Giỏ hàng thông minh & Quản lý đơn hàng dự kiến
import CartItem from './CartItem';
import CartCheckbox from './CartCheckbox';
import { formatCurrency } from '../../data/products';

export default function CartSidebar({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQty,
  onRemoveItem,
  onToggleSelect,
  onToggleSelectAll,
  onProceedCheckout,
}) {
  if (!isOpen) return null;

  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const selectedItems = cartItems.filter((item) => item.selected !== false);
  const selectedCount = selectedItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const hasSelectedItems = selectedItems.length > 0;
  const isFreeShip = hasSelectedItems && totalPrice >= 500000;
  const shippingFee = hasSelectedItems ? (isFreeShip ? 0 : 50000) : 0;
  const finalTotal = totalPrice + shippingFee;
  const allSelected = cartItems.length > 0 && selectedItems.length === cartItems.length;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} title="Đóng giỏ hàng">
          ✕
        </button>

        <h3 className="modal-title">Giỏ Hàng Của Bạn 🛒</h3>
        <p className="modal-subtitle">
          {cartItems.length === 0
            ? 'Hiện chưa có sản phẩm nào'
            : `Đang có ${totalCount} bé cưng/sản phẩm (${selectedCount} đã chọn thanh toán)`}
        </p>

        {cartItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '36px 0' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '12px' }}>🛍️</div>
            <p style={{ color: '#64748b', marginBottom: '20px' }}>
              Giỏ hàng của bạn đang trống! Hãy khám phá các bé cún, mèo siêu yêu tại PetCare Joy nhé.
            </p>
            <button className="btn-primary-cta" onClick={onClose}>
              Tiếp tục mua sắm
            </button>
          </div>
        ) : (
          <>
            {/* Thanh chọn tất cả sản phẩm */}
            <div className="cart-select-all-bar flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <CartCheckbox
                  checked={allSelected}
                  onChange={(checked) => onToggleSelectAll && onToggleSelectAll(checked)}
                  ariaLabel="Chọn tất cả sản phẩm trong giỏ hàng"
                  title={allSelected ? 'Bỏ chọn tất cả' : 'Chọn tất cả sản phẩm'}
                />
                <button
                  type="button"
                  onClick={() => onToggleSelectAll && onToggleSelectAll(!allSelected)}
                  className="text-sm font-semibold text-slate-700 cursor-pointer"
                >
                  Chọn tất cả ({selectedItems.length}/{cartItems.length})
                </button>
              </div>
              <span className="text-xs text-slate-500">
                Đã chọn {selectedCount} món
              </span>
            </div>

            {/* Danh sách các CartItem */}
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  isSelected={item.selected !== false}
                  onToggleSelect={onToggleSelect}
                  onUpdateQty={onUpdateQty}
                  onRemoveItem={onRemoveItem}
                />
              ))}
            </div>

            {/* Bảng tổng tiền & phí giao hàng */}
            <div className="cart-total-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#64748b', marginBottom: '6px' }}>
                <span>Tạm tính ({selectedCount} món đã chọn):</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#64748b', marginBottom: '10px' }}>
                <span>Phí vận chuyển chuồng chuyên dụng:</span>
                <span style={{ color: isFreeShip ? '#10b981' : '#ff6b35', fontWeight: '700' }}>
                  {!hasSelectedItems ? '0 ₫' : isFreeShip ? 'MIỄN PHÍ' : '50.000 ₫'}
                </span>
              </div>

              <div className="cart-total-row">
                <span>Tổng cộng:</span>
                <span>{formatCurrency(finalTotal)}</span>
              </div>

              <div style={{ fontSize: '0.8rem', color: '#10b981', marginTop: '8px' }}>
                ✓ Tặng kèm bảo hiểm sức khỏe 30 ngày & sổ theo dõi tiêm phòng.
              </div>
            </div>

            {/* Nút hành động */}
            <button
              className={`submit-btn-full transition-all duration-200 ${
                !hasSelectedItems ? 'opacity-60 cursor-not-allowed' : ''
              }`}
              disabled={!hasSelectedItems}
              onClick={() => {
                if (hasSelectedItems && onProceedCheckout) {
                  onProceedCheckout();
                }
              }}
            >
              {hasSelectedItems
                ? `Tiến Hành Đặt Hàng & Thanh Toán (${selectedCount}) →`
                : 'Vui lòng chọn ít nhất 1 sản phẩm để thanh toán'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
