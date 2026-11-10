// src/components/VirtualPet/LevelSystem.jsx
// Nhiệm vụ: Đạt & Vân - Hệ thống Cấp Độ, Tuổi Thú Cưng & Đặc Quyền Level Cao (VIP Perks)
import { useState } from 'react';

export default function LevelSystem({ petState, onClaimVoucher }) {
  const [dailyClaimed, setDailyClaimed] = useState(false);
  const [claimedNotice, setClaimedNotice] = useState(null);

  const level = petState?.level || 1;
  const age = level; // Mỗi level tương ứng với 1 tháng tuổi trưởng thành
  const exp = petState?.exp || 0;
  const maxExpForNextLevel = level * 100;
  const progressPercent = Math.min(100, Math.round((exp / maxExpForNextLevel) * 100));
  const points = petState?.points || 150;

  // Xử lý nhận voucher đặc quyền theo Level hôm nay
  const handleClaimDailyPerk = () => {
    let giftDesc = 'Hạt dinh dưỡng cao cấp (Giảm 5% phụ kiện)';
    if (level >= 8) {
      giftDesc = 'Voucher 200k + Vé ưu tiên đặt cọc thú cưng Limited trước 24h';
    } else if (level >= 5) {
      giftDesc = 'Voucher 100k + Giảm 20% Spa & Cắt tỉa';
    } else if (level >= 3) {
      giftDesc = 'Voucher 50k + Freeship đơn từ 300k';
    }

    setDailyClaimed(true);
    setClaimedNotice(giftDesc);
    setTimeout(() => {
      setClaimedNotice(null);
    }, 4500);
  };

  // Các bậc đặc quyền Level
  const PERK_TIERS = [
    {
      tierLevel: 'Cấp 1 - 2',
      minLvl: 1,
      name: 'Pet Nhập Môn',
      icon: '🥉',
      active: level >= 1 && level < 3,
      unlocked: level >= 1,
      perks: [
        'Tặng 1 phần hạt dinh dưỡng miễn phí mỗi ngày',
        'Voucher giảm 5% cho tất cả phụ kiện, đồ chơi',
      ],
    },
    {
      tierLevel: 'Cấp 3 - 4',
      minLvl: 3,
      name: 'Hội Viên Thân Thiết',
      icon: '🥈',
      active: level >= 3 && level < 5,
      unlocked: level >= 3,
      perks: [
        'Voucher giảm 50.000₫ cho đơn hàng từ 300k',
        'Miễn phí vận chuyển hỏa tốc nội thành',
        'Nhận thông báo sớm 1 tiếng khi có đàn cún/mèo mới về',
      ],
    },
    {
      tierLevel: 'Cấp 5 - 7',
      minLvl: 5,
      name: 'Chuyên Gia Nuôi Cưng',
      icon: '🥇',
      active: level >= 5 && level < 8,
      unlocked: level >= 5,
      perks: [
        'Voucher giảm 100.000₫ cho mọi đơn hàng',
        'Giảm 20% dịch vụ Spa tắm gội & cắt tỉa định kỳ',
        'Quyền xem trước ảnh/video & đặt mua cún thuần chủng Top Pick',
      ],
    },
    {
      tierLevel: 'Cấp 8+',
      minLvl: 8,
      name: 'Đại Gia / Thần Nông VIP',
      icon: '👑',
      active: level >= 8,
      unlocked: level >= 8,
      perks: [
        'Voucher giảm 200.000₫ trực tiếp mỗi tháng',
        'Miễn phí 1 buổi Spa Hoàng Gia trọn gói hàng tháng',
        '⚡ ĐẶC QUYỀN ĐỘC BẢN: Ưu tiên truy cập & đặt chỗ trước 24 giờ các dòng thú cưng Limited Edition (nhập ngoại TICA/VKA, màu hiếm) trước khi mở bán công khai!',
      ],
    },
  ];

  return (
    <div className="space-y-6" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      {/* 1. THẺ CẤP ĐỘ, TUỔI & TIẾN TRÌNH KINH NGHIỆM */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-md shadow-slate-200/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#ff6b35] uppercase tracking-wider mb-1">
              <span>🎂</span> TIẾN TRÌNH TRƯỞNG THÀNH
            </div>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-black text-slate-800" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                Level {level}
              </h3>
              <span className="text-xs font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-200">
                {age} Tháng Tuổi
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Danh hiệu: <strong className="text-slate-700">{petState?.title || 'Cún Con Tinh Nghịch'}</strong>
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 px-4 py-2.5 rounded-2xl border border-orange-200 text-right self-start sm:self-auto">
            <span className="text-[11px] block text-amber-800 font-bold">Điểm Tích Lũy</span>
            <div className="text-lg font-black text-[#ff6b35] flex items-center justify-end gap-1">
              <span>⭐</span> {points} <span className="text-xs font-medium text-slate-500">JoyPoints</span>
            </div>
          </div>
        </div>

        {/* Thanh tiến trình EXP */}
        <div className="space-y-2 mb-6">
          <div className="flex justify-between items-center text-xs font-bold text-slate-600">
            <span>Kinh nghiệm thăng cấp tiếp theo:</span>
            <span className="text-[#ff6b35]">
              {exp} / {maxExpForNextLevel} EXP ({progressPercent}%)
            </span>
          </div>
          <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-[#ff6b35] via-amber-400 to-orange-400 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 text-right">
            Còn thiếu <strong className="text-slate-600">{maxExpForNextLevel - exp} EXP</strong> để bé lên Level {level + 1} ({age + 1} tháng tuổi)
          </p>
        </div>

        {/* Đổi điểm nhận voucher mua hàng thực tế */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50/70 border border-orange-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl shrink-0">🎁</div>
            <div>
              <div className="text-sm font-bold text-slate-800">
                Đổi Điểm Thưởng Lấy Voucher 50.000₫
              </div>
              <div className="text-xs text-slate-500">
                Cần 100 JoyPoints • Áp dụng ngay cho đơn hàng thức ăn, phụ kiện
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onClaimVoucher && onClaimVoucher(50000)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ff6b35] to-[#f0541e] text-white text-xs font-bold shadow-md shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all shrink-0"
          >
            Đổi Voucher Ngay
          </button>
        </div>
      </div>

      {/* 2. ĐẶC QUYỀN LEVEL CAO (HIGH-LEVEL VIP PERKS) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-md shadow-slate-200/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#ff6b35] uppercase tracking-wider mb-1">
              <span>👑</span> HỆ THỐNG ĐẶC QUYỀN LEVEL CAO
            </div>
            <h4 className="text-xl font-black text-slate-800" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              Càng Nuôi Lớn — Ưu Đãi Càng Khủng!
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Level càng cao, mỗi ngày bạn càng nhận được nhiều voucher giảm sâu và quyền mua trước thú cưng phiên bản giới hạn (Limited).
            </p>
          </div>

          {/* Nút nhận ưu đãi ngày */}
          <button
            type="button"
            disabled={dailyClaimed}
            onClick={handleClaimDailyPerk}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all shrink-0 flex items-center justify-center gap-1.5 ${
              dailyClaimed
                ? 'bg-slate-100 text-slate-400 cursor-default'
                : 'bg-gradient-to-r from-amber-500 to-[#ff6b35] text-white hover:shadow-orange-500/30 hover:scale-105 active:scale-95'
            }`}
          >
            <span>{dailyClaimed ? '✓' : '🎁'}</span>
            {dailyClaimed ? 'Đã Nhận Ưu Đãi Hôm Nay' : `Nhận Quà VIP (Level ${level})`}
          </button>
        </div>

        {/* Thông báo khi nhận đặc quyền */}
        {claimedNotice && (
          <div className="mb-5 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fade-in">
            <span>🎉</span> Đã nhận thành công đặc quyền: {claimedNotice}! Mã voucher đã được lưu vào ví thanh toán của bạn.
          </div>
        )}

        {/* Danh sách 4 tầng đặc quyền */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PERK_TIERS.map((tier, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border transition-all duration-200 relative overflow-hidden ${
                tier.unlocked
                  ? tier.active
                    ? 'bg-gradient-to-br from-orange-50/90 to-amber-50/70 border-orange-300 shadow-md ring-2 ring-[#ff6b35]/20'
                    : 'bg-white border-slate-200 shadow-sm'
                  : 'bg-slate-50/60 border-slate-100 opacity-60'
              }`}
            >
              {/* Badge cấp bậc */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{tier.icon}</span>
                  <div>
                    <h5 className="font-extrabold text-sm text-slate-800">{tier.name}</h5>
                    <span className="text-[10px] font-bold text-[#ff6b35] uppercase">{tier.tierLevel}</span>
                  </div>
                </div>

                {tier.active ? (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#ff6b35] text-white shadow-sm">
                    ĐANG KÍCH HOẠT
                  </span>
                ) : tier.unlocked ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                    ĐÃ MỞ KHÓA ✓
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-200 text-slate-500">
                    🔒 Cần Lv.{tier.minLvl}
                  </span>
                )}
              </div>

              {/* Danh sách đặc quyền */}
              <ul className="text-xs text-slate-600 space-y-1.5 mt-3 pl-1">
                {tier.perks.map((p, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-1.5 leading-relaxed">
                    <span className="text-[#ff6b35] font-black mt-0.5">🐾</span>
                    <span className={p.includes('ĐẶC QUYỀN ĐỘC BẢN') ? 'font-bold text-slate-900 bg-amber-100/70 px-1 rounded' : ''}>
                      {p}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
