// src/pages/Admin/ManageOrders.jsx
// Nhiệm vụ: Đạt & Nhóm - Quản lý đơn hàng thật từ StoreContext, chi tiết sản phẩm & hoàn kho tự động
import { useState } from 'react';
import { formatCurrency } from '../../data/products';
import { useStore } from '../../context/StoreContext';

export default function ManageOrders({ onNotify }) {
  const { orders, updateOrderStatus } = useStore();
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'Chờ xác nhận' | 'Đang giao' | 'Hoàn thành' | 'Đã hủy'
  const [searchKeyword, setSearchKeyword] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const filteredOrders = orders.filter((o) => {
    const matchStatus = filterStatus === 'all' || o.status === filterStatus;
    const cleanSearch = searchKeyword.toLowerCase().trim();
    const matchSearch =
      !cleanSearch ||
      o.id?.toLowerCase().includes(cleanSearch) ||
      o.customerName?.toLowerCase().includes(cleanSearch) ||
      o.customerEmail?.toLowerCase().includes(cleanSearch) ||
      o.phone?.includes(cleanSearch) ||
      (o.items && o.items.some((it) => it.name?.toLowerCase().includes(cleanSearch)));

    return matchStatus && matchSearch;
  });

  const handleStatusChange = (orderId, nextStatus) => {
    if (nextStatus === 'Đã hủy') {
      const ok = window.confirm(
        `Bạn có chắc muốn HỦY đơn hàng ${orderId}? Số lượng sản phẩm trong đơn sẽ được tự động hoàn lại vào kho.`
      );
      if (!ok) return;
    }

    const res = updateOrderStatus(orderId, nextStatus);
    if (onNotify && res?.message) {
      onNotify(res.message);
    }
  };

  return (
    <div>
      {/* Tiêu đề & Tìm kiếm */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '14px',
        }}
      >
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#1e293b' }}>
            Quản Lý Toàn Bộ Đơn Hàng Thực Tế ({orders.length})
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
            Hiển thị đơn đặt hàng thật của khách • Hủy đơn sẽ tự động hoàn lại tồn kho (chỉ hoàn 1 lần duy nhất)
          </p>
        </div>

        <input
          type="text"
          placeholder="Tìm mã đơn, tên khách, SĐT, sản phẩm..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          style={{
            padding: '8px 14px',
            borderRadius: '10px',
            border: '1px solid #cbd5e1',
            fontSize: '0.85rem',
            minWidth: '260px',
          }}
        />
      </div>

      {/* Bộ lọc trạng thái */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '20px',
          flexWrap: 'wrap',
          background: '#f8fafc',
          padding: '8px',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
        }}
      >
        <button
          className={`tab-btn ${filterStatus === 'all' ? 'active' : ''}`}
          onClick={() => setFilterStatus('all')}
          style={{ padding: '6px 14px', fontSize: '0.82rem' }}
        >
          Tất cả ({orders.length})
        </button>
        <button
          className={`tab-btn ${filterStatus === 'Chờ xác nhận' ? 'active' : ''}`}
          onClick={() => setFilterStatus('Chờ xác nhận')}
          style={{
            padding: '6px 14px',
            fontSize: '0.82rem',
            background: filterStatus === 'Chờ xác nhận' ? '#ff6b35' : 'transparent',
            color: filterStatus === 'Chờ xác nhận' ? '#fff' : '#b45309',
          }}
        >
          ⏳ Chờ xác nhận ({orders.filter((o) => o.status === 'Chờ xác nhận').length})
        </button>
        <button
          className={`tab-btn ${filterStatus === 'Đang giao' ? 'active' : ''}`}
          onClick={() => setFilterStatus('Đang giao')}
          style={{
            padding: '6px 14px',
            fontSize: '0.82rem',
            background: filterStatus === 'Đang giao' ? '#ff6b35' : 'transparent',
            color: filterStatus === 'Đang giao' ? '#fff' : '#1d4ed8',
          }}
        >
          🚐 Đang giao ({orders.filter((o) => o.status === 'Đang giao').length})
        </button>
        <button
          className={`tab-btn ${filterStatus === 'Hoàn thành' ? 'active' : ''}`}
          onClick={() => setFilterStatus('Hoàn thành')}
          style={{
            padding: '6px 14px',
            fontSize: '0.82rem',
            background: filterStatus === 'Hoàn thành' ? '#ff6b35' : 'transparent',
            color: filterStatus === 'Hoàn thành' ? '#fff' : '#15803d',
          }}
        >
          ✓ Hoàn thành ({orders.filter((o) => o.status === 'Hoàn thành').length})
        </button>
        <button
          className={`tab-btn ${filterStatus === 'Đã hủy' ? 'active' : ''}`}
          onClick={() => setFilterStatus('Đã hủy')}
          style={{
            padding: '6px 14px',
            fontSize: '0.82rem',
            background: filterStatus === 'Đã hủy' ? '#ff6b35' : 'transparent',
            color: filterStatus === 'Đã hủy' ? '#fff' : '#b91c1c',
          }}
        >
          ✕ Đã hủy ({orders.filter((o) => o.status === 'Đã hủy').length})
        </button>
      </div>

      {/* Bảng danh sách đơn hàng */}
      <div style={{ overflowX: 'auto', background: '#ffffff', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
              <th style={{ padding: '12px 16px' }}>Mã đơn & Thời gian</th>
              <th style={{ padding: '12px 16px' }}>Thông tin Khách hàng</th>
              <th style={{ padding: '12px 16px' }}>Chi tiết Sản phẩm đã mua</th>
              <th style={{ padding: '12px 16px' }}>Tổng tiền</th>
              <th style={{ padding: '12px 16px' }}>Trạng thái</th>
              <th style={{ padding: '12px 16px', textAlign: 'center' }}>Thao tác Admin</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: '44px 20px', textAlign: 'center', color: '#94a3b8' }}>
                  <div style={{ fontSize: '2.2rem', marginBottom: '8px' }}>📭</div>
                  <div style={{ fontWeight: '700', color: '#64748b' }}>
                    {orders.length === 0
                      ? 'Chưa có đơn hàng nào được đặt trên hệ thống.'
                      : 'Không tìm thấy đơn hàng nào khớp với bộ lọc.'}
                  </div>
                </td>
              </tr>
            ) : (
              filteredOrders.map((o) => {
                const total = o.totalAmount || o.totalPrice || 0;
                const items = Array.isArray(o.items) ? o.items : [];
                const isExpanded = expandedOrderId === o.id;
                const orderProfit = items.reduce((sum, it) => {
                  const unitCost = it.costPrice ?? Math.round((it.price || 0) * 0.7);
                  return sum + ((it.price || 0) - unitCost) * (it.quantity || 1);
                }, 0);

                return (
                  <tr key={o.id} style={{ borderBottom: '1px solid #f1f5f9', verticalAlign: 'top' }}>
                    {/* Mã đơn */}
                    <td style={{ padding: '14px 16px', fontWeight: '700', color: '#ff6b35' }}>
                      <div>{o.id}</div>
                      <div style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: '400', marginTop: '2px' }}>
                        {o.createdAt || 'Vừa đặt'}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', display: 'inline-block', marginTop: '4px' }}>
                        {o.paymentMethod || 'COD'}
                      </div>
                    </td>

                    {/* Khách hàng */}
                    <td style={{ padding: '14px 16px', maxWidth: '240px' }}>
                      <strong style={{ color: '#1e293b' }}>{o.customerName}</strong>
                      {o.customerEmail && (
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>✉️ {o.customerEmail}</div>
                      )}
                      <div style={{ fontSize: '0.78rem', color: '#475569', fontWeight: '600' }}>📞 {o.phone}</div>
                      {o.deliveryAddress && (
                        <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '3px', lineHeight: '1.35' }}>
                          📍 {o.deliveryAddress}
                        </div>
                      )}
                      {o.note && (
                        <div style={{ fontSize: '0.73rem', color: '#d97706', marginTop: '3px', fontStyle: 'italic' }}>
                          📝 "{o.note}"
                        </div>
                      )}
                    </td>

                    {/* Chi tiết sản phẩm đã mua & số lượng */}
                    <td style={{ padding: '14px 16px', minWidth: '240px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {(isExpanded ? items : items.slice(0, 2)).map((it, idx) => (
                          <div
                            key={`${it.id}_${idx}`}
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              gap: '8px',
                              background: '#f8fafc',
                              padding: '5px 8px',
                              borderRadius: '8px',
                              fontSize: '0.8rem',
                            }}
                          >
                            <div style={{ color: '#334155', fontWeight: '600' }}>
                              {it.name}
                              {it.selectedSize && <span style={{ color: '#64748b' }}> (Size {it.selectedSize})</span>}
                            </div>
                            <div style={{ whiteSpace: 'nowrap', fontWeight: '700', color: '#1e293b' }}>
                              x{it.quantity} • {formatCurrency((it.price || 0) * (it.quantity || 1))}
                            </div>
                          </div>
                        ))}
                        {items.length > 2 && (
                          <button
                            type="button"
                            onClick={() => setExpandedOrderId(isExpanded ? null : o.id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#ff6b35',
                              fontSize: '0.75rem',
                              fontWeight: '700',
                              cursor: 'pointer',
                              textAlign: 'left',
                              padding: '2px 0',
                            }}
                          >
                            {isExpanded ? '▲ Thu gọn' : `▼ Xem thêm ${items.length - 2} sản phẩm...`}
                          </button>
                        )}
                      </div>
                    </td>

                    {/* Tổng tiền & Lợi nhuận */}
                    <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                      <div style={{ fontWeight: '800', color: '#1e293b', fontSize: '0.95rem' }}>
                        {formatCurrency(total)}
                      </div>
                      {o.shippingFee !== undefined && (
                        <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                          Ship: {o.shippingFee === 0 ? 'Miễn phí' : formatCurrency(o.shippingFee)}
                        </div>
                      )}
                      {o.status === 'Hoàn thành' && (
                        <div style={{ fontSize: '0.74rem', color: '#10b981', fontWeight: '700', marginTop: '2px' }}>
                          Lãi: +{formatCurrency(orderProfit)}
                        </div>
                      )}
                    </td>

                    {/* Trạng thái đơn */}
                    <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                      {o.status === 'Chờ xác nhận' && (
                        <span style={{ color: '#b45309', background: '#fef3c7', padding: '4px 10px', borderRadius: '6px', fontWeight: '700', fontSize: '0.78rem', display: 'inline-block' }}>
                          ⏳ Chờ xác nhận
                        </span>
                      )}
                      {o.status === 'Đang giao' && (
                        <span style={{ color: '#1d4ed8', background: '#dbeafe', padding: '4px 10px', borderRadius: '6px', fontWeight: '700', fontSize: '0.78rem', display: 'inline-block' }}>
                          🚐 Đang giao
                        </span>
                      )}
                      {o.status === 'Hoàn thành' && (
                        <span style={{ color: '#15803d', background: '#dcfce7', padding: '4px 10px', borderRadius: '6px', fontWeight: '700', fontSize: '0.78rem', display: 'inline-block' }}>
                          ✓ Hoàn thành
                        </span>
                      )}
                      {o.status === 'Đã hủy' && (
                        <div>
                          <span style={{ color: '#b91c1c', background: '#fee2e2', padding: '4px 10px', borderRadius: '6px', fontWeight: '700', fontSize: '0.78rem', display: 'inline-block' }}>
                            ✕ Đã hủy
                          </span>
                          {o.stockRestored && (
                            <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '4px' }}>
                              ✓ Đã hoàn kho
                            </div>
                          )}
                        </div>
                      )}
                    </td>

                    {/* Nút thao tác chuyển trạng thái của Admin */}
                    <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        {o.status === 'Chờ xác nhận' && (
                          <>
                            <button
                              type="button"
                              onClick={() => handleStatusChange(o.id, 'Đang giao')}
                              className="btn-primary-cta"
                              style={{ padding: '5px 10px', fontSize: '0.76rem', borderRadius: '8px' }}
                            >
                              ✓ Xác nhận & Giao
                            </button>
                            <button
                              type="button"
                              onClick={() => handleStatusChange(o.id, 'Đã hủy')}
                              style={{
                                padding: '5px 8px',
                                fontSize: '0.76rem',
                                borderRadius: '8px',
                                background: '#fee2e2',
                                color: '#b91c1c',
                                border: '1px solid #fca5a5',
                                cursor: 'pointer',
                                fontWeight: '700',
                              }}
                            >
                              ✕ Hủy đơn
                            </button>
                          </>
                        )}

                        {o.status === 'Đang giao' && (
                          <>
                            <button
                              type="button"
                              onClick={() => handleStatusChange(o.id, 'Hoàn thành')}
                              style={{
                                padding: '5px 10px',
                                fontSize: '0.76rem',
                                borderRadius: '8px',
                                background: '#16a34a',
                                color: '#ffffff',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: '700',
                              }}
                            >
                              ✓ Hoàn thành
                            </button>
                            <button
                              type="button"
                              onClick={() => handleStatusChange(o.id, 'Đã hủy')}
                              style={{
                                padding: '5px 8px',
                                fontSize: '0.76rem',
                                borderRadius: '8px',
                                background: '#fee2e2',
                                color: '#b91c1c',
                                border: '1px solid #fca5a5',
                                cursor: 'pointer',
                                fontWeight: '700',
                              }}
                            >
                              ✕ Hủy đơn
                            </button>
                          </>
                        )}

                        {o.status === 'Hoàn thành' && (
                          <span style={{ fontSize: '0.76rem', color: '#15803d', fontWeight: '700' }}>
                            ✓ Giao thành công
                          </span>
                        )}

                        {o.status === 'Đã hủy' && (
                          <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '600' }}>
                            Đã đóng đơn
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
