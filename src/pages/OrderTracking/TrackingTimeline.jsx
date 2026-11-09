// src/pages/OrderTracking/TrackingTimeline.jsx
// Nhiệm vụ: Vương - Hệ thống theo dõi hành trình vận chuyển & kiểm dịch thú cưng
import React, { useState } from 'react';
import { formatCurrency } from '../../data/products';

export default function TrackingTimeline({ initialOrderId = 'PET-2026-8899', orderData }) {
  const [searchCode, setSearchCode] = useState(initialOrderId);
  const [currentOrder, setCurrentOrder] = useState(
    orderData || {
      orderId: initialOrderId,
      petName: 'Chó Poodle Teacup Nâu Đỏ Siêu Xinh',
      customerName: 'Trần Minh Hiển',
      phone: '0988 *** 888',
      deliveryAddress: '456 Nguyễn Thị Minh Khai, Phường 5, Quận 3, TP. Hồ Chí Minh',
      estimatedArrival: '15:30 Hôm nay (Khoảng 45 phút nữa)',
      driverName: 'Nguyễn Văn Hùng (Tài xế chuyên dụng PetCare)',
      driverPhone: '0912 345 678',
      driverVehicle: 'Xe ô tô bán tải chuyên dụng máy lạnh (Biển số: 51A-987.65)',
      currentStep: 3, // 1 -> 4
    }
  );

  const steps = [
    {
      step: 1,
      title: 'Đơn Hàng Đã Được Xác Nhận',
      time: '09:00 AM - Hôm nay',
      desc: 'Nhân viên tư vấn đã gọi điện xác nhận và kiểm tra thông tin người nhận.',
      icon: '📝',
    },
    {
      step: 2,
      title: 'Bác Sĩ Thú Y Kiểm Dịch Xuất Chuồng',
      time: '10:30 AM - Hôm nay',
      desc: 'Xét nghiệm Parvo, Care âm tính 100%, đo thân nhiệt 38.5°C, vệ sinh tai lông sạch sẽ.',
      icon: '🩺',
    },
    {
      step: 3,
      title: 'Đang Vận Chuyển Trên Xe Điều Hòa',
      time: '13:45 PM - Đang diễn ra',
      desc: 'Bé cưng đang ở trong lồng vận chuyển lót đệm ấm, có bình nước tự động và đồ chơi gặm nướu.',
      icon: '🚐',
    },
    {
      step: 4,
      title: 'Bàn Giao & Hướng Dẫn Chăm Sóc Tại Nhà',
      time: 'Dự kiến 15:30 PM',
      desc: 'Bàn giao sổ sức khỏe, hợp đồng bảo hành 30 ngày và hướng dẫn pha sữa/ăn hạt.',
      icon: '🏠',
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchCode) {
      alert('Vui lòng nhập mã vận đơn!');
      return;
    }
    alert(`Đang tra cứu dữ liệu cho mã vận đơn: ${searchCode}`);
  };

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 36px' }}>
        <div className="section-tagline" style={{ justifyContent: 'center' }}>
          <span>🐾</span> An Toàn Trên Từng Chuyến Đi
        </div>
        <h2 className="section-main-heading">
          Theo Dõi Hành Trình <span>Thú Cưng & Đơn Hàng</span>
        </h2>
        <p style={{ color: '#64748b', marginTop: '10px' }}>
          Nhập mã vận đơn nhận được qua SMS để theo dõi tình trạng sức khỏe và thời gian giao bé cưng.
        </p>

        {/* Khung tra cứu */}
        <form
          onSubmit={handleSearch}
          style={{
            display: 'flex',
            marginTop: '20px',
            background: '#ffffff',
            borderRadius: '50px',
            border: '2px solid #fed7aa',
            padding: '4px 6px 4px 18px',
            boxShadow: '0 6px 20px rgba(255, 107, 53, 0.1)',
          }}
        >
          <input
            type="text"
            className="search-input"
            placeholder="Nhập mã đơn hàng (VD: PET-2026-8899)..."
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
          />
          <button type="submit" className="search-btn">
            Tra Cứu
          </button>
        </form>
      </div>

      <div
        style={{
          background: '#ffffff',
          borderRadius: '28px',
          padding: '36px',
          border: '1px solid #f1f5f9',
          boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '40px',
        }}
      >
        {/* Cột trái: Timeline hành trình */}
        <div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#1e293b', marginBottom: '24px' }}>
            Hành Trình Giao Nhận Bé Cưng
          </h3>

          <div style={{ position: 'relative', paddingLeft: '32px' }}>
            {/* Đường line nối */}
            <div
              style={{
                position: 'absolute',
                top: '16px',
                bottom: '16px',
                left: '12px',
                width: '3px',
                background: '#e2e8f0',
              }}
            ></div>

            {steps.map((s) => {
              const isDone = s.step < currentOrder.currentStep;
              const isCurrent = s.step === currentOrder.currentStep;

              return (
                <div key={s.step} style={{ position: 'relative', marginBottom: '28px' }}>
                  {/* Icon nút tròn trên timeline */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '-32px',
                      top: '0',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: isDone ? '#10b981' : isCurrent ? '#ff6b35' : '#e2e8f0',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.85rem',
                      fontWeight: '700',
                      boxShadow: isCurrent ? '0 0 0 5px rgba(255, 107, 53, 0.2)' : 'none',
                    }}
                  >
                    {isDone ? '✓' : s.step}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '1.2rem' }}>{s.icon}</span>
                      <strong style={{ fontSize: '1.05rem', color: isCurrent ? '#ff6b35' : '#1e293b' }}>
                        {s.title}
                      </strong>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#ff8c42', fontWeight: '600', margin: '4px 0' }}>
                      {s.time}
                    </div>
                    <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: '1.5' }}>
                      {s.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cột phải: Thông tin đơn hàng & Tài xế */}
        <div>
          <div
            style={{
              background: '#fff9f6',
              borderRadius: '20px',
              padding: '24px',
              border: '1.5px solid #ffd8cc',
              marginBottom: '20px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span style={{ fontSize: '0.85rem', color: '#ff6b35', fontWeight: '700' }}>
                MÃ ĐƠN: {currentOrder.orderId}
              </span>
              <span className="badge-pill-status hot">Đang giao hàng</span>
            </div>

            <div style={{ marginBottom: '10px' }}>
              <span style={{ fontSize: '0.82rem', color: '#94a3b8', display: 'block' }}>Thú cưng / Sản phẩm:</span>
              <strong style={{ fontSize: '1rem', color: '#1e293b' }}>{currentOrder.petName}</strong>
            </div>

            <div style={{ marginBottom: '10px' }}>
              <span style={{ fontSize: '0.82rem', color: '#94a3b8', display: 'block' }}>Người nhận:</span>
              <strong style={{ color: '#1e293b' }}>{currentOrder.customerName} - {currentOrder.phone}</strong>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <span style={{ fontSize: '0.82rem', color: '#94a3b8', display: 'block' }}>Địa chỉ giao:</span>
              <span style={{ fontSize: '0.88rem', color: '#475569' }}>{currentOrder.deliveryAddress}</span>
            </div>

            <div
              style={{
                background: '#ffffff',
                padding: '12px 16px',
                borderRadius: '12px',
                border: '1px solid #fed7aa',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <span style={{ fontSize: '1.4rem' }}>⏰</span>
              <div>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Dự kiến tới nơi:</div>
                <strong style={{ color: '#ff6b35', fontSize: '0.92rem' }}>
                  {currentOrder.estimatedArrival}
                </strong>
              </div>
            </div>
          </div>

          {/* Khung liên hệ tài xế */}
          <div
            style={{
              background: '#f8fafc',
              borderRadius: '20px',
              padding: '20px',
              border: '1px solid #e2e8f0',
            }}
          >
            <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#1e293b', marginBottom: '12px' }}>
              🚗 Tài Xế Chuyên Trách Thú Cưng
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: '#ff6b35',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.3rem',
                }}
              >
                👨‍✈️
              </div>
              <div>
                <div style={{ fontWeight: '700', color: '#1e293b', fontSize: '0.95rem' }}>
                  {currentOrder.driverName}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  {currentOrder.driverVehicle}
                </div>
              </div>
            </div>

            <a
              href={`tel:${currentOrder.driverPhone}`}
              className="btn-primary-cta"
              style={{ width: '100%', padding: '10px', fontSize: '0.9rem', textAlign: 'center' }}
            >
              📞 Gọi Cho Tài Xế: {currentOrder.driverPhone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
