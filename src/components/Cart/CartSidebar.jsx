// src/components/Cart/CartSidebar.jsx
// Nhiệm vụ: Trâm - Giỏ hàng thông minh & Bắt buộc đăng nhập mới được thanh toán
import CartItem from './CartItem';
import { formatCurrency } from '../../data/products';
import { useStore } from '../../context/StoreContext';

export default function CartSidebar({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQty,
  onRemoveItem,
  onProceedCheckout,
}) {
  const { currentUser, products } = useStore();

  if (!isOpen) return null;

  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const isFreeShip = totalPrice >= 500000;

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
            : `Đang có ${totalCount} bé cưng/sản phẩm được chọn`}
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
            {/* Cảnh báo nếu khách vãng lai chưa đăng nhập */}
            {!currentUser && (
              <div
                style={{
                  background: '#fffbeb',
                  border: '1px solid #fde68a',
                  color: '#92400e',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  marginBottom: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>🔒</span>
                <span>Bạn cần đăng nhập tài khoản thành viên để tiến hành thanh toán đơn hàng.</span>
              </div>
            )}

            {/* Danh sách các CartItem kèm tồn kho thời gian thực */}
            <div className="cart-items-list">
              {cartItems.map((item) => {
                const storeProduct = products.find((p) => p.id === item.id);
                const maxStock = storeProduct ? storeProduct.stock : (item.stock ?? 99);
                return (
                  <CartItem
                    key={`${item.id}_${item.selectedSize || 'default'}`}
                    item={item}
                    maxStock={maxStock}
                    onUpdateQty={onUpdateQty}
                    onRemoveItem={onRemoveItem}
                  />
                );
              })}
            </div>

            {/* Bảng tổng tiền & phí giao hàng */}
            <div className="cart-total-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#64748b', marginBottom: '6px' }}>
                <span>Tạm tính ({totalCount} món):</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#64748b', marginBottom: '10px' }}>
                <span>Phí vận chuyển chuồng chuyên dụng:</span>
                <span style={{ color: isFreeShip ? '#10b981' : '#ff6b35', fontWeight: '700' }}>
                  {isFreeShip ? 'MIỄN PHÍ' : '50.000 ₫'}
                </span>
              </div>

              <div className="cart-total-row">
                <span>Tổng cộng:</span>
                <span>{formatCurrency(isFreeShip ? totalPrice : totalPrice + 50000)}</span>
              </div>

              <div style={{ fontSize: '0.8rem', color: '#10b981', marginTop: '8px' }}>
                ✓ Tặng kèm bảo hiểm sức khỏe 30 ngày & sổ theo dõi tiêm phòng.
              </div>
            </div>

            {/* Nút hành động */}
            <button
              className="submit-btn-full"
              onClick={() => {
                if (onProceedCheckout) {
                  onProceedCheckout();
                }
              }}
            >
              {currentUser ? 'Tiến Hành Đặt Hàng & Thanh Toán →' : '🔐 Đăng Nhập Để Thanh Toán →'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
