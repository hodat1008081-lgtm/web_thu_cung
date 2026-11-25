// src/pages/OrderTracking/TrackingTimeline.jsx
// Nhiệm vụ: Vương & Nhóm - Theo dõi hành trình đơn hàng thực tế đồng bộ StoreContext & Hủy đơn hoàn kho
import { useState } from 'react';
import { formatCurrency } from '../../data/products';
import { useStore } from '../../context/StoreContext';

export default function TrackingTimeline({ initialOrderId = '', onGoShopping, onNotify }) {
  const { orders, currentUser, updateOrderStatus } = useStore();
  const [searchCode, setSearchCode] = useState(initialOrderId);
  const [activeOrderId, setActiveOrderId] = useState(initialOrderId);
  const [searchError, setSearchError] = useState(null);

  // Lọc các đơn của user đang đăng nhập (hoặc toàn bộ nếu admin) để gợi ý nhanh
  const userOrders =
    currentUser?.role === 'admin'
      ? orders
      : currentUser
      ? orders.filter(
          (o) =>
            o.userId === currentUser.id ||
            (o.customerEmail && o.customerEmail.toLowerCase() === currentUser.email.toLowerCase())
        )
      : orders;

  const currentOrder =
    orders.find((o) => o.id?.toLowerCase() === (activeOrderId || '').toLowerCase()) ||
    userOrders[0] ||
    orders[0] ||
    null;

  const getTimelineStep = (status) => {
    switch (status) {
      case 'Chờ xác nhận':
        return 1;
      case 'Đang giao':
        return 3;
      case 'Hoàn thành':
        return 4;
      case 'Đã hủy':
        return 0;
      default:
        return 1;
    }
  };

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
      setSearchError(`Không tìm thấy đơn hàng "${searchCode}" trên hệ thống.`);
    }
  };

  const handleCustomerCancelOrder = () => {
    if (!currentOrder) return;
    const confirmed = window.confirm(
      `Bạn có chắc chắn muốn hủy đơn hàng ${currentOrder.id}? Số lượng sản phẩm sẽ được tự động hoàn lại vào kho.`
    );
    if (!confirmed) return;

    const res = updateOrderStatus(currentOrder.id, 'Đã hủy');
    if (onNotify && res?.message) {
      onNotify(res.message);
    }
  };

  // Trạng thái rỗng khi chưa có đơn hàng thực tế nào
  if (!currentOrder) {
    return (
      <div className="container" style={{ padding: '60px 20px 80px', textAlign: 'center', maxWidth: '640px' }}>
        <div className="section-tagline" style={{ justifyContent: 'center' }}>
          <span>📦</span> Tra Cứu Đơn Hàng
        </div>
        <h2 className="section-main-heading">
          Chưa Có Đơn Hàng <span>Nào Được Tạo</span>
        </h2>
        <p style={{ color: '#64748b', marginTop: '12px', marginBottom: '26px', lineHeight: '1.6' }}>
          Hệ thống hiện chưa ghi nhận đơn hàng nào từ tài khoản của bạn. Hãy lựa chọn thú cưng hoặc phụ kiện yêu thích và hoàn tất đặt hàng để theo dõi hành trình tại đây nhé!
        </p>
        {onGoShopping && (
          <button type="button" className="btn-primary-cta" onClick={onGoShopping}>
            🐾 Khám Phá Sản Phẩm Ngay
          </button>
        )}
      </div>
    );
  }

  const currentStep = getTimelineStep(currentOrder.status);

  const steps = [
    {
      step: 1,
      title: 'Đơn Hàng Đã Tiếp Nhận (Chờ xác nhận)',
      time: currentOrder.status === 'Chờ xác nhận' ? 'Đang chờ Admin xác nhận...' : currentOrder.createdAt || 'Đã xác nhận',
      desc:
        currentOrder.status === 'Chờ xác nhận'
          ? 'Hệ thống đã ghi nhận đơn và giữ tồn kho cho bạn. Admin đang kiểm tra hồ sơ xuất chuồng.'
          : 'Nhân viên tư vấn đã xác nhận đơn hàng và thông tin nhận hàng.',
      icon: '📝',
    },
    {
      step: 2,
      title: 'Bác Sĩ Thú Y Kiểm Dịch & Đóng Gói',
      time: currentStep >= 2 ? 'Đã hoàn tất kiểm tra' : 'Dự kiến sau khi xác nhận đơn',
      desc:
        currentStep >= 2
          ? 'Đã kiểm tra sức khỏe tổng quát, vệ sinh sạch sẽ và chuẩn bị chuồng lót ấm.'
          : 'Chuyên viên sẽ kiểm tra tình trạng sức khỏe / chất lượng sản phẩm trước khi giao.',
      icon: '🩺',
    },
    {
      step: 3,
      title: 'Đang Vận Chuyển Trên Xe Chuyên Dụng',
      time: currentOrder.status === 'Đang giao' ? 'Đang giao hàng (Thời gian thực)' : currentStep > 3 ? 'Đã giao tới nơi' : 'Chờ xuất phát',
      desc:
        currentOrder.status === 'Đang giao'
          ? 'Tài xế chuyên trách PetCare Joy đang trên đường giao đơn hàng tới địa chỉ của bạn.'
          : currentStep > 3
          ? 'Chuyến xe chuyên dụng đã đưa đơn hàng đến đúng địa chỉ nhận an toàn.'
          : 'Xe chuyên dụng máy lạnh sẽ vận chuyển an toàn đến tận tay khách hàng.',
      icon: '🚐',
    },
    {
      step: 4,
      title: 'Bàn Giao & Hoàn Thành Đơn Hàng',
      time: currentOrder.status === 'Hoàn thành' ? 'Hoàn tất bàn giao ✓' : 'Dự kiến khi nhận hàng',
      desc:
        currentOrder.status === 'Hoàn thành'
          ? 'Đơn hàng đã được giao thành công và hoàn tất thanh toán. Cảm ơn bạn đã tin tưởng PetCare Joy!'
          : 'Kiểm tra sức khỏe bé cưng / sản phẩm, nhận sổ bảo hành 30 ngày và hoàn tất đơn.',
      icon: '🏠',
    },
  ];

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
          Trạng thái đơn hàng được đồng bộ trực tiếp theo thời gian thực với hệ thống quản trị Admin.
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
            placeholder="Nhập mã đơn hàng của bạn (VD: PET-123456)..."
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

        {/* Danh sách các đơn thực tế để chuyển nhanh */}
        {orders.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '14px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Đơn hàng gần đây:</span>
            {orders.slice(0, 5).map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => {
                  setSearchCode(o.id);
                  setActiveOrderId(o.id);
                  setSearchError(null);
                }}
                style={{
                  background: currentOrder.id === o.id ? '#ff6b35' : '#f1f5f9',
                  color: currentOrder.id === o.id ? '#fff' : '#475569',
                  border: 'none',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                }}
              >
                {o.id} ({o.status})
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Cảnh báo nếu đơn bị hủy */}
      {currentOrder.status === 'Đã hủy' && (
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
            <strong style={{ fontSize: '1rem' }}>Đơn hàng {currentOrder.id} đã bị hủy!</strong>
            <p style={{ fontSize: '0.88rem', margin: '4px 0 0' }}>
              Toàn bộ số lượng sản phẩm trong đơn đã được tự động hoàn trả lại vào kho hàng. Vui lòng liên hệ hotline <strong>1900 8899</strong> nếu cần hỗ trợ thêm.
            </p>
          </div>
        </div>
      )}

      {/* Khung chi tiết đơn hàng */}
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
        {/* Cột trái: Timeline */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '10px' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#1e293b' }}>
              Hành Trình Giao Nhận
            </h3>

            {currentOrder.status === 'Chờ xác nhận' && (
              <span style={{ color: '#b45309', background: '#fef3c7', padding: '4px 12px', borderRadius: '20px', fontWeight: '800', fontSize: '0.8rem' }}>
                ⏳ Chờ xác nhận
              </span>
            )}
            {currentOrder.status === 'Đang giao' && (
              <span style={{ color: '#1d4ed8', background: '#dbeafe', padding: '4px 12px', borderRadius: '20px', fontWeight: '800', fontSize: '0.8rem' }}>
                🚐 Đang giao hàng
              </span>
            )}
            {currentOrder.status === 'Hoàn thành' && (
              <span style={{ color: '#15803d', background: '#dcfce7', padding: '4px 12px', borderRadius: '20px', fontWeight: '800', fontSize: '0.8rem' }}>
                ✓ Hoàn thành
              </span>
            )}
            {currentOrder.status === 'Đã hủy' && (
              <span style={{ color: '#b91c1c', background: '#fee2e2', padding: '4px 12px', borderRadius: '20px', fontWeight: '800', fontSize: '0.8rem' }}>
                ✕ Đã hủy
              </span>
            )}
          </div>

          <div style={{ position: 'relative', paddingLeft: '32px' }}>
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
              const isDone = currentStep > s.step || currentOrder.status === 'Hoàn thành';
              const isCurrent = currentStep === s.step && currentOrder.status !== 'Hoàn thành';

              return (
                <div key={s.step} style={{ position: 'relative', marginBottom: '28px' }}>
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

        {/* Cột phải: Thông tin chi tiết đơn hàng & nút Hủy đơn cho Khách */}
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
                {currentOrder.createdAt}
              </span>
            </div>

            {/* Danh sách sản phẩm thật trong đơn */}
            <div style={{ marginBottom: '14px' }}>
              <span style={{ fontSize: '0.82rem', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>
                Danh sách sản phẩm đã đặt:
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {(currentOrder.items || []).map((item, idx) => (
                  <div
                    key={`${item.id}_${idx}`}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '0.86rem',
                      background: '#ffffff',
                      padding: '8px 10px',
                      borderRadius: '10px',
                      border: '1px solid #fed7aa',
                    }}
                  >
                    <span style={{ fontWeight: '700', color: '#1e293b' }}>
                      {item.name} {item.selectedSize ? `(Size ${item.selectedSize})` : ''} × {item.quantity}
                    </span>
                    <strong style={{ color: '#ff6b35' }}>
                      {formatCurrency((item.price || 0) * (item.quantity || 1))}
                    </strong>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '10px' }}>
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
              <strong style={{ fontSize: '1.2rem', color: '#ff6b35' }}>
                {formatCurrency(currentOrder.totalAmount || currentOrder.totalPrice || 0)}
              </strong>
            </div>

            {/* Nút cho Khách hủy đơn hàng khi đang "Chờ xác nhận" (tự động hoàn kho) */}
            {currentOrder.status === 'Chờ xác nhận' && (
              <button
                type="button"
                onClick={handleCustomerCancelOrder}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '12px',
                  background: '#fee2e2',
                  color: '#dc2626',
                  border: '1.5px solid #fca5a5',
                  fontWeight: '700',
                  fontSize: '0.86rem',
                  cursor: 'pointer',
                  marginTop: '6px',
                }}
              >
                ✕ Hủy Đơn Hàng Này (Hoàn lại tồn kho)
              </button>
            )}
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
