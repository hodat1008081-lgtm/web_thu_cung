// src/pages/Admin/ManageProducts.jsx
// Nhiệm vụ: Đạt - Quản lý danh mục thú cưng, tồn kho (stock), giá vốn & thêm/sửa/xóa sản phẩm
import { useState } from 'react';
import { formatCurrency } from '../../data/products';
import { useStore } from '../../context/StoreContext';

export default function ManageProducts({ onNotify }) {
  const { products, addProduct, updateProduct, updateProductStock, deleteProduct } = useStore();

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [stockDrafts, setStockDrafts] = useState({});

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'dog',
    categoryName: 'Chó cảnh thuần chủng',
    price: '',
    costPrice: '',
    stock: '10',
    age: '2 tháng tuổi',
    gender: 'Đực',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80',
    badge: 'Mới về',
    badgeType: 'new',
    description: '',
  });

  const [editForm, setEditForm] = useState(null);

  const notify = (msg) => {
    if (onNotify) onNotify(msg);
  };

  const getCategoryName = (cat) => {
    switch (cat) {
      case 'dog':
        return 'Chó cảnh thuần chủng';
      case 'cat':
        return 'Mèo cảnh quý tộc';
      case 'food':
        return 'Thức ăn & Dinh dưỡng';
      default:
        return 'Phụ kiện & Đồ chơi';
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) {
      alert('Vui lòng nhập tên và giá sản phẩm!');
      return;
    }

    const priceNum = Number(newProduct.price);
    const costNum =
      newProduct.costPrice !== '' && !Number.isNaN(Number(newProduct.costPrice))
        ? Number(newProduct.costPrice)
        : Math.round(priceNum * 0.7);
    const stockNum = Math.max(0, Math.floor(Number(newProduct.stock) || 0));

    const created = addProduct({
      ...newProduct,
      id: Date.now(),
      price: priceNum,
      costPrice: costNum,
      originalPrice: Math.round(priceNum * 1.1),
      stock: stockNum,
      rating: 5.0,
      reviewsCount: 1,
      tags: [newProduct.age, 'Đã kiểm dịch', 'Mới nhập'],
    });

    if (created) {
      notify(`✅ Đã thêm mới "${created.name}" (Tồn kho: ${created.stock}) vào kho hàng!`);
    }

    setIsAdding(false);
    setNewProduct({
      name: '',
      category: 'dog',
      categoryName: 'Chó cảnh thuần chủng',
      price: '',
      costPrice: '',
      stock: '10',
      age: '2 tháng tuổi',
      gender: 'Đực',
      image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80',
      badge: 'Mới về',
      badgeType: 'new',
      description: '',
    });
  };

  const startEditing = (item) => {
    setIsAdding(false);
    setEditingId(item.id);
    setEditForm({
      name: item.name || '',
      category: item.category || 'dog',
      categoryName: item.categoryName || getCategoryName(item.category || 'dog'),
      price: String(item.price || 0),
      costPrice: String(item.costPrice ?? Math.round((item.price || 0) * 0.7)),
      stock: String(item.stock ?? 0),
      age: item.age || '',
      gender: item.gender || 'Không áp dụng',
      image: item.image || '',
      description: item.description || '',
    });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editForm || !editingId) return;

    const priceNum = Number(editForm.price) || 0;
    const costNum =
      editForm.costPrice !== '' && !Number.isNaN(Number(editForm.costPrice))
        ? Number(editForm.costPrice)
        : Math.round(priceNum * 0.7);
    const stockNum = Math.max(0, Math.floor(Number(editForm.stock) || 0));

    updateProduct(editingId, {
      ...editForm,
      price: priceNum,
      costPrice: costNum,
      stock: stockNum,
    });

    notify(`✅ Đã cập nhật thông tin & kho hàng cho "${editForm.name}"!`);
    setEditingId(null);
    setEditForm(null);
  };

  const handleQuickStockStep = (item, delta) => {
    const nextStock = Math.max(0, (item.stock || 0) + delta);
    updateProductStock(item.id, nextStock);
    setStockDrafts((prev) => {
      const copy = { ...prev };
      delete copy[item.id];
      return copy;
    });
    notify(`📦 Đã cập nhật tồn kho "${item.name}": ${nextStock} sản phẩm.`);
  };

  const handleSaveDraftStock = (item) => {
    const draftVal = stockDrafts[item.id];
    if (draftVal === undefined) return;
    const parsed = Math.max(0, Math.floor(Number(draftVal) || 0));
    updateProductStock(item.id, parsed);
    setStockDrafts((prev) => {
      const copy = { ...prev };
      delete copy[item.id];
      return copy;
    });
    notify(`💾 Đã lưu tồn kho "${item.name}": ${parsed} sản phẩm.`);
  };

  const handleDelete = (item) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa "${item.name}" khỏi cửa hàng?`)) {
      deleteProduct(item.id);
      notify(`🗑️ Đã xóa "${item.name}" khỏi hệ thống.`);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#1e293b' }}>
            Quản Lý Kho & Sản Phẩm ({products.length})
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
            Chỉnh sửa trực tiếp tồn kho (stock), giá vốn, thêm mới hoặc cập nhật sản phẩm — lưu tức thì vào localStorage
          </p>
        </div>

        <button
          className="btn-primary-cta"
          onClick={() => {
            setEditingId(null);
            setIsAdding(!isAdding);
          }}
          style={{ padding: '10px 18px', fontSize: '0.9rem' }}
        >
          {isAdding ? '✕ Đóng Form' : '➕ Thêm Sản Phẩm / Bé Cưng'}
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '14px' }}>
            <div>
              <label className="form-label">Tên sản phẩm / giống cún mèo *</label>
              <input
                type="text"
                required
                className="form-input"
                placeholder="VD: Chó Phốc Sóc Mặt Gấu"
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
                  setNewProduct({ ...newProduct, category: cat, categoryName: getCategoryName(cat) });
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
                min="0"
                className="form-input"
                placeholder="VD: 5500000"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
            </div>

            <div>
              <label className="form-label">Giá vốn (mặc định 70%)</label>
              <input
                type="number"
                min="0"
                className="form-input"
                placeholder={newProduct.price ? `Mặc định: ${Math.round(Number(newProduct.price) * 0.7)}` : 'Tự tính 70% giá bán'}
                value={newProduct.costPrice}
                onChange={(e) => setNewProduct({ ...newProduct, costPrice: e.target.value })}
              />
            </div>

            <div>
              <label className="form-label">Số lượng tồn kho *</label>
              <input
                type="number"
                required
                min="0"
                className="form-input"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '18px' }}>
            <div>
              <label className="form-label">Độ tuổi / Quy cách</label>
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
                <option value="Không áp dụng">Không áp dụng</option>
              </select>
            </div>
            <div>
              <label className="form-label">URL Hình ảnh</label>
              <input
                type="text"
                className="form-input"
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              />
            </div>
          </div>

          <button type="submit" className="submit-btn-full" style={{ maxWidth: '240px' }}>
            Lưu Sản Phẩm Vào Kho
          </button>
        </form>
      )}

      {/* Form Chỉnh sửa Sản phẩm */}
      {editingId && editForm && (
        <form
          onSubmit={handleSaveEdit}
          style={{
            background: '#eff6ff',
            padding: '24px',
            borderRadius: '20px',
            border: '1.5px solid #bfdbfe',
            marginBottom: '24px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#1d4ed8' }}>
              ✏️ Chỉnh Sửa Sản Phẩm: {editForm.name}
            </h4>
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setEditForm(null);
              }}
              style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '700', cursor: 'pointer' }}
            >
              ✕ Hủy sửa
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '14px' }}>
            <div>
              <label className="form-label">Tên sản phẩm *</label>
              <input
                type="text"
                required
                className="form-input"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              />
            </div>
            <div>
              <label className="form-label">Danh mục</label>
              <select
                className="form-input"
                value={editForm.category}
                onChange={(e) => {
                  const cat = e.target.value;
                  setEditForm({ ...editForm, category: cat, categoryName: getCategoryName(cat) });
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
                min="0"
                className="form-input"
                value={editForm.price}
                onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
              />
            </div>
            <div>
              <label className="form-label">Giá vốn (VNĐ)</label>
              <input
                type="number"
                min="0"
                className="form-input"
                value={editForm.costPrice}
                onChange={(e) => setEditForm({ ...editForm, costPrice: e.target.value })}
              />
            </div>
            <div>
              <label className="form-label">Tồn kho (Stock) *</label>
              <input
                type="number"
                required
                min="0"
                className="form-input"
                value={editForm.stock}
                onChange={(e) => setEditForm({ ...editForm, stock: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" className="btn-primary-cta" style={{ padding: '10px 22px', fontSize: '0.88rem' }}>
              💾 Lưu Thay Đổi
            </button>
          </div>
        </form>
      )}

      {/* Bảng danh sách sản phẩm */}
      <div style={{ overflowX: 'auto', background: '#ffffff', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
              <th style={{ padding: '12px 16px' }}>Hình ảnh</th>
              <th style={{ padding: '12px 16px' }}>Tên thú cưng / Sản phẩm</th>
              <th style={{ padding: '12px 16px' }}>Giá bán / Giá vốn</th>
              <th style={{ padding: '12px 16px' }}>Điều chỉnh Tồn Kho (Stock)</th>
              <th style={{ padding: '12px 16px' }}>Trạng thái</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => {
              const stock = typeof item.stock === 'number' ? item.stock : 0;
              const isOut = stock <= 0;
              const isLow = stock > 0 && stock < 5;
              const draftVal = stockDrafts[item.id];
              const hasPendingDraft = draftVal !== undefined && String(draftVal) !== String(stock);

              return (
                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9', background: isOut ? '#fef2f2' : 'transparent' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ position: 'relative', width: '48px', height: '48px' }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '10px',
                          objectFit: 'cover',
                          filter: isOut ? 'grayscale(60%)' : 'none',
                        }}
                      />
                    </div>
                  </td>

                  <td style={{ padding: '12px 16px' }}>
                    <strong style={{ color: '#1e293b' }}>{item.name}</strong>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
                      <span style={{ background: '#f1f5f9', padding: '1px 6px', borderRadius: '4px', marginRight: '6px' }}>
                        {item.categoryName}
                      </span>
                      {item.age || 'Mọi độ tuổi'}
                    </div>
                  </td>

                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ color: '#ff6b35', fontWeight: '800' }}>{formatCurrency(item.price)}</div>
                    <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                      Vốn: {formatCurrency(item.costPrice ?? Math.round(item.price * 0.7))}
                    </div>
                  </td>

                  {/* Điều chỉnh trực tiếp số lượng tồn kho */}
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <button
                        type="button"
                        onClick={() => handleQuickStockStep(item, -1)}
                        disabled={stock <= 0}
                        title="Giảm tồn kho 1"
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '6px',
                          border: '1px solid #cbd5e1',
                          background: '#f8fafc',
                          fontWeight: '800',
                          cursor: stock <= 0 ? 'not-allowed' : 'pointer',
                          opacity: stock <= 0 ? 0.45 : 1,
                        }}
                      >
                        -
                      </button>

                      <input
                        type="number"
                        min="0"
                        value={draftVal !== undefined ? draftVal : stock}
                        onChange={(e) =>
                          setStockDrafts((prev) => ({
                            ...prev,
                            [item.id]: e.target.value,
                          }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSaveDraftStock(item);
                          }
                        }}
                        style={{
                          width: '58px',
                          textAlign: 'center',
                          padding: '4px 6px',
                          borderRadius: '6px',
                          border: hasPendingDraft ? '1.5px solid #ff6b35' : '1px solid #cbd5e1',
                          fontWeight: '800',
                          fontSize: '0.85rem',
                          color: isOut ? '#dc2626' : '#1e293b',
                        }}
                      />

                      <button
                        type="button"
                        onClick={() => handleQuickStockStep(item, 1)}
                        title="Tăng tồn kho 1"
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '6px',
                          border: '1px solid #cbd5e1',
                          background: '#f8fafc',
                          fontWeight: '800',
                          cursor: 'pointer',
                        }}
                      >
                        +
                      </button>

                      {hasPendingDraft && (
                        <button
                          type="button"
                          onClick={() => handleSaveDraftStock(item)}
                          style={{
                            padding: '4px 8px',
                            borderRadius: '6px',
                            background: '#ff6b35',
                            color: '#fff',
                            fontSize: '0.74rem',
                            fontWeight: '700',
                            border: 'none',
                            cursor: 'pointer',
                          }}
                        >
                          Lưu
                        </button>
                      )}
                    </div>
                  </td>

                  <td style={{ padding: '12px 16px' }}>
                    {isOut ? (
                      <span style={{ color: '#dc2626', background: '#fee2e2', padding: '3px 8px', borderRadius: '6px', fontWeight: '800', fontSize: '0.76rem' }}>
                        ✕ Hết hàng (0)
                      </span>
                    ) : isLow ? (
                      <span style={{ color: '#d97706', background: '#fef3c7', padding: '3px 8px', borderRadius: '6px', fontWeight: '700', fontSize: '0.76rem' }}>
                        ⚠️ Sắp hết ({stock})
                      </span>
                    ) : (
                      <span style={{ color: '#10b981', background: '#ecfdf5', padding: '3px 8px', borderRadius: '6px', fontWeight: '700', fontSize: '0.76rem' }}>
                        ● Còn {stock} SP
                      </span>
                    )}
                  </td>

                  <td style={{ padding: '12px 16px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <button
                      type="button"
                      onClick={() => startEditing(item)}
                      style={{
                        color: '#2563eb',
                        background: '#dbeafe',
                        padding: '6px 10px',
                        borderRadius: '8px',
                        fontWeight: '700',
                        fontSize: '0.8rem',
                        marginRight: '6px',
                        cursor: 'pointer',
                      }}
                    >
                      Sửa
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item)}
                      style={{
                        color: '#ef4444',
                        background: '#fee2e2',
                        padding: '6px 10px',
                        borderRadius: '8px',
                        fontWeight: '700',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                      }}
                    >
                      Xóa
                    </button>
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
