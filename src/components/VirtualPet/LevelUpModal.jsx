// src/components/VirtualPet/LevelUpModal.jsx
// Popup / Modal hiệu ứng rực rỡ khi thú cưng ảo lên Level (tăng tuổi)

export default function LevelUpModal({ isOpen, onClose, petState, newLevel }) {
  if (!isOpen) return null;

  const currentLevel = newLevel || petState?.level || 1;
  const currentAge = currentLevel; // 1 level = 1 tháng tuổi

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-md p-6 sm:p-8 bg-white rounded-3xl shadow-2xl border-4 border-[#fed7aa] text-center transform transition-all scale-100 animate-bounce-short overflow-hidden"
        style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
      >
        {/* Hào quang nền */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-300/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-orange-400/30 rounded-full blur-3xl pointer-events-none" />

        {/* Biểu tượng pháo hoa / confetti */}
        <div className="text-5xl sm:text-6xl mb-3 animate-pulse">
          🎉 ✨ 🎊
        </div>

        {/* Tag chúc mừng */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 text-[#ff6b35] text-xs font-extrabold uppercase tracking-wider mb-2 border border-[#fed7aa]">
          <span>🌟</span> THĂNG CẤP THÀNH CÔNG!
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-1" style={{ fontFamily: "'Quicksand', sans-serif" }}>
          Chúc Mừng Bé {petState?.name || 'Cưng'}!
        </h3>
        
        <p className="text-sm text-slate-500 mb-6">
          Nhờ sự chăm sóc chu đáo của bạn, bé vừa đạt cột mốc trưởng thành mới!
        </p>

        {/* Khung Level & Tuổi mới */}
        <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100/60 p-5 rounded-2xl border border-orange-200/80 mb-6 shadow-inner">
          <div className="text-4xl mb-2">
            {petState?.type === 'cat' ? '🐱' : '🐶'}
          </div>
          <div className="text-3xl font-black text-[#ff6b35] mb-1 tracking-tight">
            CẤP ĐỘ {currentLevel}
          </div>
          <div className="text-sm font-bold text-amber-800 bg-amber-200/60 inline-block px-3 py-0.5 rounded-full mb-3">
            🎂 Tuổi thú cưng: {currentAge} tháng tuổi
          </div>
          <p className="text-xs text-slate-600">
            Danh hiệu hiện tại: <strong className="text-slate-800">{petState?.title || 'Cún Con Thông Minh'}</strong>
          </p>
        </div>

        {/* Phần thưởng thăng cấp */}
        <div className="text-left bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6 space-y-2">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
            <span>🎁</span> Phần thưởng thăng cấp nhận được:
          </div>
          <ul className="text-xs text-slate-600 space-y-1.5 pl-1">
            <li className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-medium">⭐ Điểm thưởng tích lũy:</span>
              <strong className="text-[#ff6b35] font-bold">+50 JoyPoints</strong>
            </li>
            <li className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-medium">🥩 Bò bít tết hảo hạng:</span>
              <strong className="text-emerald-600 font-bold">+1 Khay</strong>
            </li>
            <li className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-medium">👑 Đặc quyền VIP:</span>
              <strong className="text-purple-600 font-bold">Mở khóa ưu đãi Level {currentLevel}</strong>
            </li>
          </ul>
        </div>

        {/* Nút hành động đóng modal */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#ff6b35] to-[#f0541e] text-white font-bold text-base shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          🐾 Tuyệt Vời! Tiếp Tục Chăm Bé
        </button>
      </div>
    </div>
  );
}
