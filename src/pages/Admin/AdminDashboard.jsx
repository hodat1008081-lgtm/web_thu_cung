// src/pages/Admin/AdminDashboard.jsx
// Nhiệm vụ: Đạt - Tổng quan hệ thống quản trị PetCare Joy
import React, { useState } from 'react';
import ManageProducts from './ManageProducts';
import ManageOrders from './ManageOrders';
import { formatCurrency } from '../../data/products';

export default function AdminDashboard({ products = [], onAddProduct, onDeleteProduct, onBackToStore }) {
  const [activeAdminTab, setActiveAdminTab] = useState('overview'); // 'overview' | 'products' | 'orders'

  // Thống kê nhanh
  const totalRevenue = 154800000;
  const totalPetsSold = 38;
  const totalOrdersCount = 52;
  const satisfactionRate = 99.4;

  return (
    <div className="container" style={{ padding: '30px 20px 80px' }}>
      {/* Top Header của Admin */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '28px',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#ff6b35', fontWeight: '700', fontSize: '0.9rem' }}>
            👑 BẢNG ĐIỀU KHIỂN QUẢN TRỊ VIÊN
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#1e293b' }}>
            Hệ Thống Quản Lý PetCare Joy
          </h2>
        </div>

        {onBackToStore && (
          <button className="btn-secondary-cta" onClick={onBackToStore}>
            ← Quay về Giao Diện Khách Hàng
          </button>
        )}
      </div>

      {/* Tabs chuyển đổi giữa Tổng quan, Quản lý Sản phẩm, Quản lý Đơn hàng */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '28px', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px' }}>
        <button
          className={`tab-btn ${activeAdminTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveAdminTab('overview')}
        >
          📊 Thống Kê Tổng Quan
        </button>
        <button
          className={`tab-btn ${activeAdminTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveAdminTab('products')}
        >
          🐶 Quản Lý Thú Cưng ({products.length})
        </button>
        <button
          className={`tab-btn ${activeAdminTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveAdminTab('orders')}
        >
          📦 Quản Lý Đơn Hàng
        </button>
      </div>

      {/* Nội dung Tab Tổng quan */}
      {activeAdminTab === 'overview' && (
        <div>
          {/* 4 Thẻ KPI */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
            <div className="trust-card" style={{ borderLeft: '5px solid #ff6b35' }}>
              <div className="trust-icon-box orange">💰</div>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Tổng doanh thu tháng</div>
                <div style={{ fontSize: '1.35rem', fontWeight: '800', color: '#1e293b' }}>
                  {formatCurrency(totalRevenue)}
                </div>
              </div>
            </div>

            <div className="trust-card" style={{ borderLeft: '5px solid #10b981' }}>
              <div className="trust-icon-box green">🐾</div>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Bé cưng đã về nhà mới</div>
                <div style={{ fontSize: '1.35rem', fontWeight: '800', color: '#1e293b' }}>
                  {totalPetsSold} bé
                </div>
              </div>
            </div>

            <div className="trust-card" style={{ borderLeft: '5px solid #3b82f6' }}>
              <div className="trust-icon-box blue">📦</div>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Tổng đơn đặt hàng</div>
                <div style={{ fontSize: '1.35rem', fontWeight: '800', color: '#1e293b' }}>
                  {totalOrdersCount} đơn
                </div>
              </div>
            </div>

            <div className="trust-card" style={{ borderLeft: '5px solid #a855f7' }}>
              <div className="trust-icon-box purple">⭐</div>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Mức độ hài lòng</div>
                <div style={{ fontSize: '1.35rem', fontWeight: '800', color: '#1e293b' }}>
                  {satisfactionRate}%
                </div>
              </div>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div style={{ background: '#ffffff', padding: '24px', borderRadius: '20px', border: '1px solid #f1f5f9' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '14px', color: '#1e293b' }}>
                🐶 Thú Cưng Bán Chạy Nhất Tuần
              </h4>
              <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: '2' }}>
                <li>Chó Poodle Teacup Nâu Đỏ (Đã bán 12 bé)</li>
                <li>Mèo Anh Lông Ngắn Xám Xanh (Đã bán 9 bé)</li>
                <li>Chó Corgi Chân Ngắn Tri-Color (Đã bán 7 bé)</li>
                <li>Mèo Ragdoll Mắt Xanh Dương (Đã bán 5 bé)</li>
              </ul>
            </div>

            <div style={{ background: '#ffffff', padding: '24px', borderRadius: '20px', border: '1px solid #f1f5f9' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '14px', color: '#1e293b' }}>
                ⚡ Hoạt Động Cần Xử Lý Ngay
              </h4>
              <ul style={{ paddingLeft: '20px', color: '#475569', lineHeight: '2' }}>
                <li>Có <strong style={{ color: '#ff6b35' }}>2 đơn hàng mới</strong> chờ duyệt xuất chuồng</li>
                <li>Lịch tiêm phòng nhắc lại cho 4 bé cún tại chi nhánh Cầu Giấy</li>
                <li>Bổ sung 50 túi thức ăn hạt Royal Canin vào kho hàng TP.HCM</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Nội dung Tab Quản lý sản phẩm (ManageProducts) */}
      {activeAdminTab === 'products' && (
        <ManageProducts
          products={products}
          onAddProduct={onAddProduct}
          onDeleteProduct={onDeleteProduct}
        />
      )}

      {/* Nội dung Tab Quản lý đơn hàng (ManageOrders) */}
      {activeAdminTab === 'orders' && <ManageOrders />}
    </div>
  );
}
