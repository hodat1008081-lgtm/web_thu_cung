// src/components/VirtualPet/VirtualPetDashboard.jsx
// Quản lý tổng thể tính năng Nuôi Thú Cưng Ảo - PetCare Joy
import { useState } from 'react';
import PetAvatar from './PetAvatar';
import LevelSystem from './LevelSystem';
import DailyQuests from './DailyQuests';
import Leaderboard from './Leaderboard';
import LevelUpModal from './LevelUpModal';

export default function VirtualPetDashboard({
  petState,
  setPetState,
  onClaimVoucher,
  onNavigateToShop,
}) {
  const [activeSubTab, setActiveSubTab] = useState('pet-care'); // 'pet-care' | 'quests' | 'leaderboard' | 'vip-perks'
  
  // Quản lý túi đồ vật phẩm (Inventory)
  const [inventory, setInventory] = useState({
    food: 6, // Hạt dinh dưỡng
    shampoo: 4, // Sữa tắm
    ball: 5, // Bóng đồ chơi
    steak: 2, // Bò bít tết thượng hạng
  });

  // Số lượng rương đặc biệt tích lũy từ đơn hàng mua sắm
  const [mysteryChests, setMysteryChests] = useState(2);

  // Popup chúc mừng lên cấp
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
  const [newLeveledUpVal, setNewLeveledUpVal] = useState(null);

  // Toast thông báo nhỏ góc dưới
  const [toastMsg, setToastMsg] = useState(null);
  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg(null);
    }, 3000);
  };

  // Cập nhật số lượng vật phẩm trong túi đồ
  const handleUpdateInventory = (itemKey, delta) => {
    setInventory((prev) => ({
      ...prev,
      [itemKey]: Math.max(0, (prev[itemKey] || 0) + delta),
    }));
  };

  // Danh sách nhiệm vụ hàng ngày
  const [quests, setQuests] = useState([
    {
      id: 'quest_login',
      title: 'Điểm danh / Đăng nhập mỗi ngày',
      description: 'Mở ứng dụng hoặc trang web PetCare Joy hôm nay',
      icon: '📅',
      progress: 1,
      max: 1,
      claimed: false,
      rewardText: '+2 Hạt dinh dưỡng',
      expReward: 25,
      pointsReward: 20,
      rewardItem: 'food',
      rewardCount: 2,
      actionType: 'checkin',
    },
    {
      id: 'quest_view_products',
      title: 'Khám phá 3 sản phẩm thú cưng',
      description: 'Dạo xem các bé cún, mèo hoặc phụ kiện tại cửa hàng',
      icon: '🔍',
      progress: 3,
      max: 3,
      claimed: false,
      rewardText: '+1 Bóng đồ chơi & +1 Sữa tắm',
      expReward: 30,
      pointsReward: 25,
      rewardItem: 'ball',
      rewardCount: 1,
      extraItem: 'shampoo',
      extraCount: 1,
      actionType: 'browse_products',
    },
    {
      id: 'quest_add_cart',
      title: 'Thêm hàng vào giỏ sắm',
      description: 'Lựa chọn món đồ yêu thích đưa vào giỏ hàng',
      icon: '🛒',
      progress: 1,
      max: 1,
      claimed: false,
      rewardText: '+2 Hạt Royal Canin & +1 Sữa tắm',
      expReward: 35,
      pointsReward: 30,
      rewardItem: 'food',
      rewardCount: 2,
      extraItem: 'shampoo',
      extraCount: 1,
      actionType: 'cart',
    },
    {
      id: 'quest_interact_pet',
      title: 'Tương tác chăm sóc bé 3 lần',
      description: 'Cho ăn, tắm rửa hoặc chơi bóng cùng thú cưng ảo',
      icon: '🎾',
      progress: 2,
      max: 3,
      claimed: false,
      rewardText: '+1 Bò bít tết VIP & +50 Điểm Thưởng',
      expReward: 40,
      pointsReward: 50,
      rewardItem: 'steak',
      rewardCount: 1,
      actionType: 'pet_interact',
    },
  ]);

  // Xử lý nhận quà nhiệm vụ
  const handleClaimQuest = (questId) => {
    const q = quests.find((item) => item.id === questId);
    if (!q || q.claimed || q.progress < q.max) return;

    // Đánh dấu đã nhận
    setQuests((prev) =>
      prev.map((item) => (item.id === questId ? { ...item, claimed: true } : item))
    );

    // Cộng vật phẩm vào túi đồ
    setInventory((prev) => {
      const updated = { ...prev };
      if (q.rewardItem) updated[q.rewardItem] = (updated[q.rewardItem] || 0) + q.rewardCount;
      if (q.extraItem) updated[q.extraItem] = (updated[q.extraItem] || 0) + (q.extraCount || 1);
      return updated;
    });

    // Cộng EXP và Điểm thưởng cho Thú cưng
    handleGainExpAndPoints(q.expReward || 25, q.pointsReward || 20);
    triggerToast(`🎉 Đã nhận thưởng nhiệm vụ "${q.title}" thành công!`);
  };

  // Mở rương đặc biệt từ đơn hàng mua sắm
  const handleOpenMysteryChest = (reward) => {
    setMysteryChests((prev) => Math.max(0, prev - 1));
    setInventory((prev) => ({
      ...prev,
      steak: (prev.steak || 0) + (reward.steak || 2),
      food: (prev.food || 0) + (reward.food || 3),
      shampoo: (prev.shampoo || 0) + (reward.shampoo || 2),
    }));

    handleGainExpAndPoints(80, reward.points || 100);
    triggerToast('💎 Mở Rương Hoàng Gia thành công! Đã nhận thức ăn cao cấp và +80 EXP.');
  };

  // Hàm cộng EXP & Kiểm tra Cơ chế Lên Level
  const handleGainExpAndPoints = (expGain, pointsGain = 10) => {
    if (!setPetState) return;

    setPetState((prev) => {
      let currentExp = (prev.exp || 0) + expGain;
      let currentLevel = prev.level || 1;
      let threshold = currentLevel * 100;
      let leveledUp = false;

      // Vòng lặp thăng cấp nếu exp vượt ngưỡng
      while (currentExp >= threshold) {
        currentLevel += 1;
        currentExp = currentExp - threshold;
        threshold = currentLevel * 100;
        leveledUp = true;
      }

      if (leveledUp) {
        setNewLeveledUpVal(currentLevel);
        setIsLevelUpModalOpen(true);
      }

      return {
        ...prev,
        level: currentLevel,
        exp: currentExp,
        points: (prev.points || 0) + pointsGain,
      };
    });
  };

  // Xử lý 3 hành động tương tác chính ('feed', 'bath', 'play', 'feed_steak')
  const handlePetAction = (actionType) => {
    let expGain = 20;
    let pointsGain = 10;

    if (!setPetState) return;

    setPetState((prev) => {
      let hunger = prev.hunger ?? 70;
      let cleanliness = prev.cleanliness ?? prev.hygiene ?? 80;
      let happiness = prev.happiness ?? 85;

      if (actionType === 'feed') {
        hunger = Math.min(100, hunger + 25);
        expGain = 20;
        triggerToast('🍖 Bé cưng măm măm no nê! (+25% No, +20 EXP)');
      } else if (actionType === 'feed_steak') {
        hunger = Math.min(100, hunger + 50);
        happiness = Math.min(100, happiness + 40);
        expGain = 50;
        triggerToast('🥩 Bò bít tết hảo hạng siêu ngon! (+50% No, +40% Vui vẻ, +50 EXP)');
      } else if (actionType === 'bath') {
        cleanliness = Math.min(100, cleanliness + 30);
        expGain = 20;
        triggerToast('🛁 Bé thơm phức hương hoa oải hương! (+30% Sạch sẽ, +20 EXP)');
      } else if (actionType === 'play') {
        happiness = Math.min(100, happiness + 30);
        hunger = Math.max(0, hunger - 10);
        expGain = 25;
        triggerToast('🎾 Bé vui sướng chạy đuổi bắt bóng! (+30% Vui vẻ, +25 EXP)');
      }

      // Cập nhật tiến độ nhiệm vụ "Tương tác chăm sóc bé"
      setQuests((qList) =>
        qList.map((q) =>
          q.id === 'quest_interact_pet' ? { ...q, progress: Math.min(q.max, q.progress + 1) } : q
        )
      );

      // Tính toán EXP & Level Up
      let currentExp = (prev.exp || 0) + expGain;
      let currentLevel = prev.level || 1;
      let threshold = currentLevel * 100;
      let leveledUp = false;

      while (currentExp >= threshold) {
        currentLevel += 1;
        currentExp = currentExp - threshold;
        threshold = currentLevel * 100;
        leveledUp = true;
      }

      if (leveledUp) {
        setNewLeveledUpVal(currentLevel);
        setIsLevelUpModalOpen(true);
      }

      return {
        ...prev,
        level: currentLevel,
        exp: currentExp,
        points: (prev.points || 0) + pointsGain,
        hunger,
        cleanliness,
        hygiene: cleanliness,
        happiness,
      };
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      {/* 1. HERO TITLE HEADER */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-[#ff6b35] text-xs font-black uppercase tracking-wider border border-orange-200">
          <span>🎮</span> GAMIFICATION PETCARE JOY
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-800" style={{ fontFamily: "'Quicksand', sans-serif" }}>
          Góc Nuôi <span className="text-[#ff6b35]">Thú Cưng Ảo</span> Nhận Voucher & Quà VIP
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed">
          Tương tác chăm sóc thú cưng mỗi ngày, hoàn thành nhiệm vụ và nâng cấp Level để nhận hàng loạt đặc quyền mua sắm & ưu tiên đặt hàng phiên bản giới hạn!
        </p>
      </div>

      {/* 2. THANH NAVIGATION SUB-TABS */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-1.5 bg-slate-100/90 backdrop-blur-md rounded-2xl max-w-2xl mx-auto border border-slate-200/80">
        <button
          type="button"
          onClick={() => setActiveSubTab('pet-care')}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
            activeSubTab === 'pet-care'
              ? 'bg-white text-[#ff6b35] shadow-md shadow-orange-500/10'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>🐾</span> Bé Cưng & Chăm Sóc
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('quests')}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
            activeSubTab === 'quests'
              ? 'bg-white text-[#ff6b35] shadow-md shadow-orange-500/10'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>📋</span> Nhiệm Vụ & Rương Quà
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('leaderboard')}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
            activeSubTab === 'leaderboard'
              ? 'bg-white text-[#ff6b35] shadow-md shadow-orange-500/10'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>🏆</span> Bảng Xếp Hạng
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('vip-perks')}
          className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
            activeSubTab === 'vip-perks'
              ? 'bg-white text-[#ff6b35] shadow-md shadow-orange-500/10'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>👑</span> Đặc Quyền Level Cao
        </button>
      </div>

      {/* 3. NỘI DUNG TỪNG TAB */}
      {/* TAB 1: BÉ CƯNG & CHĂM SÓC */}
      {activeSubTab === 'pet-care' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <PetAvatar
            petState={petState}
            onAction={handlePetAction}
            inventory={inventory}
            onUpdateInventory={handleUpdateInventory}
            onOpenQuestsTab={() => setActiveSubTab('quests')}
          />
          <LevelSystem
            petState={petState}
            onClaimVoucher={onClaimVoucher}
          />
        </div>
      )}

      {/* TAB 2: NHIỆM VỤ HÀNG NGÀY & RƯƠNG QUÀ MUA HÀNG */}
      {activeSubTab === 'quests' && (
        <DailyQuests
          quests={quests}
          onClaimQuest={handleClaimQuest}
          chestCount={mysteryChests}
          onOpenMysteryChest={handleOpenMysteryChest}
          onNavigateToShop={onNavigateToShop}
        />
      )}

      {/* TAB 3: BẢNG XẾP HẠNG 'TOP THẦN NÔNG NUÔI CƯNG' */}
      {activeSubTab === 'leaderboard' && (
        <Leaderboard petState={petState} currentUserRank={7} />
      )}

      {/* TAB 4: ĐẶC QUYỀN LEVEL CAO & VOUCHER HÔM NAY */}
      {activeSubTab === 'vip-perks' && (
        <LevelSystem
          petState={petState}
          onClaimVoucher={onClaimVoucher}
        />
      )}

      {/* 4. MODAL CHÚC MỪNG LÊN LEVEL (LEVEL UP POPUP) */}
      <LevelUpModal
        isOpen={isLevelUpModalOpen}
        onClose={() => setIsLevelUpModalOpen(false)}
        petState={petState}
        newLevel={newLeveledUpVal}
      />

      {/* 5. TOAST NHỎ THÔNG BÁO TƯƠNG TÁC */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-2xl bg-slate-900/90 text-white text-xs font-bold shadow-2xl backdrop-blur-md border border-slate-700/50 flex items-center gap-2 animate-fade-in">
          <span>🐾</span> {toastMsg}
        </div>
      )}
    </div>
  );
}
