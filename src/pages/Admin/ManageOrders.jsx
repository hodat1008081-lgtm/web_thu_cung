// src/pages/Admin/ManageOrders.jsx
// Nhiệm vụ: Đạt - Quản lý đơn hàng đặt thú cưng & xử lý giao nhận
import React, { useState } from 'react';
import { formatCurrency } from '../../data/products';

export default function ManageOrders() {
  const [orders, setOrders] = useState([
    {
      id: 'PET-2026-8899',
      customerName: 'Trần Minh Hiển',
      phone: '0988 666 888',
      petName: 'Chó Poodle Teacup Nâu Đỏ Siêu Xinh',
      totalAmount: 4800000,
      createdAt: '11:20 Hôm nay',
      paymentMethod: 'COD Tiền mặt',
      status: 'shipping', // 'pending' | 'shipping' | 'completed' | 'cancelled'
    },
    {
      id: 'PET-2026-7721',
      customerName: 'Lê Hoàng Trâm',
      phone: '0977 123 456',
      petName: 'Mèo Anh Lông Ngắn (Aln) Xám Xanh',
      totalAmount: 5500000,
      createdAt: '09:15 Hôm nay',
      paymentMethod: 'Chuyển khoản QR',
      status: 'completed',
    },
    {
      id: 'PET-2026-6612',
      customerName: 'Nguyễn San San',
      phone: '0933 999 111',
      petName: 'Hạt Royal Canin 2kg + Nhà Cây Cat Tree',
      totalAmount: 1110000,
      createdAt: 'Hôm qua',
      paymentMethod: 'Ví MoMo',
      status: 'completed',
    },
    {
      id: 'PET-2026-5503',
      customerName: 'Phạm Thị Vân',
      phone: '0909 333 777',
      petName: 'Chó Golden Retriever Vàng Kim',
      totalAmount: 7200000,
      createdAt: 'Hôm qua',
      paymentMethod: 'COD Tiền mặt',
      status: 'pending',
    },
  ]);

  const updateStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#1e293b' }}>
            Danh Sách Đơn Đặt Thú Cưng ({orders.length})
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
            Theo dõi tình trạng đơn, phê duyệt kiểm dịch và phân công tài xế giao bé
          </p>
        </div>
      </div>

      <div style={{ overflowX: 'auto', background: '#ffffff', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
              <th style={{ padding: '12px 16px' }}>Mã đơn</th>
              <th style={{ padding: '12px 16px' }}>Khách hàng</th>
              <th style={{ padding: '12px 16px' }}>Bé cưng / Sản phẩm</th>
              <th style={{ padding: '12px 16px' }}>Tổng tiền</th>
              <th style={{ padding: '12px 16px' }}>Thanh toán</th>
              <th style={{ padding: '12px 16px' }}>Trạng thái đơn</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => {
              return (
                <tr key={o.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px', fontWeight: '700', color: '#ff6b35' }}>
                    {o.id}
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '400' }}>{o.createdAt}</div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <strong style={{ color: '#1e293b' }}>{o.customerName}</strong>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{o.phone}</div>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#334155' }}>
                    {o.petName}
                  </td>
                  <td style={{ padding: '12px 16px', fontWeight: '800', color: '#1e293b' }}>
                    {formatCurrency(o.totalAmount)}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontSize: '0.8rem', background: '#f1f5f9', padding: '2px 8px', borderRadius: '6px' }}>
                      {o.paymentMethod}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    {o.status === 'pending' && (
                      <span style={{ color: '#d97706', background: '#fef3c7', padding: '3px 8px', borderRadius: '6px', fontWeight: '700', fontSize: '0.78rem' }}>
                        ⏳ Chờ duyệt
                      </span>
                    )}
                    {o.status === 'shipping' && (
                      <span style={{ color: '#2563eb', background: '#dbeafe', padding: '3px 8px', borderRadius: '6px', fontWeight: '700', fontSize: '0.78rem' }}>
                        🚐 Đang giao
                      </span>
                    )}
                    {o.status === 'completed' && (
                      <span style={{ color: '#15803d', background: '#dcfce7', padding: '3px 8px', borderRadius: '6px', fontWeight: '700', fontSize: '0.78rem' }}>
                        ✓ Hoàn tất
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <select
                      value={o.status}
                      onChange={(e) => updateStatus(o.id, e.target.value)}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                      }}
                    >
                      <option value="pending">Chờ duyệt</option>
                      <option value="shipping">Đang giao</option>
                      <option value="completed">Đã giao</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
