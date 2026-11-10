// src/components/VirtualPet/PetAvatar.jsx
// Nhiệm vụ: Đạt & Vân - Dashboard Thú Cưng, Các Thanh Chỉ Số & Bộ 3 Tương Tác Kèm Trừ Vật Phẩm Túi Đồ
import { useState } from 'react';

export default function PetAvatar({
  petState,
  onAction,
  inventory = { food: 5, shampoo: 4, ball: 3, steak: 2 },
  onUpdateInventory,
  onOpenQuestsTab,
}) {
  const [animatingAction, setAnimatingAction] = useState(null);
  const [selectedPetSpecies, setSelectedPetSpecies] = useState(petState?.type || 'dog');
  const [floatingEmoji, setFloatingEmoji] = useState(null);
  const [itemErrorNotice, setItemErrorNotice] = useState(null);

  // Tính toán tâm trạng theo chỉ số
  const hunger = petState?.hunger ?? 70;
  const hygiene = petState?.cleanliness ?? petState?.hygiene ?? 80;
  const happiness = petState?.happiness ?? 85;
  const level = petState?.level ?? 2;
  const age = level; // 1 level = 1 tháng tuổi

  const getMood = () => {
    if (hunger < 25) return { text: '😫 Đói Lả', color: 'text-rose-600 bg-rose-50 border-rose-200' };
    if (hygiene < 30) return { text: '🦨 Cần Đi Tắm', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    if (happiness < 35) return { text: '🥺 Buồn Chán', color: 'text-indigo-600 bg-indigo-50 border-indigo-200' };
    if (hunger >= 80 && hygiene >= 80 && happiness >= 80) {
      return { text: '🤩 Siêu Vui Vẻ & Khỏe Mạnh', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    }
    return { text: '🥰 Hạnh Phúc', color: 'text-[#ff6b35] bg-orange-50 border-orange-200' };
  };

  const mood = getMood();

  // Thực hiện tương tác & trừ số lượng vật phẩm trong túi đồ
  const handlePerformAction = (actionType) => {
    setItemErrorNotice(null);

    // 1. Kiểm tra số lượng vật phẩm trong túi
    if (actionType === 'feed') {
      if ((inventory.food || 0) <= 0) {
        setItemErrorNotice('Hết Hạt dinh dưỡng! Hãy làm nhiệm vụ để nhận thêm.');
        return;
      }
      if (onUpdateInventory) onUpdateInventory('food', -1);
      triggerAnimation('feed', '🍖 +25 No | +20 EXP');
    } else if (actionType === 'bath') {
      if ((inventory.shampoo || 0) <= 0) {
        setItemErrorNotice('Hết Sữa tắm thơm! Hãy làm nhiệm vụ hoặc mở rương để nhận thêm.');
        return;
      }
      if (onUpdateInventory) onUpdateInventory('shampoo', -1);
      triggerAnimation('bath', '🛁 +30 Sạch sẽ | +20 EXP');
    } else if (actionType === 'play') {
      if ((inventory.ball || 0) <= 0) {
        setItemErrorNotice('Hết Bóng đồ chơi! Hãy làm nhiệm vụ để nhận thêm.');
        return;
      }
      if (onUpdateInventory) onUpdateInventory('ball', -1);
      triggerAnimation('play', '🎾 +30 Vui vẻ | +25 EXP');
    } else if (actionType === 'feed_steak') {
      if ((inventory.steak || 0) <= 0) {
        setItemErrorNotice('Hết Bò Bít Tết Thượng Hạng! Mua hàng để nhận thêm rương quà.');
        return;
      }
      if (onUpdateInventory) onUpdateInventory('steak', -1);
      triggerAnimation('feed_steak', '🥩 +50 No | +40 Vui vẻ | +50 EXP');
    }

    // 2. Gọi hàm callback xử lý chỉ số và EXP trong App/Container
    if (onAction) {
      onAction(actionType);
    }
  };

  const triggerAnimation = (type, emojiText) => {
    setAnimatingAction(type);
    setFloatingEmoji(emojiText);

    setTimeout(() => {
      setAnimatingAction(null);
    }, 1200);

    setTimeout(() => {
      setFloatingEmoji(null);
    }, 2000);
  };

  return (
    <div
      className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-md shadow-slate-200/50 relative overflow-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
    >
      {/* Hào quang màu nền */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-orange-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      {/* Header của Khối Dashboard */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#ff6b35] uppercase tracking-wider mb-1">
            <span>🐾</span> PET DASHBOARD TRUNG TÂM
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-800" style={{ fontFamily: "'Quicksand', sans-serif" }}>
            {petState?.name || 'Bé Poodle Bon Bon'}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Giống: <strong>{petState?.breed || (selectedPetSpecies === 'dog' ? 'Poodle Teacup Nâu Đỏ' : 'Mèo Anh Lông Ngắn')}</strong>
          </p>
        </div>

        {/* Cấp độ & Tuổi thú cưng */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-orange-500 to-[#ff6b35] text-white text-xs font-black shadow-md shadow-orange-500/20">
            Level {level}
          </div>
          <div className="px-3 py-1.5 rounded-2xl bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold">
            🎂 {age} Tháng Tuổi
          </div>
        </div>
      </div>

      {/* Chuyển đổi Loài thú cưng (Cún / Mèo) */}
      <div className="flex justify-center gap-2 mb-6">
        <button
          type="button"
          onClick={() => setSelectedPetSpecies('dog')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
            selectedPetSpecies === 'dog'
              ? 'bg-[#ff6b35] text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <span>🐶</span> Cún Cưng
        </button>
        <button
          type="button"
          onClick={() => setSelectedPetSpecies('cat')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
            selectedPetSpecies === 'cat'
              ? 'bg-[#ff6b35] text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <span>🐱</span> Mèo Cưng
        </button>
      </div>

      {/* AVATAR THÚ CƯNG SINH ĐỘNG Ở TRUNG TÂM */}
      <div className="relative text-center my-4 py-2">
        {/* Floating action feedback emoji */}
        {floatingEmoji && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md text-amber-300 text-xs font-extrabold shadow-xl animate-bounce">
            {floatingEmoji}
          </div>
        )}

        <div
          className={`relative mx-auto w-44 h-44 sm:w-52 sm:h-52 rounded-full flex items-center justify-center border-4 border-white shadow-2xl transition-all duration-300 ${
            animatingAction
              ? 'scale-110 rotate-6 shadow-orange-400/40'
              : 'hover:scale-105 shadow-orange-500/15'
          }`}
          style={{
            background:
              selectedPetSpecies === 'dog'
                ? 'radial-gradient(circle, #ffedd5 0%, #fed7aa 60%, #fdba74 100%)'
                : 'radial-gradient(circle, #fae8ff 0%, #f5d0fe 60%, #e879f9 100%)',
          }}
        >
          {/* Avatar Icon */}
          <div className="text-7xl sm:text-8xl select-none filter drop-shadow-lg">
            {selectedPetSpecies === 'cat' ? '🐱' : '🐶'}
          </div>

          {/* Hiệu ứng bong bóng / tim bay khi tương tác */}
          {animatingAction === 'feed' && (
            <div className="absolute -top-3 -right-2 text-4xl animate-bounce">🍗</div>
          )}
          {animatingAction === 'feed_steak' && (
            <div className="absolute -top-4 -right-2 text-4xl animate-bounce">🥩</div>
          )}
          {animatingAction === 'bath' && (
            <div className="absolute -top-3 -left-2 text-4xl animate-pulse">🫧 🛁</div>
          )}
          {animatingAction === 'play' && (
            <div className="absolute -bottom-2 -right-2 text-4xl animate-spin">🎾</div>
          )}
        </div>

        {/* Badge Tâm Trạng */}
        <div className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold border shadow-sm">
          <span className="text-slate-400 text-[11px] font-normal">Tâm trạng:</span>
          <span className={`px-2 py-0.5 rounded-full ${mood.color}`}>
            {mood.text}
          </span>
        </div>
      </div>

      {/* 3 THANH CHỈ SỐ TRẠNG THÁI (ĐỘ NO, ĐỘ SẠCH SẼ, ĐỘ VUI VẺ) */}
      <div className="grid grid-cols-3 gap-3 my-6">
        {/* 1. Độ No (Hunger) */}
        <div className="bg-orange-50/70 p-3 rounded-2xl border border-orange-100 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-orange-900 mb-1">
            <span className="flex items-center gap-1">🍖 Độ No</span>
            <span className="font-extrabold text-[#ff6b35]">{hunger}%</span>
          </div>
          <div className="w-full h-2 bg-orange-200/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-400 to-[#ff6b35] transition-all duration-300 rounded-full"
              style={{ width: `${Math.min(100, hunger)}%` }}
            />
          </div>
        </div>

        {/* 2. Độ Sạch Sẽ (Hygiene) */}
        <div className="bg-sky-50/70 p-3 rounded-2xl border border-sky-100 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-sky-900 mb-1">
            <span className="flex items-center gap-1">🛁 Sạch Sẽ</span>
            <span className="font-extrabold text-sky-600">{hygiene}%</span>
          </div>
          <div className="w-full h-2 bg-sky-200/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-400 to-blue-500 transition-all duration-300 rounded-full"
              style={{ width: `${Math.min(100, hygiene)}%` }}
            />
          </div>
        </div>

        {/* 3. Độ Vui Vẻ (Happiness) */}
        <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-900 mb-1">
            <span className="flex items-center gap-1">🎾 Vui Vẻ</span>
            <span className="font-extrabold text-emerald-600">{happiness}%</span>
          </div>
          <div className="w-full h-2 bg-emerald-200/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 transition-all duration-300 rounded-full"
              style={{ width: `${Math.min(100, happiness)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Cảnh báo nếu thiếu vật phẩm */}
      {itemErrorNotice && (
        <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center justify-between animate-fade-in">
          <span className="flex items-center gap-1.5">
            <span>⚠️</span> {itemErrorNotice}
          </span>
          {onOpenQuestsTab && (
            <button
              type="button"
              onClick={onOpenQuestsTab}
              className="px-2 py-0.5 rounded bg-rose-600 text-white text-[11px] font-bold hover:bg-rose-700 shrink-0"
            >
              Làm Nhiệm Vụ ➔
            </button>
          )}
        </div>
      )}

      {/* BỘ 3 TƯƠNG TÁC CHÍNH KÈM TRỪ SỐ LƯỢNG VẬT PHẨM TRONG TÚI */}
      <div className="space-y-3 mb-6">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
          <span>🎮 HÀNH ĐỘNG TƯƠNG TÁC HÀNG NGÀY:</span>
          <span className="text-[11px] text-slate-400 font-normal">Trừ 1 vật phẩm mỗi lượt</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Nút 1: Cho ăn */}
          <button
            type="button"
            onClick={() => handlePerformAction('feed')}
            className="flex flex-col items-center justify-center p-3 rounded-2xl border-2 border-orange-200 bg-gradient-to-b from-orange-50 to-white hover:border-[#ff6b35] hover:shadow-md hover:shadow-orange-500/10 active:scale-95 transition-all group"
          >
            <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">🍖</div>
            <span className="font-extrabold text-sm text-slate-800">Cho Ăn</span>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-[11px] font-bold text-[#ff6b35] bg-orange-100 px-2 py-0.5 rounded-full">
                Còn {inventory.food || 0}
              </span>
              <span className="text-[10px] text-slate-400">+20 EXP</span>
            </div>
          </button>

          {/* Nút 2: Tắm rửa */}
          <button
            type="button"
            onClick={() => handlePerformAction('bath')}
            className="flex flex-col items-center justify-center p-3 rounded-2xl border-2 border-sky-200 bg-gradient-to-b from-sky-50 to-white hover:border-sky-500 hover:shadow-md hover:shadow-sky-500/10 active:scale-95 transition-all group"
          >
            <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">🛁</div>
            <span className="font-extrabold text-sm text-slate-800">Tắm Rửa</span>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-[11px] font-bold text-sky-600 bg-sky-100 px-2 py-0.5 rounded-full">
                Còn {inventory.shampoo || 0}
              </span>
              <span className="text-[10px] text-slate-400">+20 EXP</span>
            </div>
          </button>

          {/* Nút 3: Chơi đùa */}
          <button
            type="button"
            onClick={() => handlePerformAction('play')}
            className="flex flex-col items-center justify-center p-3 rounded-2xl border-2 border-emerald-200 bg-gradient-to-b from-emerald-50 to-white hover:border-emerald-500 hover:shadow-md hover:shadow-emerald-500/10 active:scale-95 transition-all group"
          >
            <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">🎾</div>
            <span className="font-extrabold text-sm text-slate-800">Chơi Đùa</span>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                Còn {inventory.ball || 0}
              </span>
              <span className="text-[10px] text-slate-400">+25 EXP</span>
            </div>
          </button>
        </div>

        {/* Nút đặc biệt: Bò Bít Tết Hảo Hạng (Món ăn VIP) */}
        {(inventory.steak || 0) > 0 && (
          <button
            type="button"
            onClick={() => handlePerformAction('feed_steak')}
            className="w-full mt-2 p-3 rounded-2xl border-2 border-amber-300 bg-gradient-to-r from-amber-100 via-orange-100 to-amber-50 hover:from-amber-200 hover:to-orange-100 active:scale-[0.99] transition-all flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🥩</span>
              <div className="text-left">
                <span className="text-xs font-black text-amber-950 block">
                  Cho Ăn Bò Bít Tết Thượng Hạng (Vật Phẩm VIP)
                </span>
                <span className="text-[11px] text-amber-800">
                  Tăng vọt +50% Độ No & +50 EXP siêu tốc!
                </span>
              </div>
            </div>
            <div className="px-3 py-1 rounded-xl bg-amber-500 text-white text-xs font-black shrink-0">
              Còn {inventory.steak} đĩa
            </div>
          </button>
        )}
      </div>

      {/* TÚI ĐỒ VẬT PHẨM (MINI INVENTORY BAR) */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
            <span>🎒</span> TÚI ĐỒ VẬT PHẨM CỦA BẠN:
          </span>
          {onOpenQuestsTab && (
            <button
              type="button"
              onClick={onOpenQuestsTab}
              className="text-xs font-bold text-[#ff6b35] hover:underline"
            >
              + Nhận thêm vật phẩm
            </button>
          )}
        </div>

        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-2xs">
            <div className="text-lg">🍖</div>
            <div className="text-[10px] text-slate-500">Hạt dinh dưỡng</div>
            <div className="text-xs font-extrabold text-slate-800">x{inventory.food || 0}</div>
          </div>

          <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-2xs">
            <div className="text-lg">🛁</div>
            <div className="text-[10px] text-slate-500">Sữa tắm thảo mộc</div>
            <div className="text-xs font-extrabold text-slate-800">x{inventory.shampoo || 0}</div>
          </div>

          <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-2xs">
            <div className="text-lg">🎾</div>
            <div className="text-[10px] text-slate-500">Bóng đồ chơi</div>
            <div className="text-xs font-extrabold text-slate-800">x{inventory.ball || 0}</div>
          </div>

          <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-2xs">
            <div className="text-lg">🥩</div>
            <div className="text-[10px] text-slate-500">Bò bít tết VIP</div>
            <div className="text-xs font-extrabold text-slate-800">x{inventory.steak || 0}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
