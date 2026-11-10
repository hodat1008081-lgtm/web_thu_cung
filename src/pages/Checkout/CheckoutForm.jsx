// src/pages/Checkout/CheckoutForm.jsx
// Nhiệm vụ: Hiển - Thu thập thông tin giao nhận thú cưng & khách hàng
import React from 'react';

export default function CheckoutForm({ formData, setFormData, onNextStep }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) {
      alert('Vui lòng điền đầy đủ các thông tin giao hàng!');
      return;
    }
    if (onNextStep) onNextStep();
  };

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '24px',
        padding: '30px',
        border: '1px solid #f1f5f9',
        boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
      }}
    >
      <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>
        🚚 1. Thông Tin Nhận Hàng & Giao Bé
      </h3>
      <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '24px' }}>
        PetCare Joy sử dụng xe chuyên dụng có máy lạnh để vận chuyển thú cưng an toàn nhất.
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div className="form-group">
            <label className="form-label">Họ và tên người nhận *</label>
            <input
              type="text"
              name="fullName"
              required
              className="form-input"
              placeholder="VD: Trần Minh Hiển"
              value={formData.fullName || ''}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Số điện thoại liên hệ *</label>
            <input
              type="tel"
              name="phone"
              required
              className="form-input"
              placeholder="VD: 0988 666 888"
              value={formData.phone || ''}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Địa chỉ nhận hàng chi tiết *</label>
          <input
            type="text"
            name="address"
            required
            className="form-input"
            placeholder="Số nhà, tên đường, phường/xã, quận/huyện"
            value={formData.address || ''}
            onChange={handleChange}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div className="form-group">
            <label className="form-label">Tỉnh / Thành phố *</label>
            <select
              name="city"
              className="form-input"
              value={formData.city || 'HN'}
              onChange={handleChange}
            >
              <option value="HN">Hà Nội</option>
              <option value="HCM">TP. Hồ Chí Minh</option>
              <option value="DN">Đà Nẵng</option>
              <option value="HP">Hải Phòng</option>
              <option value="CT">Cần Thơ</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Thời gian nhận bé thuận tiện</label>
            <select
              name="deliveryTime"
              className="form-input"
              value={formData.deliveryTime || 'morning'}
              onChange={handleChange}
            >
              <option value="morning">Buổi sáng (08:30 - 11:30)</option>
              <option value="afternoon">Buổi chiều (14:00 - 17:30)</option>
              <option value="evening">Buổi tối (18:30 - 21:00)</option>
              <option value="urgent">Giao hỏa tốc 2H (Nội thành)</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Ghi chú vận chuyển thú cưng (nếu có)</label>
          <textarea
            name="note"
            rows="3"
            className="form-input"
            placeholder="VD: Gọi trước khi tới 30 phút, chuẩn bị nước uống và chuồng lót đệm ấm cho bé..."
            value={formData.note || ''}
            onChange={handleChange}
          ></textarea>
        </div>

        {onNextStep && (
          <button type="submit" className="submit-btn-full" style={{ marginTop: '10px' }}>
            Tiếp Tục Chọn Phương Thức Thanh Toán →
          </button>
        )}
      </form>
    </div>
  );
}
