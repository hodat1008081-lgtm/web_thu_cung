// src/pages/Admin/ManageProducts.jsx
// Nhiệm vụ: Đạt - Quản lý danh mục thú cưng, cập nhật trạng thái & kho hàng
import React, { useState } from 'react';
import { formatCurrency } from '../../data/products';

export default function ManageProducts({ products = [], onAddProduct, onDeleteProduct }) {
  const [isAdding, setIsAdding] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'dog',
    categoryName: 'Chó cảnh thuần chủng',
    price: '',
    originalPrice: '',
    age: '2 tháng tuổi',
    gender: 'Đực',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80',
    badge: 'Mới về',
    badgeType: 'new',
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) {
      alert('Vui lòng nhập tên và giá sản phẩm!');
      return;
    }

    const created = {
      ...newProduct,
      id: Date.now(),
      price: Number(newProduct.price),
      originalPrice: Number(newProduct.originalPrice || newProduct.price),
      rating: 5.0,
      reviewsCount: 1,
      tags: [newProduct.age, 'Đã tiêm vắc xin', 'Mới nhập'],
    };

    if (onAddProduct) onAddProduct(created);
    setIsAdding(false);
    setNewProduct({
      name: '',
      category: 'dog',
      categoryName: 'Chó cảnh thuần chủng',
      price: '',
      originalPrice: '',
      age: '2 tháng tuổi',
      gender: 'Đực',
      image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80',
      badge: 'Mới về',
      badgeType: 'new',
    });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#1e293b' }}>
            Danh Sách Thú Cưng & Sản Phẩm ({products.length})
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
            Thêm mới, sửa giá, kiểm soát tình trạng sức khỏe xuất chuồng
          </p>
        </div>

        <button
          className="btn-primary-cta"
          onClick={() => setIsAdding(!isAdding)}
          style={{ padding: '10px 18px', fontSize: '0.9rem' }}
        >
          {isAdding ? '✕ Đóng Form' : '➕ Thêm Bé Cưng Mới'}
        </button>
      </div>

      {/* Form Thêm mới */}
      {isAdding && (
        <form
          onSubmit={handleCreate}
          style={{
            background: '#fff7ed',
            padding: '24px',
            borderRadius: '20px',
            border: '1.5px solid #fed7aa',
            marginBottom: '24px',
          }}
        >
          <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#ff6b35', marginBottom: '14px' }}>
            Nhập Thông Tin Bé Cưng / Sản Phẩm Mới
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '14px', marginBottom: '14px' }}>
            <div>
              <label className="form-label">Tên giống cún / mèo *</label>
              <input
                type="text"
                required
                className="form-input"
                placeholder="VD: Chó Phốc Sóc Mặt Gấu Màu Kem"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
            </div>

            <div>
              <label className="form-label">Danh mục</label>
              <select
                className="form-input"
                value={newProduct.category}
                onChange={(e) => {
                  const cat = e.target.value;
                  const catName =
                    cat === 'dog'
                      ? 'Chó cảnh thuần chủng'
                      : cat === 'cat'
                      ? 'Mèo cảnh quý tộc'
                      : cat === 'food'
                      ? 'Thức ăn & Dinh dưỡng'
                      : 'Phụ kiện & Đồ chơi';
                  setNewProduct({ ...newProduct, category: cat, categoryName: catName });
                }}
              >
                <option value="dog">🐶 Chó cảnh</option>
                <option value="cat">🐱 Mèo cảnh</option>
                <option value="food">🥣 Thức ăn</option>
                <option value="accessory">🎀 Phụ kiện</option>
              </select>
            </div>

            <div>
              <label className="form-label">Giá bán (VNĐ) *</label>
              <input
                type="number"
                required
                className="form-input"
                placeholder="VD: 5500000"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: '14px', marginBottom: '18px' }}>
            <div>
              <label className="form-label">Độ tuổi</label>
              <input
                type="text"
                className="form-input"
                placeholder="2 tháng tuổi"
                value={newProduct.age}
                onChange={(e) => setNewProduct({ ...newProduct, age: e.target.value })}
              />
            </div>
            <div>
              <label className="form-label">Giới tính</label>
              <select
                className="form-input"
                value={newProduct.gender}
                onChange={(e) => setNewProduct({ ...newProduct, gender: e.target.value })}
              >
                <option value="Đực">Đực</option>
                <option value="Cái">Cái</option>
                <option value="Không">Không áp dụng</option>
              </select>
            </div>
            <div>
              <label className="form-label">URL Hình ảnh</label>
              <input
                type="url"
                className="form-input"
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              />
            </div>
          </div>

          <button type="submit" className="submit-btn-full" style={{ maxWidth: '240px' }}>
            Lưu Sản Phẩm Ngay
          </button>
        </form>
      )}

      {/* Bảng danh sách sản phẩm */}
      <div style={{ overflowX: 'auto', background: '#ffffff', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
              <th style={{ padding: '12px 16px' }}>Hình ảnh</th>
              <th style={{ padding: '12px 16px' }}>Tên thú cưng / Sản phẩm</th>
              <th style={{ padding: '12px 16px' }}>Phân loại</th>
              <th style={{ padding: '12px 16px' }}>Giá niêm yết</th>
              <th style={{ padding: '12px 16px' }}>Trạng thái</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px 16px' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover' }}
                  />
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <strong style={{ color: '#1e293b' }}>{item.name}</strong>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    {item.age || 'Đã kiểm dịch'} • {item.gender || 'Đực'}
                  </div>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <span
                    style={{
                      background: '#f1f5f9',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '0.78rem',
                      color: '#475569',
                      fontWeight: '600',
                    }}
                  >
                    {item.categoryName}
                  </span>
                </td>
                <td style={{ padding: '12px 16px', color: '#ff6b35', fontWeight: '800' }}>
                  {formatCurrency(item.price)}
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ color: '#10b981', fontWeight: '700', fontSize: '0.82rem' }}>
                    ● Đang mở bán
                  </span>
                </td>
                <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                  <button
                    onClick={() => onDeleteProduct && onDeleteProduct(item.id)}
                    style={{
                      color: '#ef4444',
                      background: '#fee2e2',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontWeight: '700',
                      fontSize: '0.8rem',
                    }}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
