// src/components/VirtualPet/DailyQuests.jsx
// Nhiệm vụ: Vân & Đạt - Hệ Thống Nhiệm Vụ Hàng Ngày & Cơ Chế Đặc Quyền Mua Hàng
import { useState } from 'react';

export default function DailyQuests({
  quests,
  onClaimQuest,
  onOpenMysteryChest,
  chestCount = 1,
  onNavigateToShop,
}) {
  const [isOpeningChest, setIsOpeningChest] = useState(false);
  const [chestReward, setChestReward] = useState(null);

  const handleOpenChest = () => {
    if (chestCount <= 0) return;
    setIsOpeningChest(true);
    setTimeout(() => {
      const reward = {
        steak: 2,
        expBuff: 'x2 EXP (24h)',
        points: 100,
        shampoo: 2,
        food: 3,
      };
      setChestReward(reward);
      setIsOpeningChest(false);
      if (onOpenMysteryChest) {
        onOpenMysteryChest(reward);
      }
    }, 1200);
  };

  return (
    <div className="space-y-6" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      {/* 1. KHỐI ĐẶC QUYỀN MUA HÀNG: TÍCH ĐIỂM NUÔI CƯNG */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-amber-500 via-orange-500 to-[#ff6b35] text-white shadow-xl shadow-orange-500/20 border border-amber-300/40">
        {/* Họa tiết nền */}
        <div className="absolute -top-12 -right-12 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-amber-400/20 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-100 text-xs font-black uppercase tracking-wider border border-white/20">
              <span>💎</span> ĐẶC QUYỀN MUA HÀNG PETCARE JOY
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              Tích Điểm Nuôi Cưng - Nhận Rương Quà Đặc Biệt!
            </h3>
            <p className="text-sm text-amber-100/90 max-w-xl">
              Mỗi đơn hàng hoàn tất trên website, bạn sẽ được tặng ngay <strong>1 Rương Quà Thần Kỳ</strong> chứa đồ ăn cao cấp, sữa tắm thơm phức và <strong>bùa x2 EXP</strong> giúp thú cưng nhanh lớn!
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-amber-100 font-semibold justify-center md:justify-start">
              <span className="flex items-center gap-1 bg-black/15 px-2.5 py-1 rounded-lg">🥩 Đồ ăn Thượng hạng</span>
              <span className="flex items-center gap-1 bg-black/15 px-2.5 py-1 rounded-lg">⚡ Nhân đôi x2 EXP</span>
              <span className="flex items-center gap-1 bg-black/15 px-2.5 py-1 rounded-lg">⭐ +100 Điểm Thưởng</span>
            </div>
          </div>

          {/* Rương quà tương tác */}
          <div className="flex flex-col items-center justify-center p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/30 shrink-0 text-center min-w-[200px]">
            <div className={`text-5xl mb-2 transition-transform duration-300 ${isOpeningChest ? 'scale-125 animate-bounce' : 'hover:scale-110'}`}>
              🎁
            </div>
            <div className="text-sm font-bold text-white mb-0.5">
              Rương hiện có: <span className="text-amber-200 text-base font-extrabold">{chestCount}</span>
            </div>
            <button
              type="button"
              disabled={chestCount <= 0 || isOpeningChest}
              onClick={handleOpenChest}
              className={`mt-2.5 w-full py-2.5 px-4 rounded-xl font-bold text-xs shadow-md transition-all duration-200 ${
                chestCount > 0
                  ? 'bg-white text-[#ff6b35] hover:bg-amber-50 hover:shadow-lg active:scale-95'
                  : 'bg-white/40 text-white/70 cursor-not-allowed'
              }`}
            >
              {isOpeningChest ? 'Đang Mở Rương...' : chestCount > 0 ? '✨ Mở Rương Quà Ngay' : 'Mua đơn hàng để nhận'}
            </button>
          </div>
        </div>

        {/* Modal/Khối thông báo phần thưởng vừa mở rương */}
        {chestReward && (
          <div className="mt-5 p-4 rounded-2xl bg-white/95 text-slate-800 backdrop-blur-md border border-amber-200 shadow-xl animate-fade-in flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🎊</div>
              <div>
                <h5 className="font-extrabold text-sm text-[#ff6b35]">MỞ RƯƠNG THÀNH CÔNG!</h5>
                <p className="text-xs text-slate-600">
                  Bạn nhận được: <strong>+{chestReward.steak} Bò bít tết</strong>, <strong>+{chestReward.food} Hạt Royal Canin</strong>, <strong>+{chestReward.shampoo} Sữa tắm</strong>, <strong>{chestReward.expBuff}</strong> và <strong>+{chestReward.points} Điểm thưởng</strong>!
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setChestReward(null)}
              className="px-4 py-1.5 rounded-lg bg-[#ff6b35] text-white text-xs font-bold hover:bg-[#f0541e] shrink-0"
            >
              Cất Vào Túi Đồ ✓
            </button>
          </div>
        )}
      </div>

      {/* 2. BẢNG NHIỆM VỤ HÀNG NGÀY (DAILY QUESTS) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-md shadow-slate-200/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ff6b35] uppercase tracking-wider mb-1">
              <span>📋</span> NHIỆM VỤ HÀNG NGÀY
            </div>
            <h4 className="text-xl font-extrabold text-slate-800" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              Làm Nhiệm Vụ Nhận Thức Ăn & Sữa Tắm Miễn Phí
            </h4>
          </div>
          <div className="text-xs font-semibold text-slate-500 bg-slate-100 px-3.5 py-1.5 rounded-full shrink-0 flex items-center gap-1.5">
            <span>⏰</span> Làm mới lúc 00:00 mỗi ngày
          </div>
        </div>

        {/* Danh sách nhiệm vụ */}
        <div className="space-y-3.5">
          {quests.map((quest) => {
            const isCompleted = quest.progress >= quest.max;
            const isClaimed = quest.claimed;

            return (
              <div
                key={quest.id}
                className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border transition-all duration-200 gap-4 ${
                  isClaimed
                    ? 'bg-slate-50/70 border-slate-100 opacity-75'
                    : isCompleted
                    ? 'bg-orange-50/50 border-orange-200 shadow-sm'
                    : 'bg-white border-slate-100 hover:border-slate-200'
                }`}
              >
                {/* Thông tin nhiệm vụ */}
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center text-2xl shrink-0 border border-orange-200/50">
                    {quest.icon}
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-slate-800">{quest.title}</h5>
                    <p className="text-xs text-slate-500 mt-0.5">{quest.description}</p>
                    
                    {/* Phần thưởng kèm theo */}
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className="text-[11px] font-bold text-[#ff6b35] bg-orange-100/70 px-2 py-0.5 rounded-md">
                        🎁 {quest.rewardText}
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        ⭐ +{quest.expReward} EXP
                      </span>
                    </div>
                  </div>
                </div>

                {/* Thanh tiến độ và nút hành động */}
                <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 sm:min-w-[190px]">
                  {/* Tiến độ */}
                  <div className="text-right sm:block">
                    <div className="text-xs font-bold text-slate-600 mb-1">
                      {quest.progress} / {quest.max}
                    </div>
                    <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#ff6b35] to-[#ffb703] transition-all duration-300"
                        style={{ width: `${Math.min(100, (quest.progress / quest.max) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Nút hành động */}
                  {isClaimed ? (
                    <span className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-400 bg-slate-100 flex items-center gap-1 cursor-default">
                      <span>✓</span> Đã nhận
                    </span>
                  ) : isCompleted ? (
                    <button
                      type="button"
                      onClick={() => onClaimQuest && onClaimQuest(quest.id)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-md shadow-emerald-500/20 active:scale-95 transition-all flex items-center gap-1.5"
                    >
                      <span>🎁</span> Nhận Quà
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onNavigateToShop && onNavigateToShop(quest.actionType)}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold text-[#ff6b35] bg-orange-50 border border-orange-200 hover:bg-orange-100 transition-all flex items-center gap-1"
                    >
                      <span>➔</span> Thực hiện
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
