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
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  // Quản lý voucher / mã giảm giá
  const [voucherInput, setVoucherInput] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [voucherMessage, setVoucherMessage] = useState(null);

  // Form thẻ tín dụng giả lập
  const [cardInfo, setCardInfo] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  // Danh sách voucher có sẵn trong hệ thống
  const AVAILABLE_VOUCHERS = [
    {
      code: 'PETJOY10',
      label: 'Giảm 10%',
      desc: 'Giảm 10% giá trị đơn hàng (Tối đa 250.000đ)',
      type: 'percent',
      value: 10,
      max: 250000,
    },
    {
      code: 'FREESHIP',
      label: 'Free Ship',
      desc: 'Miễn phí vận chuyển xe điều hòa toàn quốc',
      type: 'shipping',
    },
    {
      code: 'CHAOBANMOI',
      label: 'Giảm 50K',
      desc: 'Giảm ngay 50.000đ cho ba mẹ đón bé đầu tiên',
      type: 'fixed',
      value: 50000,
    },
  ];

  // Tính toán chi phí
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const rawShippingFee = totalPrice >= 500000 ? 0 : 50000;

  // Tính giảm giá từ voucher
  let discountAmount = 0;
  let finalShippingFee = rawShippingFee;

  if (appliedVoucher) {
    if (appliedVoucher.type === 'shipping') {
      discountAmount = rawShippingFee;
      finalShippingFee = 0;
    } else if (appliedVoucher.type === 'percent') {
      discountAmount = Math.min(Math.round(totalPrice * (appliedVoucher.value / 100)), appliedVoucher.max || Infinity);
    } else if (appliedVoucher.type === 'fixed') {
      discountAmount = Math.min(appliedVoucher.value, totalPrice);
    }
  }

  const finalTotal = Math.max(0, totalPrice + finalShippingFee - (appliedVoucher?.type === 'shipping' ? 0 : discountAmount));

  // Thông tin chuyển khoản VietQR & MoMo
  const transferContent = `PETCARE ${customerInfo.phone ? customerInfo.phone.replace(/\s+/g, '') : 'JOY88'}`;
  const vietQrUrl = `https://img.vietqr.io/image/MB-0988666888-compact2.png?amount=${finalTotal}&addInfo=${encodeURIComponent(transferContent)}&accountName=PETCARE%20JOY%20VIETNAM`;
  const momoQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=2|99|0988666888|PETCARE%20JOY||0|0|${finalTotal}|${encodeURIComponent(transferContent)}|transfer_myqr`;

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
      title: 'Chuyển khoản QR Ngân hàng (VietQR)',
      description: 'Quét mã VietQR qua app ngân hàng, hệ thống tự động xác nhận sau 10 giây.',
    },
    {
      id: 'momo',
      icon: '👛',
      title: 'Ví Điện Tử MoMo',
      description: 'Thanh toán siêu tốc & an toàn với ví điện tử MoMo trên điện thoại.',
    },
    {
      id: 'card',
      icon: '💳',
      title: 'Thẻ Quốc Tế Visa / MasterCard / JCB',
      description: 'Hỗ trợ thẻ tín dụng & ghi nợ quốc tế bảo mật chuẩn PCI-DSS & 3D Secure.',
    },
  ];

  // Xử lý áp dụng mã giảm giá
  const handleApplyVoucher = (codeToApply) => {
    const code = (codeToApply || voucherInput).trim().toUpperCase();
    if (!code) {
      setVoucherMessage({ type: 'error', text: 'Vui lòng nhập mã giảm giá!' });
      return;
    }

    const found = AVAILABLE_VOUCHERS.find((v) => v.code === code);
    if (found) {
      setAppliedVoucher(found);
      setVoucherInput(code);
      setVoucherMessage({ type: 'success', text: `Đã áp dụng mã "${code}": ${found.desc}` });
    } else {
      setVoucherMessage({ type: 'error', text: `Mã giảm giá "${code}" không tồn tại hoặc đã hết hạn!` });
    }
  };

  const handleRemoveVoucher = () => {
    setAppliedVoucher(null);
    setVoucherInput('');
    setVoucherMessage(null);
  };

  // Sao chép nhanh văn bản
  const handleCopyText = (text, fieldKey) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedField(fieldKey);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Format số thẻ quốc tế
  const handleCardNumberChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardInfo((prev) => ({ ...prev, number: formatted }));
  };

  // Format ngày hết hạn thẻ MM/YY
  const handleCardExpiryChange = (e) => {
    let raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      raw = raw.slice(0, 2) + '/' + raw.slice(2);
    }
    setCardInfo((prev) => ({ ...prev, expiry: raw }));
  };

  // Xác nhận đặt hàng với loading 1.5s
  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      alert('Giỏ hàng trống! Vui lòng chọn sản phẩm trước khi thanh toán.');
      return;
    }

    if (selectedMethod === 'card') {
      if (!cardInfo.number || cardInfo.number.replace(/\s/g, '').length < 16) {
        alert('Vui lòng nhập đủ 16 số trên thẻ quốc tế!');
        return;
      }
      if (!cardInfo.expiry || cardInfo.expiry.length < 5) {
        alert('Vui lòng nhập ngày hết hạn thẻ (MM/YY)!');
        return;
      }
      if (!cardInfo.cvv || cardInfo.cvv.length < 3) {
        alert('Vui lòng nhập mã bảo mật CVV (3 chữ số)!');
        return;
      }
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const orderData = {
        orderId: `PET-${Date.now().toString().slice(-6)}`,
        createdAt: new Date().toLocaleTimeString('vi-VN') + ' ' + new Date().toLocaleDateString('vi-VN'),
        customer: customerInfo,
        items: cartItems,
        totalAmount: finalTotal,
        discountAmount: discountAmount,
        voucherCode: appliedVoucher ? appliedVoucher.code : null,
        paymentMethod: selectedMethod,
        cardDetails: selectedMethod === 'card' ? { ...cardInfo, cvv: '***' } : null,
        status: 'confirmed',
      };

      if (onConfirmOrder) {
        onConfirmOrder(orderData);
      }
    }, 1500);
  };

  return (
    <div className="payment-methods-card">
      <style>{`
        .payment-methods-card {
          background: #ffffff;
          border-radius: 24px;
          padding: 30px;
          border: 1px solid #f1f5f9;
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
          font-family: inherit;
        }

        .pm-method-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 16px 20px;
          border-radius: 16px;
          border: 2px solid #e2e8f0;
          background: #ffffff;
          cursor: pointer;
          transition: all 0.25s ease;
          user-select: none;
        }

        .pm-method-item:hover {
          border-color: #cbd5e1;
          transform: translateY(-1px);
        }

        .pm-method-item.selected {
          border-color: #ff6b35;
          background: #fff9f6;
          box-shadow: 0 4px 14px rgba(255, 107, 53, 0.08);
        }

        .pm-detail-panel {
          margin-top: 14px;
          padding: 18px 20px;
          border-radius: 14px;
          animation: pmFadeIn 0.3s ease;
        }

        @keyframes pmFadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .pm-copy-btn {
          background: #e2e8f0;
          color: #334155;
          border: none;
          padding: 3px 10px;
          border-radius: 6px;
          font-size: 0.76rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .pm-copy-btn:hover {
          background: #cbd5e1;
        }

        .pm-copy-btn.copied {
          background: #10b981;
          color: #ffffff;
        }

        .pm-voucher-tag {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #fff1eb;
          color: #ff6b35;
          border: 1px dashed #ffbca1;
          padding: 4px 10px;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }

        .pm-voucher-tag:hover {
          background: #ff6b35;
          color: #ffffff;
          border-color: #ff6b35;
        }

        .pm-card-input {
          width: 100%;
          padding: 10px 14px;
          border: 1.5px solid #cbd5e1;
          border-radius: 10px;
          font-size: 0.92rem;
          outline: none;
          transition: border-color 0.2s;
        }

        .pm-card-input:focus {
          border-color: #ff6b35;
          box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.12);
        }

        .pm-spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255, 255, 255, 0.35);
          border-radius: 50%;
          border-top-color: #ffffff;
          animation: pmSpin 0.8s linear infinite;
        }

        @keyframes pmSpin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 640px) {
          .payment-methods-card {
            padding: 20px 16px;
            border-radius: 18px;
          }

          .pm-actions-row {
            flex-direction: column-reverse;
          }

          .pm-actions-row button {
            width: 100% !important;
          }

          .pm-qr-flex {
            flex-direction: column;
            text-align: center;
          }

          .pm-qr-img {
            margin: 0 auto;
          }

          .pm-card-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* Tiêu đề & Giới thiệu */}
      <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>
        💳 2. Phương Thức Thanh Toán
      </h3>
      <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '24px' }}>
        Vui lòng chọn hình thức thanh toán an toàn, bảo mật & phù hợp nhất với bạn.
      </p>

      {/* Danh sách các phương thức thanh toán */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '26px' }}>
        {paymentOptions.map((opt) => {
          const isSelected = selectedMethod === opt.id;
          return (
            <div
              key={opt.id}
              className={`pm-method-item ${isSelected ? 'selected' : ''}`}
              onClick={() => setSelectedMethod(opt.id)}
            >
              <input
                type="radio"
                name="payment"
                checked={isSelected}
                onChange={() => setSelectedMethod(opt.id)}
                style={{ accentColor: '#ff6b35', transform: 'scale(1.2)', marginTop: '4px' }}
              />
              <span style={{ fontSize: '1.6rem', lineHeight: '1' }}>{opt.icon}</span>

              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '700', color: '#1e293b', fontSize: '0.98rem' }}>{opt.title}</div>
                <div style={{ fontSize: '0.83rem', color: '#64748b', marginTop: '2px' }}>{opt.description}</div>

                {/* ========================================================
                    CHI TIẾT: COD
                   ======================================================== */}
                {isSelected && opt.id === 'cod' && (
                  <div
                    className="pm-detail-panel"
                    style={{
                      background: '#f0fdf4',
                      border: '1px solid #bbf7d0',
                      color: '#166534',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', marginBottom: '6px' }}>
                      <span>🩺</span> Quy trình nhận bé an tâm tại PetCare Joy:
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.85rem', lineHeight: '1.6' }}>
                      <li>Bác sĩ thú y đi kèm xe chuyên dụng giao bé đến tận nhà bạn.</li>
                      <li>Khách hàng được đo nhiệt độ, kiểm tra mắt, mũi, tai, răng và đối chiếu sổ tiêm chủng trước.</li>
                      <li>Ký cam kết bảo hành sức khỏe 30 ngày rồi mới thanh toán tiền mặt cho nhân viên.</li>
                    </ul>
                  </div>
                )}

                {/* ========================================================
                    CHI TIẾT: VIETQR (NGÂN HÀNG)
                   ======================================================== */}
                {isSelected && opt.id === 'qr' && (
                  <div
                    className="pm-detail-panel"
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                    }}
                  >
                    <div className="pm-qr-flex" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                      <div className="pm-qr-img" style={{ flexShrink: 0, textAlign: 'center' }}>
                        <img
                          src={vietQrUrl}
                          alt="VietQR PetCare Joy"
                          style={{
                            width: '180px',
                            height: '180px',
                            borderRadius: '12px',
                            border: '1px solid #cbd5e1',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                            background: '#ffffff',
                            objectFit: 'contain',
                          }}
                        />
                        <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '6px' }}>
                          Mã QR tự động cập nhật số tiền
                        </div>
                      </div>

                      <div style={{ flex: 1, fontSize: '0.87rem' }}>
                        <div style={{ fontWeight: '700', color: '#0284c7', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981' }}></span>
                          Quét mã VietQR trên bất kỳ ứng dụng ngân hàng nào
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '8px 12px', alignItems: 'center' }}>
                          <span style={{ color: '#64748b' }}>Ngân hàng:</span>
                          <strong>MB Bank (Quân Đội)</strong>
                          <span></span>

                          <span style={{ color: '#64748b' }}>Số tài khoản:</span>
                          <strong style={{ color: '#ff6b35', fontSize: '1rem', letterSpacing: '0.5px' }}>0988 666 888</strong>
                          <button
                            type="button"
                            className={`pm-copy-btn ${copiedField === 'stk' ? 'copied' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyText('0988666888', 'stk');
                            }}
                          >
                            {copiedField === 'stk' ? '✓ Đã chép' : 'Sao chép'}
                          </button>

                          <span style={{ color: '#64748b' }}>Chủ TK:</span>
                          <strong style={{ textTransform: 'uppercase' }}>PETCARE JOY VIETNAM</strong>
                          <span></span>

                          <span style={{ color: '#64748b' }}>Số tiền:</span>
                          <strong style={{ color: '#059669', fontSize: '1.05rem' }}>{formatCurrency(finalTotal)}</strong>
                          <button
                            type="button"
                            className={`pm-copy-btn ${copiedField === 'amount' ? 'copied' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyText(finalTotal.toString(), 'amount');
                            }}
                          >
                            {copiedField === 'amount' ? '✓ Đã chép' : 'Sao chép'}
                          </button>

                          <span style={{ color: '#64748b' }}>Nội dung CK:</span>
                          <strong style={{ background: '#fef3c7', padding: '2px 6px', borderRadius: '4px', color: '#92400e' }}>
                            {transferContent}
                          </strong>
                          <button
                            type="button"
                            className={`pm-copy-btn ${copiedField === 'content' ? 'copied' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyText(transferContent, 'content');
                            }}
                          >
                            {copiedField === 'content' ? '✓ Đã chép' : 'Sao chép'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ========================================================
                    CHI TIẾT: VÍ MOMO
                   ======================================================== */}
                {isSelected && opt.id === 'momo' && (
                  <div
                    className="pm-detail-panel"
                    style={{
                      background: '#fff5f7',
                      border: '1px solid #fbcfe8',
                    }}
                  >
                    <div className="pm-qr-flex" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                      <div className="pm-qr-img" style={{ flexShrink: 0, textAlign: 'center' }}>
                        <img
                          src={momoQrUrl}
                          alt="MoMo QR Code"
                          style={{
                            width: '160px',
                            height: '160px',
                            borderRadius: '12px',
                            border: '2px solid #d82d8b',
                            padding: '4px',
                            background: '#ffffff',
                          }}
                        />
                        <div style={{ fontSize: '0.75rem', color: '#d82d8b', fontWeight: '700', marginTop: '6px' }}>
                          Quét bằng Ví MoMo
                        </div>
                      </div>

                      <div style={{ flex: 1, fontSize: '0.87rem' }}>
                        <div style={{ fontWeight: '800', color: '#a50064', fontSize: '1rem', marginBottom: '8px' }}>
                          Thanh toán Ví MoMo liền mạch
                        </div>
                        <p style={{ color: '#475569', marginBottom: '10px', fontSize: '0.84rem' }}>
                          Mở ứng dụng <strong>MoMo</strong>, chọn <strong>"Quét mã"</strong> để quét mã QR bên cạnh hoặc chuyển tiền đến số ví MoMo bên dưới:
                        </p>
                        <div style={{ background: '#ffffff', padding: '10px 14px', borderRadius: '10px', border: '1px solid #f9a8d4', display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
                          <div>
                            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Ví MoMo PetCare Joy:</div>
                            <div style={{ fontWeight: '800', color: '#a50064', fontSize: '1.05rem' }}>0988 666 888</div>
                          </div>
                          <button
                            type="button"
                            className={`pm-copy-btn ${copiedField === 'momo' ? 'copied' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyText('0988666888', 'momo');
                            }}
                          >
                            {copiedField === 'momo' ? '✓ Đã chép' : 'Sao chép SĐT'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ========================================================
                    CHI TIẾT: THẺ QUỐC TẾ (VISA / MASTER / JCB)
                   ======================================================== */}
                {isSelected && opt.id === 'card' && (
                  <div
                    className="pm-detail-panel"
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #cbd5e1',
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <span style={{ fontWeight: '700', color: '#1e293b', fontSize: '0.92rem' }}>
                        Thông tin thẻ thanh toán quốc tế:
                      </span>
                      <div style={{ display: 'flex', gap: '6px', fontSize: '1.2rem' }}>
                        <span title="Visa">💳</span>
                        <span title="Mastercard">🔴🟡</span>
                        <span title="JCB">🟢🔵</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>
                          SỐ THẺ (16 CHỮ SỐ) *
                        </label>
                        <input
                          type="text"
                          className="pm-card-input"
                          placeholder="4532 8888 6666 9999"
                          value={cardInfo.number}
                          onChange={handleCardNumberChange}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>
                          TÊN CHỦ THẺ (IN HOA KHÔNG DẤU) *
                        </label>
                        <input
                          type="text"
                          className="pm-card-input"
                          placeholder="TRAN MINH HIEN"
                          value={cardInfo.name}
                          onChange={(e) => setCardInfo((prev) => ({ ...prev, name: e.target.value.toUpperCase() }))}
                        />
                      </div>

                      <div className="pm-card-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>
                            HẾT HẠN (MM/YY) *
                          </label>
                          <input
                            type="text"
                            className="pm-card-input"
                            placeholder="12/28"
                            value={cardInfo.expiry}
                            onChange={handleCardExpiryChange}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>
                            MÃ BẢO MẬT (CVV/CVC) *
                          </label>
                          <input
                            type="password"
                            maxLength="4"
                            className="pm-card-input"
                            placeholder="•••"
                            value={cardInfo.cvv}
                            onChange={(e) => setCardInfo((prev) => ({ ...prev, cvv: e.target.value.replace(/\D/g, '') }))}
                          />
                        </div>
                      </div>

                      <div style={{ fontSize: '0.78rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                        <span>🔒</span> Bảo mật PCI-DSS 256-bit & Xác thực OTP 3D Secure an toàn tuyệt đối.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================================
          KHUNG NHẬP MÃ GIẢM GIÁ / VOUCHER
         ======================================================== */}
      <div
        style={{
          background: '#f8fafc',
          padding: '18px 20px',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          marginBottom: '20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ fontWeight: '700', color: '#1e293b', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>🎟️</span> Mã giảm giá & Ưu đãi PetCare Joy
          </span>
          {appliedVoucher && (
            <button
              type="button"
              onClick={handleRemoveVoucher}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#ef4444',
                fontSize: '0.8rem',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              ✕ Hủy áp dụng
            </button>
          )}
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="Nhập mã: PETJOY10, FREESHIP, CHAOBANMOI"
            value={voucherInput}
            onChange={(e) => setVoucherInput(e.target.value.toUpperCase())}
            disabled={!!appliedVoucher}
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '10px',
              border: '1.5px solid #cbd5e1',
              fontSize: '0.9rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              outline: 'none',
              background: appliedVoucher ? '#f1f5f9' : '#ffffff',
            }}
          />
          <button
            type="button"
            onClick={() => handleApplyVoucher()}
            disabled={!!appliedVoucher}
            style={{
              padding: '10px 18px',
              background: appliedVoucher ? '#94a3b8' : '#ff6b35',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              fontWeight: '700',
              fontSize: '0.9rem',
              cursor: appliedVoucher ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
            }}
          >
            {appliedVoucher ? 'Đã áp dụng' : 'Áp Dụng'}
          </button>
        </div>

        {/* Thông báo voucher */}
        {voucherMessage && (
          <div
            style={{
              marginTop: '8px',
              fontSize: '0.82rem',
              fontWeight: '600',
              color: voucherMessage.type === 'success' ? '#16a34a' : '#dc2626',
            }}
          >
            {voucherMessage.type === 'success' ? '✓ ' : '✕ '} {voucherMessage.text}
          </div>
        )}

        {/* Gợi ý mã có sẵn */}
        {!appliedVoucher && (
          <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Gợi ý mã:</span>
            {AVAILABLE_VOUCHERS.map((v) => (
              <span
                key={v.code}
                className="pm-voucher-tag"
                onClick={() => handleApplyVoucher(v.code)}
                title={v.desc}
              >
                🏷️ {v.code} ({v.label})
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ========================================================
          TÓM TẮT THANH TOÁN
         ======================================================== */}
      <div
        style={{
          background: '#f8fafc',
          padding: '20px',
          borderRadius: '16px',
          border: '1px solid #f1f5f9',
          marginBottom: '26px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.92rem' }}>
          <span style={{ color: '#64748b' }}>Tổng giá trị thú cưng & phụ kiện ({cartItems.length} món):</span>
          <strong>{formatCurrency(totalPrice)}</strong>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.92rem' }}>
          <span style={{ color: '#64748b' }}>Phí vận chuyển giao tận nhà:</span>
          <strong style={{ color: finalShippingFee === 0 ? '#10b981' : '#1e293b' }}>
            {finalShippingFee === 0 ? 'MIỄN PHÍ' : formatCurrency(finalShippingFee)}
          </strong>
        </div>

        {/* Dòng giảm giá voucher nếu có */}
        {appliedVoucher && discountAmount > 0 && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '8px',
              fontSize: '0.92rem',
              color: '#16a34a',
            }}
          >
            <span style={{ fontWeight: '600' }}>Giảm giá Voucher ({appliedVoucher.code}):</span>
            <strong>- {formatCurrency(discountAmount)}</strong>
          </div>
        )}

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            paddingTop: '12px',
            borderTop: '1px dashed #cbd5e1',
            marginTop: '4px',
          }}
        >
          <div>
            <span style={{ fontSize: '1.05rem', fontWeight: '800', color: '#1e293b' }}>Tổng tiền thanh toán:</span>
            <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Đã bao gồm thuế VAT & bảo hiểm thú cưng</div>
          </div>
          <span style={{ fontSize: '1.4rem', fontWeight: '900', color: '#ff6b35' }}>
            {formatCurrency(finalTotal)}
          </span>
        </div>
      </div>

      {/* ========================================================
          NHÓM NÚT ĐIỀU HƯỚNG & XÁC NHẬN (VỚI LOADING SPINNER)
         ======================================================== */}
      <div className="pm-actions-row" style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
        {onBackToForm && (
          <button
            type="button"
            className="btn-secondary-cta"
            onClick={onBackToForm}
            disabled={isProcessing}
            style={{
              flex: '0 0 auto',
              padding: '14px 22px',
              borderRadius: '14px',
              cursor: isProcessing ? 'not-allowed' : 'pointer',
              opacity: isProcessing ? 0.6 : 1,
            }}
          >
            ← Quay lại
          </button>
        )}

        <button
          type="button"
          className="submit-btn-full"
          onClick={handlePlaceOrder}
          disabled={isProcessing}
          style={{
            flex: 1,
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            cursor: isProcessing ? 'wait' : 'pointer',
            opacity: isProcessing ? 0.9 : 1,
            background: isProcessing
              ? '#94a3b8'
              : 'linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)',
          }}
        >
          {isProcessing ? (
            <>
              <span className="pm-spinner"></span>
              <span>Đang kết nối cổng thanh toán an toàn...</span>
            </>
          ) : (
            <>
              <span>🐾 Hoàn Tất & Xác Nhận Đơn Hàng</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}