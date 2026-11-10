// src/pages/Checkout/PaymentMethods.jsx
// Nhiệm vụ: Hiển - Tích hợp các cổng thanh toán & xác nhận đặt hàng
import React, { useState } from 'react';
import { formatCurrency } from '../../data/products';

export default function PaymentMethods({
  cartItems = [],
  customerInfo = {},
  onConfirmOrder,
  onBackToForm,
}) {
  const [selectedMethod, setSelectedMethod] = useState('cod');

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = totalPrice >= 500000 ? 0 : 50000;
  const finalTotal = totalPrice + shippingFee;

  const paymentOptions = [
    {
      id: 'cod',
      icon: '💵',
      title: 'Thanh toán khi nhận hàng (COD)',
      description: 'Kiểm tra sức khỏe bé cún/mèo cùng bác sĩ thú y trước khi thanh toán tiền mặt.',
    },
    {
      id: 'qr',
      icon: '🏦',
      title: 'Chuyển khoản QR Ngân hàng (Miễn phí)',
      description: 'Quét mã VietQR qua app ngân hàng, hệ thống tự động xác nhận sau 10 giây.',
    },
    {
      id: 'momo',
      icon: '👛',
      title: 'Ví Điện Tử MoMo',
      description: 'Thanh toán nhanh chóng và an toàn qua ứng dụng MoMo.',
    },
    {
      id: 'card',
      icon: '💳',
      title: 'Thẻ Quốc Tế Visa / MasterCard / JCB',
      description: 'Hỗ trợ thẻ tín dụng và thẻ ghi nợ quốc tế bảo mật 3D Secure.',
    },
  ];

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      alert('Giỏ hàng trống! Vui lòng chọn sản phẩm trước khi thanh toán.');
      return;
    }

    const orderData = {
      orderId: `PET-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toLocaleTimeString('vi-VN') + ' ' + new Date().toLocaleDateString('vi-VN'),
      customer: customerInfo,
      items: cartItems,
      totalAmount: finalTotal,
      paymentMethod: selectedMethod,
      status: 'confirmed',
    };

    if (onConfirmOrder) {
      onConfirmOrder(orderData);
    }
  };

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '24px',
        padding: '30px',
        border: '1px solid #f1f5f9',
        boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
      }}
    >
      <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>
        💳 2. Phương Thức Thanh Toán
      </h3>
      <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '24px' }}>
        Vui lòng chọn hình thức thanh toán an toàn phù hợp nhất với bạn.
      </p>

      {/* Danh sách lựa chọn phương thức thanh toán */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '30px' }}>
        {paymentOptions.map((opt) => (
          <div
            key={opt.id}
            onClick={() => setSelectedMethod(opt.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '16px 20px',
              borderRadius: '16px',
              border: `2px solid ${selectedMethod === opt.id ? '#ff6b35' : '#e2e8f0'}`,
              background: selectedMethod === opt.id ? '#fff9f6' : '#ffffff',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <input
              type="radio"
              name="payment"
              checked={selectedMethod === opt.id}
              onChange={() => setSelectedMethod(opt.id)}
              style={{ accentColor: '#ff6b35', transform: 'scale(1.2)' }}
            />
            <span style={{ fontSize: '1.6rem' }}>{opt.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '700', color: '#1e293b', fontSize: '0.98rem' }}>{opt.title}</div>
              <div style={{ fontSize: '0.82rem', color: '#64748b' }}>{opt.description}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tóm tắt thanh toán */}
      <div
        style={{
          background: '#f8fafc',
          padding: '20px',
          borderRadius: '16px',
          marginBottom: '24px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.92rem' }}>
          <span style={{ color: '#64748b' }}>Tổng giá trị thú cưng/sản phẩm:</span>
          <strong>{formatCurrency(totalPrice)}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.92rem' }}>
          <span style={{ color: '#64748b' }}>Phí vận chuyển chuồng điều hòa:</span>
          <strong style={{ color: shippingFee === 0 ? '#10b981' : '#1e293b' }}>
            {shippingFee === 0 ? 'MIỄN PHÍ' : formatCurrency(shippingFee)}
          </strong>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: '12px',
            borderTop: '1px dashed #cbd5e1',
            fontSize: '1.25rem',
            fontWeight: '800',
            color: '#ff6b35',
          }}
        >
          <span>Tổng tiền thanh toán:</span>
          <span>{formatCurrency(finalTotal)}</span>
        </div>
      </div>

      {/* Nhóm nút điều hướng */}
      <div style={{ display: 'flex', gap: '14px' }}>
        {onBackToForm && (
          <button
            type="button"
            className="btn-secondary-cta"
            onClick={onBackToForm}
            style={{ flex: '0 0 auto' }}
          >
            ← Quay lại
          </button>
        )}
        <button
          type="button"
          className="submit-btn-full"
          onClick={handlePlaceOrder}
          style={{ flex: 1, margin: 0 }}
        >
          🐾 Hoàn Tất & Xác Nhận Đơn Hàng
        </button>
      </div>
    </div>
  );
}
