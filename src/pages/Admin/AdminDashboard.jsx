// src/pages/Admin/AdminDashboard.jsx
// Nhiệm vụ: Đạt & Nhóm - Bảng Điều Khiển Quản Trị Viên & 4 Thẻ KPI Thống Kê
import { useState } from 'react';
import ManageProducts from './ManageProducts';
import ManageOrders from './ManageOrders';
import { formatCurrency } from '../../data/products';

export default function AdminDashboard({
  products = [],
  orders = [],
  users = [],
  onUpdateOrderStatus,
  onAddProduct,
  onDeleteProduct,
  onBackToStore,
}) {
  const [activeAdminTab, setActiveAdminTab] = useState('overview'); // 'overview' | 'products' | 'orders'

  // =========================================================================
  // Yêu cầu 3: Thống kê nhanh cho Admin - 4 Thẻ KPI:
  // 1. Tổng doanh thu (chỉ tính các đơn "Hoàn thành")
  // 2. Số đơn chờ xử lý ("Chờ xác nhận" / pending)
  // 3. Tổng số sản phẩm đang bán
  // 4. Tổng số khách hàng
  // =========================================================================

  // 1. Tổng doanh thu (CHỈ tính các đơn "Hoàn thành")
  const completedOrders = orders.filter((o) => o.status === 'completed');
  const totalRevenue = completedOrders.reduce(
    (sum, o) => sum + (o.totalAmount || o.totalPrice || 0),
    0
  );

  // 2. Số đơn chờ xử lý ("Chờ xác nhận" / pending)
  const pendingOrdersCount = orders.filter((o) => o.status === 'pending').length;

  // 3. Tổng số sản phẩm đang bán
  const totalProductsCount = products.length;

  // 4. Tổng số khách hàng (lọc các tài khoản không phải admin, kết hợp khách từ đơn hàng)
  const registeredCustomersCount = users.filter((u) => u.role !== 'admin').length;
  // Lấy danh sách khách hàng duy nhất từ các đơn hàng
  const uniqueOrderCustomers = new Set(orders.map((o) => o.customerName || o.phone)).size;
  const totalCustomersCount = Math.max(registeredCustomersCount, uniqueOrderCustomers, 1);

  return (
    <div className="container" style={{ padding: '30px 20px 80px' }}>
      {/* Top Header của Admin */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#ff6b35', fontWeight: '800', fontSize: '0.88rem' }}>
            <span>👑</span> BẢNG ĐIỀU KHIỂN QUẢN TRỊ VIÊN (ROLE: ADMIN)
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#1e293b', marginTop: '2px' }}>
            Hệ Thống Quản Lý PetCare Joy
          </h2>
        </div>

        {onBackToStore && (
          <button className="btn-secondary-cta" onClick={onBackToStore}>
            ← Quay về Giao Diện Khách Hàng
          </button>
        )}
      </div>

      {/* =========================================================================
          4 THẺ KPI HIỂN THỊ PHÍA TRÊN CÙNG CỦA TRANG ADMIN THEO YÊU CẦU 3
         ========================================================================= */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '18px',
          marginBottom: '32px',
        }}
      >
        {/* KPI 1: Tổng doanh thu (Chỉ tính các đơn Hoàn thành) */}
        <div
          className="trust-card"
          style={{
            borderLeft: '5px solid #10b981',
            background: '#ffffff',
            boxShadow: '0 4px 20px rgba(16, 185, 129, 0.08)',
          }}
        >
          <div className="trust-icon-box green">💰</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>
              Tổng doanh thu (Đơn Hoàn thành)
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#1e293b', marginTop: '2px' }}>
              {formatCurrency(totalRevenue)}
            </div>
            <div style={{ fontSize: '0.74rem', color: '#10b981', fontWeight: '700', marginTop: '4px' }}>
              ✓ Đã đối soát {completedOrders.length} đơn hoàn tất
            </div>
          </div>
        </div>

        {/* KPI 2: Số đơn chờ xử lý */}
        <div
          className="trust-card"
          style={{
            borderLeft: '5px solid #ff6b35',
            background: '#ffffff',
            boxShadow: '0 4px 20px rgba(255, 107, 53, 0.08)',
          }}
        >
          <div className="trust-icon-box orange">⏳</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>
              Số đơn chờ xử lý
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ff6b35', marginTop: '2px' }}>
              {pendingOrdersCount} đơn
            </div>
            <div style={{ fontSize: '0.74rem', color: pendingOrdersCount > 0 ? '#ea580c' : '#64748b', fontWeight: '700', marginTop: '4px' }}>
              {pendingOrdersCount > 0 ? '⚡ Cần duyệt xuất chuồng ngay' : 'Đã duyệt toàn bộ'}
            </div>
          </div>
        </div>

        {/* KPI 3: Tổng số sản phẩm đang bán */}
        <div
          className="trust-card"
          style={{
            borderLeft: '5px solid #3b82f6',
            background: '#ffffff',
            boxShadow: '0 4px 20px rgba(59, 130, 246, 0.08)',
          }}
        >
          <div className="trust-icon-box blue">🐶</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>
              Tổng số sản phẩm đang bán
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#1e293b', marginTop: '2px' }}>
              {totalProductsCount} sản phẩm
            </div>
            <div style={{ fontSize: '0.74rem', color: '#3b82f6', fontWeight: '700', marginTop: '4px' }}>
              Bao gồm chó, mèo, hạt & phụ kiện
            </div>
          </div>
        </div>

        {/* KPI 4: Tổng số khách hàng */}
        <div
          className="trust-card"
          style={{
            borderLeft: '5px solid #8b5cf6',
            background: '#ffffff',
            boxShadow: '0 4px 20px rgba(139, 92, 246, 0.08)',
          }}
        >
          <div className="trust-icon-box purple">👥</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>
              Tổng số khách hàng
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#1e293b', marginTop: '2px' }}>
              {totalCustomersCount} khách hàng
            </div>
            <div style={{ fontSize: '0.74rem', color: '#8b5cf6', fontWeight: '700', marginTop: '4px' }}>
              Đã đăng ký tài khoản & đặt đơn
            </div>
          </div>
        </div>
      </div>

      {/* Tabs chuyển đổi giữa Tổng quan, Quản lý Sản phẩm, Quản lý Đơn hàng */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '28px', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', flexWrap: 'wrap' }}>
        <button
          className={`tab-btn ${activeAdminTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveAdminTab('overview')}
        >
          📊 Báo Cáo Tổng Quan
        </button>
        <button
          className={`tab-btn ${activeAdminTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveAdminTab('orders')}
          style={{ position: 'relative' }}
        >
          📦 Quản Lý Đơn Hàng ({orders.length})
          {pendingOrdersCount > 0 && (
            <span
              style={{
                marginLeft: '6px',
                background: '#ff6b35',
                color: '#fff',
                fontSize: '0.7rem',
                padding: '2px 6px',
                borderRadius: '10px',
                fontWeight: '800',
              }}
            >
              {pendingOrdersCount}
            </span>
          )}
        </button>
        <button
          className={`tab-btn ${activeAdminTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveAdminTab('products')}
        >
          🐶 Quản Lý Thú Cưng ({products.length})
        </button>
      </div>

      {/* Tab 1: Tổng quan */}
      {activeAdminTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {/* Hoạt động cần xử lý ngay */}
          <div style={{ background: '#ffffff', padding: '24px', borderRadius: '20px', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '14px', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>⚡</span> Trạng Thái Đơn Hàng Cần Xử Lý
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#fff7ed', borderRadius: '10px', borderLeft: '4px solid #ff6b35' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: '600', color: '#9a3412' }}>Đơn hàng chờ xác nhận:</span>
                <strong style={{ color: '#ff6b35' }}>{pendingOrdersCount} đơn</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#eff6ff', borderRadius: '10px', borderLeft: '4px solid #3b82f6' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: '600', color: '#1e40af' }}>Đang vận chuyển máy lạnh:</span>
                <strong style={{ color: '#2563eb' }}>{orders.filter((o) => o.status === 'shipping').length} đơn</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#ecfdf5', borderRadius: '10px', borderLeft: '4px solid #10b981' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: '600', color: '#065f46' }}>Đã bàn giao thành công:</span>
                <strong style={{ color: '#10b981' }}>{completedOrders.length} đơn</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#fef2f2', borderRadius: '10px', borderLeft: '4px solid #ef4444' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: '600', color: '#991b1b' }}>Đơn đã hủy:</span>
                <strong style={{ color: '#ef4444' }}>{orders.filter((o) => o.status === 'cancelled').length} đơn</strong>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveAdminTab('orders')}
              className="btn-primary-cta"
              style={{ width: '100%', marginTop: '18px', padding: '10px', fontSize: '0.88rem' }}
            >
              📦 Chuyển Sang Quản Lý Đơn Hàng
            </button>
          </div>

          {/* Top Thú Cưng Bán Chạy */}
          <div style={{ background: '#ffffff', padding: '24px', borderRadius: '20px', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '14px', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🐶</span> Thú Cưng Được Yêu Thích Nhất
            </h4>
            <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: '2.1', fontSize: '0.9rem' }}>
              <li><strong>Chó Poodle Teacup Nâu Đỏ:</strong> 12 lượt đón bé thành công</li>
              <li><strong>Mèo Anh Lông Ngắn (Aln) Xám Xanh:</strong> 9 lượt đón bé thành công</li>
              <li><strong>Chó Corgi Chân Ngắn Tri-Color:</strong> 7 lượt đón bé thành công</li>
              <li><strong>Mèo Ragdoll Mắt Xanh Dương:</strong> 5 lượt đón bé thành công</li>
            </ul>
          </div>
        </div>
      )}

      {/* Tab 2: Quản lý Đơn hàng (ManageOrders) kết nối trực tiếp dữ liệu */}
      {activeAdminTab === 'orders' && (
        <ManageOrders
          orders={orders}
          onUpdateOrderStatus={onUpdateOrderStatus}
        />
      )}

      {/* Tab 3: Quản lý Sản phẩm (ManageProducts) */}
      {activeAdminTab === 'products' && (
        <ManageProducts
          products={products}
          onAddProduct={onAddProduct}
          onDeleteProduct={onDeleteProduct}
        />
      )}
    </div>
  );
}
