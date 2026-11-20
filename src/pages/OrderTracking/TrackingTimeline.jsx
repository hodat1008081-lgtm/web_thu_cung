// src/pages/OrderTracking/TrackingTimeline.jsx
// Nhiệm vụ: Vương & Nhóm - Hệ thống theo dõi hành trình vận chuyển đồng bộ với Admin
import { useState, useEffect } from 'react';
import { formatCurrency } from '../../data/products';

export default function TrackingTimeline({ initialOrderId = 'PET-2026-8899', orders = [] }) {
  const [searchCode, setSearchCode] = useState(initialOrderId);
  const [activeOrderId, setActiveOrderId] = useState(initialOrderId);
  const [searchError, setSearchError] = useState(null);

  // Cập nhật khi initialOrderId thay đổi (ví dụ khách vừa đặt hàng xong)
  useEffect(() => {
    if (initialOrderId) {
      setSearchCode(initialOrderId);
      setActiveOrderId(initialOrderId);
      setSearchError(null);
    }
  }, [initialOrderId]);

  // Tìm đơn hàng hiện tại trong danh sách orders
  const currentOrder =
    orders.find((o) => o.id?.toLowerCase() === activeOrderId?.toLowerCase()) ||
    orders[0] || {
      id: initialOrderId,
      petName: 'Chó Poodle Teacup Nâu Đỏ Siêu Xinh',
      customerName: 'Trần Minh Hiển',
      phone: '0988 666 888',
      deliveryAddress: '456 Nguyễn Thị Minh Khai, Phường 5, Quận 3, TP. Hồ Chí Minh',
      estimatedArrival: '15:30 Hôm nay (Khoảng 45 phút nữa)',
      driverName: 'Nguyễn Văn Hùng (Tài xế chuyên dụng PetCare)',
      driverPhone: '0912 345 678',
      driverVehicle: 'Xe ô tô bán tải chuyên dụng máy lạnh (Biển số: 51A-987.65)',
      status: 'shipping',
    };

  // Xác định bước tiến trình (step 1 -> 4) theo trạng thái thực tế do Admin quản lý
  const getTimelineStep = (status) => {
    switch (status) {
      case 'pending':
        return 1; // Chờ duyệt / tiếp nhận
      case 'shipping':
        return 3; // Đang giao trên xe điều hòa
      case 'completed':
        return 4; // Bàn giao hoàn tất
      case 'cancelled':
        return 0; // Đã hủy
      default:
        return 2;
    }
  };

  const currentStep = getTimelineStep(currentOrder.status);

  // 4 Bước hành trình tiêu chuẩn vận chuyển thú cưng
  const steps = [
    {
      step: 1,
      title: 'Đơn Hàng Đã Được Tiếp Nhận & Xác Nhận',
      time: currentOrder.status === 'pending' ? 'Đang chờ Admin duyệt...' : '09:00 AM - Hôm nay',
      desc:
        currentOrder.status === 'pending'
          ? 'Hệ thống đã ghi nhận đơn. Chuyên viên PetCare đang kiểm tra thông tin và chuẩn bị hồ sơ xuất chuồng.'
          : 'Nhân viên tư vấn đã gọi điện xác nhận và kiểm tra thông tin người nhận an toàn.',
      icon: '📝',
    },
    {
      step: 2,
      title: 'Bác Sĩ Thú Y Kiểm Dịch Xuất Chuồng',
      time: currentStep >= 2 ? '10:30 AM - Hôm nay' : 'Dự kiến sau khi xác nhận đơn',
      desc:
        currentStep >= 2
          ? 'Xét nghiệm Parvo, Care âm tính 100%, đo thân nhiệt 38.5°C, vệ sinh tai lông sạch sẽ.'
          : 'Bác sĩ thú y sẽ kiểm tra sức khỏe tổng quát, tiêm ngừa nhắc lại trước khi cho bé lên xe.',
      icon: '🩺',
    },
    {
      step: 3,
      title: 'Đang Vận Chuyển Trên Xe Chuyên Dụng Máy Lạnh',
      time: currentOrder.status === 'shipping' ? 'Đang diễn ra (Thời gian thực)' : currentStep > 3 ? 'Đã hoàn tất vận chuyển' : 'Dự kiến trong ngày',
      desc:
        currentOrder.status === 'shipping'
          ? 'Bé cưng đang ở trong lồng vận chuyển lót đệm ấm, bật điều hòa 24°C, có bình nước tự động và đồ chơi.'
          : currentStep > 3
          ? 'Chuyến xe chuyên dụng đã đưa bé đến đúng địa chỉ nhận an toàn tuyệt đối.'
          : 'Xe chuyên dụng máy lạnh sẽ đưa bé trực tiếp từ trại sinh sản đến tận tay khách hàng.',
      icon: '🚐',
    },
    {
      step: 4,
      title: 'Bàn Giao & Hướng Dẫn Chăm Sóc Tại Nhà',
      time: currentOrder.status === 'completed' ? 'Hoàn tất bàn giao' : currentOrder.estimatedArrival || 'Dự kiến hôm nay',
      desc:
        currentOrder.status === 'completed'
          ? 'Đã bàn giao sổ sức khỏe, hợp đồng bảo hành 30 ngày và thức ăn ăn dặm cho bé.'
          : 'Bàn giao sổ sức khỏe, hợp đồng bảo hành 30 ngày và tài liệu hướng dẫn pha sữa/ăn hạt cho cún mèo.',
      icon: '🏠',
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchError(null);
    if (!searchCode.trim()) {
      setSearchError('Vui lòng nhập mã đơn hàng để tra cứu!');
      return;
    }

    const cleanCode = searchCode.trim().toLowerCase();
    const found = orders.find((o) => o.id?.toLowerCase() === cleanCode);

    if (found) {
      setActiveOrderId(found.id);
    } else {
      setSearchError(`Không tìm thấy đơn hàng "${searchCode}". Vui lòng kiểm tra lại mã vận đơn!`);
    }
  };

  return (
    <div className="container" style={{ padding: '40px 20px 80px' }}>
      {/* Header Tra cứu */}
      <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 36px' }}>
        <div className="section-tagline" style={{ justifyContent: 'center' }}>
          <span>🐾</span> An Toàn Trên Từng Chuyến Đi
        </div>
        <h2 className="section-main-heading">
          Theo Dõi Hành Trình <span>Thú Cưng & Đơn Hàng</span>
        </h2>
        <p style={{ color: '#64748b', marginTop: '10px', fontSize: '0.95rem' }}>
          Dữ liệu hành trình được đồng bộ thời gian thực theo từng thao tác duyệt xuất chuồng của Admin.
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
            placeholder="Nhập mã đơn hàng (VD: PET-2026-8899, PET-2026-5503)..."
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
          />
          <button type="submit" className="search-btn">
            Tra Cứu Đơn
          </button>
        </form>

        {searchError && (
          <div style={{ color: '#dc2626', fontSize: '0.85rem', marginTop: '10px', fontWeight: '600' }}>
            ⚠️ {searchError}
          </div>
        )}

        {/* Danh sách mã đơn gợi ý tra cứu nhanh */}
        {orders.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '14px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Mã đơn của bạn:</span>
            {orders.slice(0, 4).map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => {
                  setSearchCode(o.id);
                  setActiveOrderId(o.id);
                  setSearchError(null);
                }}
                style={{
                  background: activeOrderId === o.id ? '#ff6b35' : '#f1f5f9',
                  color: activeOrderId === o.id ? '#fff' : '#475569',
                  border: 'none',
                  padding: '3px 10px',
                  borderRadius: '20px',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                }}
              >
                {o.id} ({o.status === 'pending' ? 'Chờ duyệt' : o.status === 'shipping' ? 'Đang giao' : 'Hoàn thành'})
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Cảnh báo nếu đơn bị hủy */}
      {currentOrder.status === 'cancelled' && (
        <div
          style={{
            background: '#fee2e2',
            border: '1.5px solid #f87171',
            borderRadius: '18px',
            padding: '16px 24px',
            marginBottom: '24px',
            color: '#991b1b',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span style={{ fontSize: '1.8rem' }}>⚠️</span>
          <div>
            <strong style={{ fontSize: '1rem' }}>Đơn hàng này đã bị hủy!</strong>
            <p style={{ fontSize: '0.88rem', margin: '4px 0 0' }}>
              Đơn hàng {currentOrder.id} đã dừng tiến trình vận chuyển. Nếu có bất kỳ thắc mắc nào, vui lòng gọi hotline <strong>1900 8899</strong> để được hỗ trợ ngay.
            </p>
          </div>
        </div>
      )}

      {/* Khung nội dung chi tiết theo dõi đơn */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: '28px',
          padding: '36px',
          border: '1px solid #f1f5f9',
          boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
        }}
      >
        {/* Cột trái: Timeline hành trình thực tế */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#1e293b' }}>
              Hành Trình Giao Nhận Bé Cưng
            </h3>
            {/* Badge trạng thái đồng bộ với Admin */}
            {currentOrder.status === 'pending' && (
              <span style={{ color: '#b45309', background: '#fef3c7', padding: '4px 12px', borderRadius: '20px', fontWeight: '800', fontSize: '0.8rem' }}>
                ⏳ Chờ xác nhận
              </span>
            )}
            {currentOrder.status === 'shipping' && (
              <span style={{ color: '#1d4ed8', background: '#dbeafe', padding: '4px 12px', borderRadius: '20px', fontWeight: '800', fontSize: '0.8rem' }}>
                🚐 Đang giao hàng
              </span>
            )}
            {currentOrder.status === 'completed' && (
              <span style={{ color: '#15803d', background: '#dcfce7', padding: '4px 12px', borderRadius: '20px', fontWeight: '800', fontSize: '0.8rem' }}>
                ✓ Đã hoàn thành
              </span>
            )}
            {currentOrder.status === 'cancelled' && (
              <span style={{ color: '#b91c1c', background: '#fee2e2', padding: '4px 12px', borderRadius: '20px', fontWeight: '800', fontSize: '0.8rem' }}>
                ✕ Đã hủy
              </span>
            )}
          </div>

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
              const isDone = currentStep > s.step || currentOrder.status === 'completed';
              const isCurrent = currentStep === s.step && currentOrder.status !== 'completed';

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
                    <div style={{ fontSize: '0.8rem', color: isCurrent ? '#ff6b35' : '#64748b', fontWeight: '600', margin: '4px 0' }}>
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
              <span style={{ fontSize: '0.88rem', color: '#ff6b35', fontWeight: '800' }}>
                MÃ ĐƠN: {currentOrder.id}
              </span>
              <span style={{ fontSize: '0.78rem', color: '#64748b', background: '#fff', padding: '2px 8px', borderRadius: '6px', border: '1px solid #ffd8cc' }}>
                {currentOrder.createdAt || 'Hôm nay'}
              </span>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <span style={{ fontSize: '0.82rem', color: '#94a3b8', display: 'block' }}>Bé cưng / Sản phẩm đặt mua:</span>
              <strong style={{ fontSize: '1rem', color: '#1e293b' }}>
                {currentOrder.petName || (currentOrder.items && currentOrder.items.map((it) => it.name).join(', '))}
              </strong>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <span style={{ fontSize: '0.82rem', color: '#94a3b8', display: 'block' }}>Người nhận:</span>
              <strong style={{ color: '#1e293b' }}>
                {currentOrder.customerName} - {currentOrder.phone}
              </strong>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <span style={{ fontSize: '0.82rem', color: '#94a3b8', display: 'block' }}>Địa chỉ giao hàng:</span>
              <span style={{ fontSize: '0.88rem', color: '#475569' }}>{currentOrder.deliveryAddress}</span>
            </div>

            <div style={{ marginBottom: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed #fed7aa', paddingTop: '10px' }}>
              <span style={{ fontSize: '0.88rem', color: '#64748b' }}>Tổng thanh toán:</span>
              <strong style={{ fontSize: '1.15rem', color: '#ff6b35' }}>
                {formatCurrency(currentOrder.totalAmount || currentOrder.totalPrice || 0)}
              </strong>
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
                  {currentOrder.status === 'completed'
                    ? 'Đã bàn giao thành công'
                    : currentOrder.status === 'cancelled'
                    ? 'Đơn hàng đã hủy'
                    : currentOrder.estimatedArrival || 'Trong 45 phút nữa'}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
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
                  {currentOrder.driverName || 'Nguyễn Văn Hùng (Tài xế PetCare)'}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  {currentOrder.driverVehicle || 'Xe ô tô bán tải chuyên dụng máy lạnh'}
                </div>
              </div>
            </div>

            <a
              href={`tel:${currentOrder.driverPhone || '19008899'}`}
              className="btn-primary-cta"
              style={{ width: '100%', padding: '10px', fontSize: '0.9rem', textAlign: 'center', display: 'block' }}
            >
              📞 Gọi Cho Tài Xế: {currentOrder.driverPhone || '1900 8899'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
