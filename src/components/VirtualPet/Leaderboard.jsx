// src/components/VirtualPet/Leaderboard.jsx
// Nhiệm vụ: Đạt & Vân - Bảng Xếp Hạng 'Top Thần Nông Nuôi Cưng'
import { useState } from 'react';

export default function Leaderboard({ currentUserRank = 7, petState }) {
  const [filterType, setFilterType] = useState('all'); // 'all' | 'dog' | 'cat'

  const LEADERBOARD_DATA = [
    {
      rank: 1,
      ownerName: 'Hoàng Kim Long',
      ownerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      petName: 'Golden Đại Ca',
      petType: 'dog',
      breed: 'Golden Retriever',
      level: 18,
      age: 18,
      points: 2450,
      title: '👑 Thần Nông Bậc Thầy',
      badge: '🥇 Quán Quân',
    },
    {
      rank: 2,
      ownerName: 'Nguyễn Mai Anh',
      ownerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
      petName: 'Aln Mochi Mập',
      petType: 'cat',
      breed: 'Mèo Anh Lông Ngắn',
      level: 15,
      age: 15,
      points: 2080,
      title: '🌟 Chuyên Gia Nuôi Cưng',
      badge: '🥈 Á Quân',
    },
    {
      rank: 3,
      ownerName: 'Lê Bảo Trâm',
      ownerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
      petName: 'Corgi Bánh Bao',
      petType: 'dog',
      breed: 'Corgi Tri-Color',
      level: 13,
      age: 13,
      points: 1750,
      title: '⭐ Siêu Cấp Chăm Chỉ',
      badge: '🥉 Quý Quân',
    },
    {
      rank: 4,
      ownerName: 'Phạm Tiến Đạt',
      ownerAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80',
      petName: 'Poodle Socola',
      petType: 'dog',
      breed: 'Poodle Tiny',
      level: 11,
      age: 11,
      points: 1420,
      title: 'Chuyên Gia Luyện Cún',
      badge: 'Top 4',
    },
    {
      rank: 5,
      ownerName: 'Vũ Minh Hiển',
      ownerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      petName: 'Ragdoll Công Chúa',
      petType: 'cat',
      breed: 'Mèo Ragdoll',
      level: 9,
      age: 9,
      points: 1160,
      title: 'Tín Đồ Quàng Thượng',
      badge: 'Top 5',
    },
    {
      rank: 6,
      ownerName: 'Đặng Thanh Vân',
      ownerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      petName: 'Shiba Mỉm Cười',
      petType: 'dog',
      breed: 'Shiba Inu',
      level: 6,
      age: 6,
      points: 820,
      title: 'Hội Viên Tích Cực',
      badge: 'Top 6',
    },
  ];

  // Lọc theo loài
  const filteredList = LEADERBOARD_DATA.filter((item) =>
    filterType === 'all' ? true : item.petType === filterType
  );

  return (
    <div className="space-y-6" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      {/* KHỐI VỊ TRÍ CỦA BẠN */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-orange-500 via-[#ff6b35] to-amber-500 text-white shadow-xl shadow-orange-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shrink-0 border border-white/30">
            {petState?.type === 'cat' ? '🐱' : '🐶'}
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-200">
              VỊ TRÍ XẾP HẠNG CỦA BẠN
            </div>
            <h4 className="text-lg font-black text-white" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              Bé {petState?.name || 'Poodle Bon Bon'} — Hạng #{currentUserRank}
            </h4>
            <p className="text-xs text-amber-100">
              Cấp độ hiện tại: <strong>Level {petState?.level || 2}</strong> ({petState?.level || 2} tháng tuổi) • {petState?.points || 180} Điểm chăm sóc
            </p>
          </div>
        </div>

        <div className="bg-white/15 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/25 text-center shrink-0">
          <span className="text-[11px] block text-amber-100 font-semibold">Cần thêm để lên Top 6:</span>
          <strong className="text-sm text-white font-extrabold">+180 EXP nữa</strong>
        </div>
      </div>

      {/* BẢNG VINH DANH TOP THẦN NÔNG */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-md shadow-slate-200/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ff6b35] uppercase tracking-wider mb-1">
              <span>🏆</span> BẢNG XẾP HẠNG TOÀN SERVER
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-800" style={{ fontFamily: "'Quicksand', sans-serif" }}>
              Top Thần Nông Nuôi Cưng Xuất Sắc Nhất
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Vinh danh những thành viên chăm sóc thú cưng ảo đạt Cấp độ & Tuổi cao nhất
            </p>
          </div>

          {/* Bộ lọc tab cún / mèo */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterType === 'all'
                  ? 'bg-white text-[#ff6b35] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tất cả
            </button>
            <button
              type="button"
              onClick={() => setFilterType('dog')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterType === 'dog'
                  ? 'bg-white text-[#ff6b35] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🐶 Chó Cưng
            </button>
            <button
              type="button"
              onClick={() => setFilterType('cat')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterType === 'cat'
                  ? 'bg-white text-[#ff6b35] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🐱 Mèo Cưng
            </button>
          </div>
        </div>

        {/* Bảng Leaderboard dạng Table responsive */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-3 text-center">Thứ Hạng</th>
                <th className="py-3 px-4">Chủ Nhân</th>
                <th className="py-3 px-4">Thú Cưng</th>
                <th className="py-3 px-4 text-center">Cấp Độ / Tuổi</th>
                <th className="py-3 px-4 text-right">Điểm Nuôi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredList.map((item) => {
                const isTop1 = item.rank === 1;
                const isTop2 = item.rank === 2;
                const isTop3 = item.rank === 3;

                return (
                  <tr
                    key={item.rank}
                    className={`transition-colors hover:bg-slate-50/80 ${
                      isTop1 ? 'bg-amber-50/30' : ''
                    }`}
                  >
                    {/* Cột Thứ Hạng */}
                    <td className="py-4 px-3 text-center whitespace-nowrap">
                      {isTop1 ? (
                        <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-950 font-black shadow-md shadow-amber-300/40 text-base">
                          🥇
                        </div>
                      ) : isTop2 ? (
                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-slate-300 to-slate-100 text-slate-800 font-bold shadow-sm text-sm">
                          🥈
                        </div>
                      ) : isTop3 ? (
                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-amber-700 to-amber-600 text-white font-bold shadow-sm text-sm">
                          🥉
                        </div>
                      ) : (
                        <span className="font-extrabold text-slate-400 text-sm">
                          #{item.rank}
                        </span>
                      )}
                    </td>

                    {/* Cột Chủ Nhân */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.ownerAvatar}
                          alt={item.ownerName}
                          className="w-10 h-10 rounded-full object-cover border-2 border-slate-100 shadow-sm"
                        />
                        <div>
                          <div className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                            {item.ownerName}
                            {isTop1 && (
                              <span className="text-[10px] font-black bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
                                VIP
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400 font-medium">
                            {item.title}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Cột Thú Cưng */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">
                          {item.petType === 'cat' ? '🐱' : '🐶'}
                        </span>
                        <div>
                          <div className="font-extrabold text-slate-800 text-sm">
                            {item.petName}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            Giống: {item.breed}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Cột Cấp Độ / Tuổi */}
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <div className="inline-flex flex-col items-center">
                        <span className="font-black text-[#ff6b35] text-sm bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
                          Level {item.level}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium mt-0.5">
                          {item.age} tháng tuổi
                        </span>
                      </div>
                    </td>

                    {/* Cột Điểm */}
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <span className="font-extrabold text-slate-800 text-sm">
                        {item.points.toLocaleString('vi-VN')}
                      </span>
                      <span className="text-[11px] text-amber-600 block font-medium">
                        JoyPoints
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
