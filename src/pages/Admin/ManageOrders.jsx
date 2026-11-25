// src/pages/Admin/ManageOrders.jsx
// Nhiệm vụ: Đạt & Nhóm - Quản lý đơn hàng, bộ lọc trạng thái & thao tác nhanh
import { useState } from 'react';
import { formatCurrency } from '../../data/products';

export default function ManageOrders({ orders = [], onUpdateOrderStatus }) {
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'pending' | 'shipping' | 'completed' | 'cancelled'
  const [searchKeyword, setSearchKeyword] = useState('');

  // Lọc đơn hàng theo trạng thái & từ khóa tìm kiếm
  const filteredOrders = orders.filter((o) => {
    const matchStatus = filterStatus === 'all' || o.status === filterStatus;
    const cleanSearch = searchKeyword.toLowerCase().trim();
    const matchSearch =
      !cleanSearch ||
      o.id?.toLowerCase().includes(cleanSearch) ||
      o.customerName?.toLowerCase().includes(cleanSearch) ||
      o.phone?.includes(cleanSearch) ||
      o.petName?.toLowerCase().includes(cleanSearch);

    return matchStatus && matchSearch;
  });

  const handleStatusChange = (orderId, newStatus) => {
    if (onUpdateOrderStatus) {
      onUpdateOrderStatus(orderId, newStatus);
    }
  };

  return (
    <div>
      {/* Tiêu đề & Công cụ lọc */}
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
            Quản Lý Toàn Bộ Đơn Hàng ({orders.length})
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
            Kết nối trực tiếp dữ liệu đặt hàng của khách hàng & cập nhật tiến trình vận chuyển
          </p>
        </div>

        {/* Ô tìm kiếm đơn */}
        <input
          type="text"
          placeholder="Tìm theo mã đơn, tên khách, SĐT..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          style={{
            padding: '8px 14px',
            borderRadius: '10px',
            border: '1px solid #cbd5e1',
            fontSize: '0.85rem',
            minWidth: '240px',
          }}
        />
      </div>

      {/* Thanh bộ lọc theo trạng thái đơn hàng */}
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
          className={`tab-btn ${filterStatus === 'pending' ? 'active' : ''}`}
          onClick={() => setFilterStatus('pending')}
          style={{
            padding: '6px 14px',
            fontSize: '0.82rem',
            background: filterStatus === 'pending' ? '#ff6b35' : 'transparent',
            color: filterStatus === 'pending' ? '#fff' : '#b45309',
          }}
        >
          ⏳ Chờ xác nhận ({orders.filter((o) => o.status === 'pending').length})
        </button>
        <button
          className={`tab-btn ${filterStatus === 'shipping' ? 'active' : ''}`}
          onClick={() => setFilterStatus('shipping')}
          style={{
            padding: '6px 14px',
            fontSize: '0.82rem',
            background: filterStatus === 'shipping' ? '#ff6b35' : 'transparent',
            color: filterStatus === 'shipping' ? '#fff' : '#1d4ed8',
          }}
        >
          🚐 Đang giao ({orders.filter((o) => o.status === 'shipping').length})
        </button>
        <button
          className={`tab-btn ${filterStatus === 'completed' ? 'active' : ''}`}
          onClick={() => setFilterStatus('completed')}
          style={{
            padding: '6px 14px',
            fontSize: '0.82rem',
            background: filterStatus === 'completed' ? '#ff6b35' : 'transparent',
            color: filterStatus === 'completed' ? '#fff' : '#15803d',
          }}
        >
          ✓ Hoàn thành ({orders.filter((o) => o.status === 'completed').length})
        </button>
        <button
          className={`tab-btn ${filterStatus === 'cancelled' ? 'active' : ''}`}
          onClick={() => setFilterStatus('cancelled')}
          style={{
            padding: '6px 14px',
            fontSize: '0.82rem',
            background: filterStatus === 'cancelled' ? '#ff6b35' : 'transparent',
            color: filterStatus === 'cancelled' ? '#fff' : '#b91c1c',
          }}
        >
          ✕ Đã hủy ({orders.filter((o) => o.status === 'cancelled').length})
        </button>
      </div>

      {/* Bảng danh sách đơn hàng */}
      <div style={{ overflowX: 'auto', background: '#ffffff', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
              <th style={{ padding: '12px 16px' }}>Mã đơn & Thời gian</th>
              <th style={{ padding: '12px 16px' }}>Khách hàng & SĐT</th>
              <th style={{ padding: '12px 16px' }}>Bé cưng / Sản phẩm</th>
              <th style={{ padding: '12px 16px' }}>Tổng tiền</th>
              <th style={{ padding: '12px 16px' }}>Thanh toán</th>
              <th style={{ padding: '12px 16px' }}>Trạng thái</th>
              <th style={{ padding: '12px 16px', textAlign: 'center' }}>Thao tác nhanh của Admin</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ padding: '36px', textAlign: 'center', color: '#94a3b8' }}>
                  Không tìm thấy đơn hàng nào phù hợp với bộ lọc hiện tại.
                </td>
              </tr>
            ) : (
              filteredOrders.map((o) => {
                const total = o.totalAmount || o.totalPrice || 0;
                return (
                  <tr key={o.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    {/* Mã đơn */}
                    <td style={{ padding: '14px 16px', fontWeight: '700', color: '#ff6b35' }}>
                      {o.id}
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '400' }}>
                        {o.createdAt || 'Hôm nay'}
                      </div>
                    </td>

                    {/* Khách hàng */}
                    <td style={{ padding: '14px 16px' }}>
                      <strong style={{ color: '#1e293b' }}>{o.customerName}</strong>
                      <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{o.phone}</div>
                      {o.deliveryAddress && (
                        <div style={{ fontSize: '0.74rem', color: '#94a3b8', maxWidth: '220px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          📍 {o.deliveryAddress}
                        </div>
                      )}
                    </td>

                    {/* Sản phẩm / Bé cưng */}
                    <td style={{ padding: '14px 16px', color: '#334155', maxWidth: '240px' }}>
                      <div style={{ fontWeight: '600' }}>
                        {o.petName || (o.items && o.items.map((it) => it.name).join(', ')) || 'Thú cưng PetCare'}
                      </div>
                      {o.items && o.items.length > 0 && (
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                          Số lượng: {o.items.reduce((acc, it) => acc + (it.quantity || 1), 0)} món
                        </div>
                      )}
                    </td>

                    {/* Tổng tiền */}
                    <td style={{ padding: '14px 16px', fontWeight: '800', color: '#1e293b' }}>
                      {formatCurrency(total)}
                    </td>

                    {/* Phương thức thanh toán */}
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ fontSize: '0.78rem', background: '#f1f5f9', padding: '3px 8px', borderRadius: '6px', color: '#475569', fontWeight: '600' }}>
                        {o.paymentMethod || 'COD'}
                      </span>
                    </td>

                    {/* Trạng thái đơn */}
                    <td style={{ padding: '14px 16px' }}>
                      {o.status === 'pending' && (
                        <span style={{ color: '#b45309', background: '#fef3c7', padding: '4px 10px', borderRadius: '6px', fontWeight: '700', fontSize: '0.78rem', display: 'inline-block' }}>
                          ⏳ Chờ xác nhận
                        </span>
                      )}
                      {o.status === 'shipping' && (
                        <span style={{ color: '#1d4ed8', background: '#dbeafe', padding: '4px 10px', borderRadius: '6px', fontWeight: '700', fontSize: '0.78rem', display: 'inline-block' }}>
                          🚐 Đang giao
                        </span>
                      )}
                      {o.status === 'completed' && (
                        <span style={{ color: '#15803d', background: '#dcfce7', padding: '4px 10px', borderRadius: '6px', fontWeight: '700', fontSize: '0.78rem', display: 'inline-block' }}>
                          ✓ Hoàn thành
                        </span>
                      )}
                      {o.status === 'cancelled' && (
                        <span style={{ color: '#b91c1c', background: '#fee2e2', padding: '4px 10px', borderRadius: '6px', fontWeight: '700', fontSize: '0.78rem', display: 'inline-block' }}>
                          ✕ Đã hủy
                        </span>
                      )}
                    </td>

                    {/* Nút thao tác nhanh của Admin */}
                    <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        {/* Nút thao tác nhanh theo từng trạng thái */}
                        {o.status === 'pending' && (
                          <>
                            <button
                              type="button"
                              onClick={() => handleStatusChange(o.id, 'shipping')}
                              className="btn-primary-cta"
                              style={{ padding: '5px 10px', fontSize: '0.76rem', borderRadius: '8px' }}
                              title="Xác nhận đơn và chuyển tài xế đi giao"
                            >
                              ✓ Xác nhận đơn
                            </button>
                            <button
                              type="button"
                              onClick={() => handleStatusChange(o.id, 'cancelled')}
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
                              title="Hủy đơn hàng"
                            >
                              ✕ Hủy
                            </button>
                          </>
                        )}

                        {o.status === 'shipping' && (
                          <>
                            <button
                              type="button"
                              onClick={() => handleStatusChange(o.id, 'completed')}
                              style={{
                                padding: '5px 10px',
                                fontSize: '0.76rem',
                                borderRadius: '8px',
                                background: '#16a34a',
                                color: '#ffffff',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: '700',
                                boxShadow: '0 2px 8px rgba(22,163,74,0.25)',
                              }}
                              title="Bàn giao bé cưng thành công"
                            >
                              ✓ Hoàn thành
                            </button>
                            <button
                              type="button"
                              onClick={() => handleStatusChange(o.id, 'cancelled')}
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
                              title="Hủy đơn hàng"
                            >
                              ✕ Hủy
                            </button>
                          </>
                        )}

                        {o.status === 'completed' && (
                          <span style={{ fontSize: '0.75rem', color: '#15803d', fontWeight: '700', padding: '4px 8px' }}>
                            ✓ Đã giao thành công
                          </span>
                        )}

                        {o.status === 'cancelled' && (
                          <button
                            type="button"
                            onClick={() => handleStatusChange(o.id, 'pending')}
                            style={{
                              padding: '4px 8px',
                              fontSize: '0.75rem',
                              borderRadius: '8px',
                              background: '#f1f5f9',
                              color: '#475569',
                              border: '1px solid #cbd5e1',
                              cursor: 'pointer',
                              fontWeight: '600',
                            }}
                            title="Khôi phục đơn về chờ xác nhận"
                          >
                            Khôi phục
                          </button>
                        )}

                        {/* Dropdown phụ linh hoạt */}
                        <select
                          value={o.status}
                          onChange={(e) => handleStatusChange(o.id, e.target.value)}
                          style={{
                            padding: '3px 6px',
                            borderRadius: '6px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                            color: '#64748b',
                          }}
                          title="Thay đổi trạng thái tùy chọn"
                        >
                          <option value="pending">Chờ xác nhận</option>
                          <option value="shipping">Đang giao</option>
                          <option value="completed">Hoàn thành</option>
                          <option value="cancelled">Đã hủy</option>
                        </select>
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
