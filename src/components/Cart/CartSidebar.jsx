// src/components/Cart/CartSidebar.jsx
// Nhiệm vụ: Trâm - Giỏ hàng thông minh & Quản lý đơn hàng dự kiến
import React from 'react';
import CartItem from './CartItem';
import { formatCurrency } from '../../data/products';

export default function CartSidebar({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQty,
  onRemoveItem,
  onProceedCheckout,
}) {
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
            {/* Danh sách các CartItem */}
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQty={onUpdateQty}
                  onRemoveItem={onRemoveItem}
                />
              ))}
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
              Tiến Hành Đặt Hàng & Thanh Toán →
            </button>
          </>
        )}
      </div>
    </div>
  );
}
