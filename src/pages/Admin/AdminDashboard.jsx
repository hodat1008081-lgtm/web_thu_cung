// src/pages/Admin/AdminDashboard.jsx
// Nhiệm vụ: Đạt & Nhóm - Dashboard Quản trị tính toán động 100% từ StoreContext (Orders & Products)
import { useState, useMemo } from 'react';
import ManageProducts from './ManageProducts';
import ManageOrders from './ManageOrders';
import { formatCurrency } from '../../data/products';
import { useStore } from '../../context/StoreContext';

export default function AdminDashboard({ onBackToStore, onNotify }) {
  const { products, orders, users, resetDemoData } = useStore();
  const [activeAdminTab, setActiveAdminTab] = useState('overview'); // 'overview' | 'orders' | 'products'

  // =========================================================================
  // TÍNH TOÁN ĐỘNG TOÀN BỘ KPI TỪ ORDERS & PRODUCTS (KHÔNG DÙNG SỐ ẢO)
  // =========================================================================
  const stats = useMemo(() => {
    const completedOrders = orders.filter((o) => o.status === 'Hoàn thành');
    const pendingOrders = orders.filter((o) => o.status === 'Chờ xác nhận');
    const shippingOrders = orders.filter((o) => o.status === 'Đang giao');
    const cancelledOrders = orders.filter((o) => o.status === 'Đã hủy');

    // 1. Tổng doanh thu (chỉ tính các đơn hàng có trạng thái "Hoàn thành")
    const totalRevenue = completedOrders.reduce(
      (sum, o) => sum + (Number(o.totalAmount) || Number(o.totalPrice) || 0),
      0
    );

    // 2. Lợi nhuận thực tế: (Giá bán - Giá vốn) * Số lượng từ các đơn "Hoàn thành"
    const totalProfit = completedOrders.reduce((orderSum, order) => {
      const itemsProfit = (order.items || []).reduce((itemSum, item) => {
        const storeProd = products.find((p) => p.id === item.id);
        const unitPrice = Number(item.price) || 0;
        const unitCost =
          typeof item.costPrice === 'number'
            ? item.costPrice
            : storeProd?.costPrice ?? Math.round(unitPrice * 0.7);
        const qty = Number(item.quantity) || 1;
        return itemSum + (unitPrice - unitCost) * qty;
      }, 0);
      return orderSum + itemsProfit;
    }, 0);

    // 3. Cảnh báo kho hàng
    const outOfStockProducts = products.filter((p) => (p.stock ?? 0) <= 0);
    const lowStockProducts = products.filter((p) => (p.stock ?? 0) > 0 && (p.stock ?? 0) < 5);

    // 4. Khách hàng thực tế đã đăng ký (role !== 'admin')
    const customerUsersCount = users.filter((u) => u.role !== 'admin').length;

    // 5. Thống kê sản phẩm bán chạy thực tế từ các đơn không bị hủy
    const soldQtyMap = {};
    for (const o of orders) {
      if (o.status === 'Đã hủy') continue;
      for (const it of o.items || []) {
        if (!soldQtyMap[it.id]) {
          soldQtyMap[it.id] = { name: it.name, qty: 0, revenue: 0 };
        }
        soldQtyMap[it.id].qty += Number(it.quantity) || 1;
        soldQtyMap[it.id].revenue += (Number(it.price) || 0) * (Number(it.quantity) || 1);
      }
    }
    const topSoldItems = Object.values(soldQtyMap)
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 5);

    return {
      totalRevenue,
      totalProfit,
      totalOrdersCount: orders.length,
      completedCount: completedOrders.length,
      pendingCount: pendingOrders.length,
      shippingCount: shippingOrders.length,
      cancelledCount: cancelledOrders.length,
      outOfStockProducts,
      lowStockProducts,
      customerUsersCount,
      topSoldItems,
    };
  }, [orders, products, users]);

  const handleResetDemo = () => {
    if (
      window.confirm(
        'Bạn muốn khôi phục lại toàn bộ dữ liệu mẫu (Reset products, xóa đơn hàng test, giữ lại tài khoản Admin)?'
      )
    ) {
      resetDemoData();
      if (onNotify) onNotify('🔄 Đã khôi phục dữ liệu mẫu về trạng thái ban đầu!');
    }
  };

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

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            type="button"
            onClick={handleResetDemo}
            title="Khôi phục dữ liệu mẫu mặc định trong localStorage"
            style={{
              padding: '8px 14px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              background: '#f8fafc',
              color: '#475569',
              fontSize: '0.82rem',
              fontWeight: '700',
              cursor: 'pointer',
            }}
          >
            🔄 Reset dữ liệu mẫu
          </button>

          {onBackToStore && (
            <button className="btn-secondary-cta" onClick={onBackToStore}>
              ← Quay về Cửa Hàng
            </button>
          )}
        </div>
      </div>

      {/* =========================================================================
          4 THẺ KPI TÍNH TOÁN ĐỘNG TỪ ORDERS & PRODUCTS
         ========================================================================= */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '18px',
          marginBottom: '32px',
        }}
      >
        {/* KPI 1: Tổng doanh thu (Chỉ tính đơn Hoàn thành) */}
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
              Tổng doanh thu thực tế
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#1e293b', marginTop: '2px' }}>
              {formatCurrency(stats.totalRevenue)}
            </div>
            <div style={{ fontSize: '0.73rem', color: '#10b981', fontWeight: '700', marginTop: '4px' }}>
              * Chỉ tính {stats.completedCount} đơn đã "Hoàn thành"
            </div>
          </div>
        </div>

        {/* KPI 2: Lợi nhuận thực tế (Giá bán - Giá vốn) * Số lượng */}
        <div
          className="trust-card"
          style={{
            borderLeft: '5px solid #8b5cf6',
            background: '#ffffff',
            boxShadow: '0 4px 20px rgba(139, 92, 246, 0.08)',
          }}
        >
          <div className="trust-icon-box purple">📈</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>
              Lợi nhuận thực tế
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#7c3aed', marginTop: '2px' }}>
              {formatCurrency(stats.totalProfit)}
            </div>
            <div style={{ fontSize: '0.73rem', color: '#64748b', fontWeight: '600', marginTop: '4px' }}>
              = ∑ (Giá bán - Giá vốn) × SL thành công
            </div>
          </div>
        </div>

        {/* KPI 3: Tổng số đơn hàng (Phân tách rõ trạng thái) */}
        <div
          className="trust-card"
          style={{
            borderLeft: '5px solid #3b82f6',
            background: '#ffffff',
            boxShadow: '0 4px 20px rgba(59, 130, 246, 0.08)',
          }}
        >
          <div className="trust-icon-box blue">📦</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>
              Tổng số đơn hàng
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#1e293b', marginTop: '2px' }}>
              {stats.totalOrdersCount} đơn
            </div>
            <div style={{ fontSize: '0.72rem', color: '#475569', fontWeight: '600', marginTop: '4px', lineHeight: '1.4' }}>
              <span style={{ color: '#d97706' }}>Chờ: {stats.pendingCount}</span> •{' '}
              <span style={{ color: '#15803d' }}>Xong: {stats.completedCount}</span> •{' '}
              <span style={{ color: '#dc2626' }}>Hủy: {stats.cancelledCount}</span>
            </div>
          </div>
        </div>

        {/* KPI 4: Cảnh báo kho hàng (Hết hàng & Sắp hết) */}
        <div
          className="trust-card"
          style={{
            borderLeft: '5px solid #ff6b35',
            background: '#ffffff',
            boxShadow: '0 4px 20px rgba(255, 107, 53, 0.08)',
          }}
        >
          <div className="trust-icon-box orange">⚠️</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>
              Cảnh báo tồn kho ({products.length} SP)
            </div>
            <div style={{ fontSize: '1.3rem', fontWeight: '800', color: '#ff6b35', marginTop: '2px' }}>
              {stats.outOfStockProducts.length} hết • {stats.lowStockProducts.length} sắp hết
            </div>
            <div style={{ fontSize: '0.73rem', color: '#64748b', fontWeight: '600', marginTop: '4px' }}>
              Khách hàng đã ĐK: <strong>{stats.customerUsersCount}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs chuyển đổi */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '28px', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', flexWrap: 'wrap' }}>
        <button
          className={`tab-btn ${activeAdminTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveAdminTab('overview')}
        >
          📊 Báo Cáo Thực Tế
        </button>
        <button
          className={`tab-btn ${activeAdminTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveAdminTab('orders')}
        >
          📦 Quản Lý Đơn Hàng ({orders.length})
          {stats.pendingCount > 0 && (
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
              {stats.pendingCount}
            </span>
          )}
        </button>
        <button
          className={`tab-btn ${activeAdminTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveAdminTab('products')}
        >
          🐶 Quản Lý Kho & Sản Phẩm ({products.length})
        </button>
      </div>

      {/* Tab 1: Tổng quan động */}
      {activeAdminTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {/* Tình trạng đơn hàng & Sản phẩm bán chạy thực tế */}
          <div style={{ background: '#ffffff', padding: '24px', borderRadius: '20px', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '14px', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>📦</span> Tiến Độ Xử Lý Đơn Hàng
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#fff7ed', borderRadius: '10px', borderLeft: '4px solid #ff6b35' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: '600', color: '#9a3412' }}>Chờ xác nhận:</span>
                <strong style={{ color: '#ff6b35' }}>{stats.pendingCount} đơn</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#eff6ff', borderRadius: '10px', borderLeft: '4px solid #3b82f6' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: '600', color: '#1e40af' }}>Đang giao:</span>
                <strong style={{ color: '#2563eb' }}>{stats.shippingCount} đơn</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#ecfdf5', borderRadius: '10px', borderLeft: '4px solid #10b981' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: '600', color: '#065f46' }}>Hoàn thành:</span>
                <strong style={{ color: '#10b981' }}>{stats.completedCount} đơn</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#fef2f2', borderRadius: '10px', borderLeft: '4px solid #ef4444' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: '600', color: '#991b1b' }}>Đã hủy (Đã hoàn kho):</span>
                <strong style={{ color: '#ef4444' }}>{stats.cancelledCount} đơn</strong>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveAdminTab('orders')}
              className="btn-primary-cta"
              style={{ width: '100%', padding: '10px', fontSize: '0.88rem' }}
            >
              📦 Xem & Xử Lý Tất Cả Đơn Hàng
            </button>
          </div>

          {/* Cảnh báo kho hàng thực tế & Top sản phẩm */}
          <div style={{ background: '#ffffff', padding: '24px', borderRadius: '20px', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '14px', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🚨</span> Chi Tiết Cảnh Báo Kho Hàng
            </h4>

            {stats.outOfStockProducts.length === 0 && stats.lowStockProducts.length === 0 ? (
              <div style={{ padding: '14px', background: '#ecfdf5', color: '#065f46', borderRadius: '12px', fontSize: '0.88rem', fontWeight: '600', marginBottom: '18px' }}>
                ✓ Tuyệt vời! Tất cả sản phẩm đều đang có số lượng tồn kho ổn định (≥ 5).
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px', maxHeight: '220px', overflowY: 'auto' }}>
                {stats.outOfStockProducts.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '8px 12px',
                      background: '#fef2f2',
                      borderRadius: '10px',
                      fontSize: '0.84rem',
                    }}
                  >
                    <span style={{ fontWeight: '700', color: '#991b1b' }}>🔴 {p.name}</span>
                    <span style={{ fontWeight: '800', color: '#dc2626' }}>Hết hàng (0)</span>
                  </div>
                ))}
                {stats.lowStockProducts.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '8px 12px',
                      background: '#fffbeb',
                      borderRadius: '10px',
                      fontSize: '0.84rem',
                    }}
                  >
                    <span style={{ fontWeight: '600', color: '#92400e' }}>🟡 {p.name}</span>
                    <span style={{ fontWeight: '800', color: '#d97706' }}>Còn {p.stock}</span>
                  </div>
                ))}
              </div>
            )}

            <h5 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#1e293b', marginBottom: '10px' }}>
              🏆 Sản Phẩm Bán Chạy Từ Đơn Thực Tế
            </h5>
            {stats.topSoldItems.length === 0 ? (
              <p style={{ fontSize: '0.84rem', color: '#94a3b8' }}>
                Chưa có dữ liệu đơn hàng nào. Hãy đặt đơn thử từ giao diện khách hàng!
              </p>
            ) : (
              <ul style={{ paddingLeft: '18px', color: '#475569', fontSize: '0.86rem', lineHeight: '1.8' }}>
                {stats.topSoldItems.map((item, idx) => (
                  <li key={idx}>
                    <strong>{item.name}</strong>: Đã đặt <strong>{item.qty}</strong> ({formatCurrency(item.revenue)})
                  </li>
                ))}
              </ul>
            )}

            <button
              type="button"
              onClick={() => setActiveAdminTab('products')}
              className="btn-secondary-cta"
              style={{ width: '100%', marginTop: '14px', padding: '10px', fontSize: '0.88rem' }}
            >
              🛠️ Nhập Thêm Hàng Vào Kho
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Quản lý Đơn hàng */}
      {activeAdminTab === 'orders' && <ManageOrders onNotify={onNotify} />}

      {/* Tab 3: Quản lý Sản phẩm & Tồn kho */}
      {activeAdminTab === 'products' && <ManageProducts onNotify={onNotify} />}
    </div>
  );
}
