// src/pages/Checkout/CheckoutForm.jsx
// Nhiệm vụ: Hiển - Thu thập thông tin giao nhận thú cưng & khách hàng
import { useState } from "react";

// Hàm kiểm tra một sản phẩm có phải thú cưng sống hay không
const isPetItem = (item) => {
  if (item.category === "dog" || item.category === "cat") return true;
  if (item.category === "food" || item.category === "accessory") return false;
  const name = (item.name || "").toLowerCase();
  const isSupply =
    name.includes("hạt") ||
    name.includes("thức ăn") ||
    name.includes("nhà cây") ||
    name.includes("cào móng") ||
    name.includes("pate") ||
    name.includes("phụ kiện") ||
    name.includes("chuồng") ||
    name.includes("cát");
  if (isSupply) return false;
  return (
    name.includes("chó") ||
    name.includes("mèo") ||
    name.includes("cún") ||
    name.includes("poodle") ||
    name.includes("corgi") ||
    name.includes("retriever") ||
    name.includes("ragdoll") ||
    name.includes("munchkin")
  );
};

// Danh sách 34 tỉnh thành theo yêu cầu hệ thống
const PROVINCE_OPTIONS = [
  { id: "AG", name: "1. An Giang" },
  { id: "BN", name: "2. Bắc Ninh" },
  { id: "CM", name: "3. Cà Mau" },
  { id: "CB", name: "4. Cao Bằng" },
  { id: "CT", name: "5. TP. Cần Thơ" },
  { id: "DN", name: "6. TP. Đà Nẵng" },
  { id: "DL", name: "7. Đắk Lắk" },
  { id: "DB", name: "8. Điện Biên" },
  { id: "DNA", name: "9. Đồng Nai" },
  { id: "DT", name: "10. Đồng Tháp" },
  { id: "GL", name: "11. Gia Lai" },
  { id: "HN", name: "12. TP. Hà Nội" },
  { id: "HT", name: "13. Hà Tĩnh" },
  { id: "HP", name: "14. TP. Hải Phòng" },
  { id: "HCM", name: "15. TP. Hồ Chí Minh" },
  { id: "HUE", name: "16. TP. Huế" },
  { id: "HY", name: "17. Hưng Yên" },
  { id: "KH", name: "18. Khánh Hòa" },
  { id: "LC", name: "19. Lai Châu" },
  { id: "LS", name: "20. Lạng Sơn" },
  { id: "LCA", name: "21. Lào Cai" },
  { id: "LD", name: "22. Lâm Đồng" },
  { id: "NA", name: "23. Nghệ An" },
  { id: "NB", name: "24. Ninh Bình" },
  { id: "PT", name: "25. Phú Thọ" },
  { id: "QNG", name: "26. Quảng Ngãi" },
  { id: "QN", name: "27. Quảng Ninh" },
  { id: "QT", name: "28. Quảng Trị" },
  { id: "SL", name: "29. Sơn La" },
  { id: "TN", name: "30. Tây Ninh" },
  { id: "TNG", name: "31. Thái Nguyên" },
  { id: "TH", name: "32. Thanh Hóa" },
  { id: "TQ", name: "33. Tuyên Quang" },
  { id: "VL", name: "34. Vĩnh Long" },
];

export default function CheckoutForm({
  cartItems = [],
  formData,
  setFormData,
  onNextStep,
}) {
  const [errors, setErrors] = useState({});

  // Phân tích các mặt hàng trong giỏ hàng
  const petItems = cartItems.filter(isPetItem);
  const hasPet = petItems.length > 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Xóa lỗi khi người dùng bắt đầu nhập / chọn lại
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleToggleExtraService = (serviceKey) => {
<<<<<<< Updated upstream
    const current = formData.extraServices || ["vet", "cushion", "guarantee"];
=======
    const current = formData.extraServices || [];
>>>>>>> Stashed changes
    const updated = current.includes(serviceKey)
      ? current.filter((k) => k !== serviceKey)
      : [...current, serviceKey];
    setFormData((prev) => ({ ...prev, extraServices: updated }));
  };

<<<<<<< Updated upstream
  // Nút điền nhanh dữ liệu mẫu phục vụ kiểm thử
  const handleFillDemo = () => {
    setFormData({
      fullName: "Trần Minh Hiển",
      phone: "0988666888",
      email: "minhhien.petcare@gmail.com",
      city: "HCM",
      address: "456 Nguyễn Thị Minh Khai, Phường 5, Quận 3",
      deliveryTime: "morning",
      note: "Chuẩn bị chuồng đệm ấm có máy lạnh cho bé, gọi trước khi đến 30 phút.",
      extraServices: ["vet", "cushion", "guarantee"],
    });
    setErrors({});
  };

=======
>>>>>>> Stashed changes
  // Kiểm tra tính hợp lệ của dữ liệu trước khi chuyển bước
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName || !formData.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ và tên người nhận!";
    }

    if (!formData.phone || !formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại liên hệ!";
    } else {
      const cleanPhone = formData.phone.replace(/[\s.-]/g, "");
      const phoneRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;
      if (!phoneRegex.test(cleanPhone)) {
        newErrors.phone =
          "Số điện thoại không hợp lệ (gồm 10 số, bắt đầu bằng 03, 05, 07, 08, 09)";
      }
    }

    if (!formData.address || !formData.address.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ nhận hàng chi tiết!";
    }

    // QUY TẮC NGHIỆP VỤ: Mặt hàng thú cưng chỉ giao tận nhà tại TP.HCM (Mô hình 100% Online)
<<<<<<< Updated upstream
    if (hasPet && formData.city !== "HCM") {
=======
    if (!formData.city) {
      newErrors.city = 'Vui lòng chọn Tỉnh / Thành phố nhận hàng!';
    } else if (hasPet && formData.city !== 'HCM') {
>>>>>>> Stashed changes
      newErrors.city =
        "Mô hình Online: Thú cưng sống chỉ hỗ trợ giao hàng tận nhà tại TP. Hồ Chí Minh bằng xe máy lạnh chuyên dụng. Quý khách ở tỉnh thành khác vui lòng chọn TP. Hồ Chí Minh hoặc chỉ đặt các sản phẩm thức ăn / phụ kiện.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    if (onNextStep) onNextStep();
  };

  return (
    <div className="checkout-form-card">
      <style>{`
        .checkout-form-card {
          background: #ffffff;
          border-radius: 24px;
          padding: 30px;
          border: 1px solid #f1f5f9;
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
          font-family: inherit;
        }

        .cf-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
          gap: 16px;
        }

        .cf-policy-badge {
          border-radius: 14px;
          padding: 14px 18px;
          margin-bottom: 24px;
          font-size: 0.88rem;
          line-height: 1.5;
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .cf-field-error {
          color: #dc2626;
          font-size: 0.8rem;
          font-weight: 600;
          margin-top: 5px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .cf-checkbox-card {
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 10px 14px;
          background: #fafafa;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.86rem;
        }

        .cf-checkbox-card:hover {
          background: #ffffff;
          border-color: #cbd5e1;
        }

        .cf-checkbox-card.checked {
          background: #f0fdf4;
          border-color: #86efac;
          color: #166534;
        }

        .cf-model-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #eff6ff;
          color: #2563eb;
          padding: 4px 10px;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 700;
          margin-bottom: 12px;
        }

        @media (max-width: 640px) {
          .checkout-form-card {
            padding: 20px 16px;
            border-radius: 18px;
          }

          .cf-header-row {
            flex-direction: column;
            gap: 10px;
          }

          .cf-form-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* Header */}
      <div className="cf-header-row">
        <div>
          <div className="cf-model-tag">
            <span>🌐</span> Mô hình Cửa Hàng Thú Cưng Online 100% - Giao Tận Nhà
          </div>
          <h3
            style={{
              fontSize: "1.3rem",
              fontWeight: "800",
              color: "#1e293b",
              marginBottom: "4px",
            }}
          >
            🚚 1. Thông Tin Nhận Hàng & Giao Bé Tận Nơi
          </h3>
          <p style={{ fontSize: "0.86rem", color: "#64748b", margin: 0 }}>
            PetCare Joy hoạt động theo mô hình trực tuyến, phục vụ giao hàng tận
            nhà nhanh chóng & an toàn.
          </p>
        </div>
      </div>

      {/* ========================================================
          THÔNG BÁO QUY ĐỊNH PHÂN VÙNG GIAO HÀNG ONLINE
         ======================================================== */}
      {hasPet ? (
        <div
          className="cf-policy-badge"
          style={{
            background: "#fff7ed",
            border: "1.5px solid #ffedd5",
            color: "#9a3412",
          }}
        >
          <span style={{ fontSize: "1.5rem", lineHeight: 1 }}>🐾</span>
          <div>
            <div
              style={{
                fontWeight: "800",
                fontSize: "0.92rem",
                marginBottom: "2px",
              }}
            >
              Quy định giao thú cưng sống (Mô hình Online):
            </div>
            <div>
              Đơn hàng của bạn có <strong>{petItems.length} bé thú cưng</strong>{" "}
              ({petItems.map((p) => p.name).join(", ")}). Vì là sinh vật sống
              cần xe máy lạnh 22°C và bác sĩ thú y trực tiếp giao tận nhà để
              kiểm tra sức khỏe, PetCare Joy hiện{" "}
              <strong>
                chỉ nhận giao thú cưng trong khu vực TP. Hồ Chí Minh
              </strong>
              . Khách hàng ở các tỉnh thành khác vui lòng chọn mua phụ kiện,
              thức ăn hoặc đăng ký địa chỉ nhận tại TP.HCM.
            </div>
          </div>
        </div>
      ) : (
        <div
          className="cf-policy-badge"
          style={{
            background: "#f0fdf4",
            border: "1.5px solid #dcfce7",
            color: "#166534",
          }}
        >
          <span style={{ fontSize: "1.5rem", lineHeight: 1 }}>📦</span>
          <div>
            <div
              style={{
                fontWeight: "800",
                fontSize: "0.92rem",
                marginBottom: "2px",
              }}
            >
              Giao hàng tận nơi trên toàn bộ 34 tỉnh thành:
            </div>
            <div>
              Đơn hàng gồm thức ăn & phụ kiện thú cưng, PetCare Joy phục vụ{" "}
              <strong>
                giao hàng tận nơi trên toàn bộ các tỉnh thành tại Việt Nam
              </strong>{" "}
              thông qua các đơn vị chuyển phát nhanh uy tín.
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          FORM NHẬP THÔNG TIN KHÁCH HÀNG
         ======================================================== */}
      <form onSubmit={handleSubmit} noValidate>
        {/* Họ tên & Số điện thoại */}
        <div
          className="cf-form-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          <div className="form-group">
            <label className="form-label">
              <span>👤</span> Họ và tên người nhận *
            </label>
            <input
              type="text"
              name="fullName"
              className="form-input"
              placeholder="VD: Trần Minh Hiển"
              value={formData.fullName || ""}
              onChange={handleChange}
              style={{ borderColor: errors.fullName ? "#ef4444" : undefined }}
            />
            {errors.fullName && (
              <div className="cf-field-error">✕ {errors.fullName}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">
              <span>📞</span> Số điện thoại liên hệ *
            </label>
            <input
              type="tel"
              name="phone"
              className="form-input"
              placeholder="VD: 0988666888"
              value={formData.phone || ""}
              onChange={handleChange}
              style={{ borderColor: errors.phone ? "#ef4444" : undefined }}
            />
            {errors.phone && (
              <div className="cf-field-error">✕ {errors.phone}</div>
            )}
          </div>
        </div>

        {/* Tỉnh / Thành phố & Thời gian nhận bé */}
        <div
          className="cf-form-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          <div className="form-group">
            <label className="form-label">
              <span>🏙️</span> Tỉnh / Thành phố nhận hàng *
            </label>
            <select
              name="city"
              className="form-input"
<<<<<<< Updated upstream
              value={formData.city || "HCM"}
=======
              value={formData.city || ''}
>>>>>>> Stashed changes
              onChange={handleChange}
              style={{
                borderColor: errors.city ? "#ef4444" : undefined,
                fontWeight: "600",
              }}
            >
              <option value="">-- Chọn Tỉnh / Thành phố --</option>
              {PROVINCE_OPTIONS.map((prov) => {
                const isRestrictedForPet = hasPet && prov.id !== "HCM";
                return (
                  <option
                    key={prov.id}
                    value={prov.id}
                    disabled={isRestrictedForPet}
                  >
                    {prov.name}{" "}
                    {isRestrictedForPet ? "— [Chỉ giao phụ kiện/thức ăn]" : ""}
                  </option>
                );
              })}
            </select>
            {errors.city ? (
              <div className="cf-field-error">✕ {errors.city}</div>
<<<<<<< Updated upstream
            ) : hasPet && formData.city !== "HCM" ? (
=======
            ) : hasPet && formData.city && formData.city !== 'HCM' ? (
>>>>>>> Stashed changes
              <div className="cf-field-error">
                ⚠️ Thú cưng sống chỉ hỗ trợ giao tại TP. Hồ Chí Minh. Vui lòng
                chọn TP. Hồ Chí Minh.
              </div>
            ) : null}
          </div>

          <div className="form-group">
            <label className="form-label">
              <span>⏰</span> Thời gian nhận hàng thuận tiện
            </label>
            <select
              name="deliveryTime"
              className="form-input"
<<<<<<< Updated upstream
              value={formData.deliveryTime || "morning"}
=======
              value={formData.deliveryTime || ''}
>>>>>>> Stashed changes
              onChange={handleChange}
            >
              <option value="">-- Chọn thời gian nhận hàng --</option>
              <option value="morning">Buổi sáng (08:30 - 11:30)</option>
              <option value="afternoon">Buổi chiều (14:00 - 17:30)</option>
              <option value="evening">Buổi tối (18:30 - 21:00)</option>
              {formData.city === "HCM" && (
                <option value="urgent">
                  🚀 Giao hỏa tốc 2H (Nội thành TP.HCM)
                </option>
              )}
            </select>
          </div>
        </div>

        {/* Địa chỉ nhận hàng chi tiết */}
        <div className="form-group">
          <label className="form-label">
            <span>📍</span> Địa chỉ nhận hàng tận nơi chi tiết *
          </label>
          <input
            type="text"
            name="address"
            className="form-input"
            placeholder="Số nhà, tên đường, phường/xã, quận/huyện..."
            value={formData.address || ""}
            onChange={handleChange}
            style={{
              borderColor: errors.address ? "#ef4444" : undefined,
            }}
          />
          {errors.address && (
            <div className="cf-field-error">✕ {errors.address}</div>
          )}
        </div>

        {/* Dịch vụ chăm sóc thú cưng đi kèm */}
        {hasPet && (
          <div style={{ marginBottom: "20px" }}>
            <label
              className="form-label"
              style={{ fontWeight: "700", marginBottom: "8px" }}
            >
              <span>🎁</span> Tiện ích chăm sóc thú cưng giao tận nhà (Miễn
              phí):
            </label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "10px",
              }}
            >
              {[
                {
                  id: "vet",
                  icon: "🩺",
                  label: "Bác sĩ thú y đi kèm bàn giao & hướng dẫn 1-1",
                },
                {
                  id: "cushion",
                  icon: "🛋️",
                  label: "Chuồng lót đệm ấm có máy lạnh điều hòa",
                },
                {
                  id: "guarantee",
                  icon: "📜",
                  label: "Hợp đồng bảo hành thuần chủng & Sổ tiêm vắc xin",
                },
              ].map((service) => {
<<<<<<< Updated upstream
                const isChecked = (
                  formData.extraServices || ["vet", "cushion", "guarantee"]
                ).includes(service.id);
=======
                const isChecked = (formData.extraServices || []).includes(
                  service.id
                );
>>>>>>> Stashed changes
                return (
                  <div
                    key={service.id}
                    className={`cf-checkbox-card ${isChecked ? "checked" : ""}`}
                    onClick={() => handleToggleExtraService(service.id)}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleToggleExtraService(service.id)}
                      style={{ accentColor: "#10b981" }}
                    />
                    <span>{service.icon}</span>
                    <span style={{ fontWeight: isChecked ? "700" : "500" }}>
                      {service.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Ghi chú */}
        <div className="form-group">
          <label className="form-label">
            <span>📝</span> Ghi chú cho tài xế giao hàng
          </label>
          <textarea
            name="note"
            rows="2"
            className="form-input"
            placeholder="VD: Xe mở điều hòa mát mẻ 22°C, gọi trước khi giao 30 phút..."
            value={formData.note || ""}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Nút bấm chuyển bước */}
        {onNextStep && (
          <button
            type="submit"
            className="submit-btn-full"
            style={{ marginTop: "12px" }}
          >
            Tiếp Tục Chọn Phương Thức Thanh Toán →
          </button>
        )}
      </form>
    </div>
  );
}
