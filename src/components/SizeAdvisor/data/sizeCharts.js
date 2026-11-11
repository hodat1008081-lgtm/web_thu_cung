// src/components/SizeAdvisor/data/sizeCharts.js
// ============================================================
// DỮ LIỆU BẢNG SIZE DEMO – CHỈ MANG TÍNH THAM KHẢO
// KHÔNG PHẢI THÔNG SỐ SẢN PHẨM CHÍNH THỨC
// ============================================================

/**
 * Cấu trúc bảng size có thể mở rộng:
 * {
 *   productId: string,
 *   productName: string,
 *   category: 'clothes' | 'collar' | 'harness' | 'shoes' | 'leash',
 *   species: 'dog' | 'cat' | 'both',
 *   isDemo: true,  // luôn đánh dấu dữ liệu demo
 *   sizes: [{ size, weightMin, weightMax, neckMin, neckMax, chestMin, chestMax, backMin, backMax, pawLengthMin, pawLengthMax, pawWidthMin, pawWidthMax }]
 * }
 */

export const SIZE_CHARTS = {
  // ==========================================
  // QUẦN ÁO (CLOTHES)
  // ==========================================
  clothes_dog: {
    productId: 'demo-clothes-dog-01',
    productName: '[DEMO] Quần Áo Thú Cưng Cho Chó',
    category: 'clothes',
    species: 'dog',
    isDemo: true,
    note: 'Đây là dữ liệu tham khảo. Vui lòng đo thực tế và tham khảo bảng size của từng sản phẩm cụ thể.',
    measurements: ['neck', 'chest', 'back'],
    sizes: [
      { size: 'XS', weightMin: 1,  weightMax: 2.5, neckMin: 18, neckMax: 24, chestMin: 26, chestMax: 32, backMin: 18, backMax: 24 },
      { size: 'S',  weightMin: 2.5, weightMax: 5,  neckMin: 24, neckMax: 30, chestMin: 32, chestMax: 40, backMin: 24, backMax: 30 },
      { size: 'M',  weightMin: 5,   weightMax: 8,  neckMin: 30, neckMax: 38, chestMin: 40, chestMax: 50, backMin: 30, backMax: 38 },
      { size: 'L',  weightMin: 8,   weightMax: 15, neckMin: 38, neckMax: 48, chestMin: 50, chestMax: 62, backMin: 38, backMax: 46 },
      { size: 'XL', weightMin: 15,  weightMax: 30, neckMin: 48, neckMax: 60, chestMin: 62, chestMax: 76, backMin: 46, backMax: 56 },
    ],
  },

  clothes_cat: {
    productId: 'demo-clothes-cat-01',
    productName: '[DEMO] Quần Áo Thú Cưng Cho Mèo',
    category: 'clothes',
    species: 'cat',
    isDemo: true,
    note: 'Đây là dữ liệu tham khảo. Vui lòng đo thực tế và tham khảo bảng size của từng sản phẩm cụ thể.',
    measurements: ['neck', 'chest', 'back'],
    sizes: [
      { size: 'XS', weightMin: 1,   weightMax: 2.5, neckMin: 18, neckMax: 22, chestMin: 24, chestMax: 30, backMin: 20, backMax: 25 },
      { size: 'S',  weightMin: 2.5, weightMax: 4,   neckMin: 22, neckMax: 27, chestMin: 30, chestMax: 36, backMin: 25, backMax: 30 },
      { size: 'M',  weightMin: 4,   weightMax: 6,   neckMin: 27, neckMax: 33, chestMin: 36, chestMax: 42, backMin: 30, backMax: 36 },
      { size: 'L',  weightMin: 6,   weightMax: 8,   neckMin: 33, neckMax: 38, chestMin: 42, chestMax: 48, backMin: 36, backMax: 42 },
    ],
  },

  // ==========================================
  // VÒNG CỔ (COLLAR)
  // ==========================================
  collar_dog: {
    productId: 'demo-collar-dog-01',
    productName: '[DEMO] Vòng Cổ Cho Chó',
    category: 'collar',
    species: 'dog',
    isDemo: true,
    note: 'Đây là dữ liệu tham khảo. Nên chọn vòng cổ có thể điều chỉnh thêm 2-3cm so với số đo.',
    measurements: ['neck'],
    sizes: [
      { size: 'XS', weightMin: 1,   weightMax: 3,  neckMin: 18, neckMax: 25 },
      { size: 'S',  weightMin: 3,   weightMax: 7,  neckMin: 25, neckMax: 33 },
      { size: 'M',  weightMin: 7,   weightMax: 15, neckMin: 33, neckMax: 43 },
      { size: 'L',  weightMin: 15,  weightMax: 25, neckMin: 43, neckMax: 55 },
      { size: 'XL', weightMin: 25,  weightMax: 50, neckMin: 55, neckMax: 70 },
    ],
  },

  collar_cat: {
    productId: 'demo-collar-cat-01',
    productName: '[DEMO] Vòng Cổ Cho Mèo',
    category: 'collar',
    species: 'cat',
    isDemo: true,
    note: 'Đây là dữ liệu tham khảo. Nên chọn vòng cổ có thể thoát hiểm (breakaway collar) an toàn hơn cho mèo.',
    measurements: ['neck'],
    sizes: [
      { size: 'S',  weightMin: 1,   weightMax: 3,  neckMin: 18, neckMax: 24 },
      { size: 'M',  weightMin: 3,   weightMax: 5,  neckMin: 24, neckMax: 30 },
      { size: 'L',  weightMin: 5,   weightMax: 9,  neckMin: 30, neckMax: 38 },
    ],
  },

  // ==========================================
  // YẾM ĐEO NGỰC (HARNESS)
  // ==========================================
  harness_dog: {
    productId: 'demo-harness-dog-01',
    productName: '[DEMO] Yếm Đeo Ngực Cho Chó',
    category: 'harness',
    species: 'dog',
    isDemo: true,
    note: 'Đây là dữ liệu tham khảo. Yếm cần vừa vặn: không quá chật (không thể thở) cũng không quá lỏng (thoát ra được).',
    measurements: ['neck', 'chest'],
    sizes: [
      { size: 'XS', weightMin: 1,   weightMax: 2.5, neckMin: 18, neckMax: 24, chestMin: 26, chestMax: 34 },
      { size: 'S',  weightMin: 2.5, weightMax: 5,   neckMin: 24, neckMax: 32, chestMin: 34, chestMax: 44 },
      { size: 'M',  weightMin: 5,   weightMax: 10,  neckMin: 32, neckMax: 42, chestMin: 44, chestMax: 56 },
      { size: 'L',  weightMin: 10,  weightMax: 20,  neckMin: 42, neckMax: 54, chestMin: 56, chestMax: 70 },
      { size: 'XL', weightMin: 20,  weightMax: 40,  neckMin: 54, neckMax: 68, chestMin: 70, chestMax: 86 },
    ],
  },

  harness_cat: {
    productId: 'demo-harness-cat-01',
    productName: '[DEMO] Yếm Đeo Ngực Cho Mèo',
    category: 'harness',
    species: 'cat',
    isDemo: true,
    note: 'Đây là dữ liệu tham khảo. Mèo thường khó chịu với yếm, hãy tập dần dần trước khi ra ngoài.',
    measurements: ['neck', 'chest'],
    sizes: [
      { size: 'XS', weightMin: 1,   weightMax: 2.5, neckMin: 18, neckMax: 22, chestMin: 24, chestMax: 30 },
      { size: 'S',  weightMin: 2.5, weightMax: 4,   neckMin: 22, neckMax: 27, chestMin: 30, chestMax: 36 },
      { size: 'M',  weightMin: 4,   weightMax: 6,   neckMin: 27, neckMax: 33, chestMin: 36, chestMax: 44 },
      { size: 'L',  weightMin: 6,   weightMax: 9,   neckMin: 33, neckMax: 40, chestMin: 44, chestMax: 52 },
    ],
  },

  // ==========================================
  // GIÀY (SHOES)
  // ==========================================
  shoes_dog: {
    productId: 'demo-shoes-dog-01',
    productName: '[DEMO] Giày Cho Chó',
    category: 'shoes',
    species: 'dog',
    isDemo: true,
    note: 'Đây là dữ liệu tham khảo. Phải đo cả 4 bàn chân vì chân trước thường rộng hơn chân sau.',
    measurements: ['pawLength', 'pawWidth'],
    sizes: [
      { size: 'S1', pawLengthMin: 3.5, pawLengthMax: 4.5, pawWidthMin: 2.5, pawWidthMax: 3.5 },
      { size: 'S2', pawLengthMin: 4.5, pawLengthMax: 5.5, pawWidthMin: 3.5, pawWidthMax: 4.5 },
      { size: 'M1', pawLengthMin: 5.5, pawLengthMax: 6.5, pawWidthMin: 4.5, pawWidthMax: 5.5 },
      { size: 'M2', pawLengthMin: 6.5, pawLengthMax: 7.5, pawWidthMin: 5.5, pawWidthMax: 6.5 },
      { size: 'L1', pawLengthMin: 7.5, pawLengthMax: 8.5, pawWidthMin: 6.5, pawWidthMax: 7.5 },
      { size: 'L2', pawLengthMin: 8.5, pawLengthMax: 10,  pawWidthMin: 7.5, pawWidthMax: 9.0 },
    ],
  },

  // Leash không cần số đo cơ thể
  leash_options: {
    productId: 'demo-leash-01',
    productName: '[DEMO] Dây Dắt Thú Cưng',
    category: 'leash',
    species: 'both',
    isDemo: true,
    note: 'Đây là dữ liệu tham khảo về chiều dài dây dắt phù hợp theo mục đích sử dụng.',
    options: [
      { label: 'Dây ngắn 1.2m', purpose: 'training', description: 'Lý tưởng cho huấn luyện và kiểm soát tốt trong đô thị đông người.' },
      { label: 'Dây tiêu chuẩn 1.5m', purpose: 'daily', description: 'Phổ biến nhất, phù hợp đi dạo hàng ngày tại công viên hoặc khu phố.' },
      { label: 'Dây dài 1.8m', purpose: 'walking', description: 'Cho bé nhiều không gian khám phá trong khi vẫn đảm bảo an toàn.' },
      { label: 'Dây tự thu 3-5m', purpose: 'outdoor', description: 'Phù hợp bãi cỏ rộng, nơi thú cưng được tự do chạy nhảy hơn.' },
    ],
  },
};

// Danh sách giống chó phổ biến
export const DOG_BREEDS = [
  'Poodle Tiny / Toy',
  'Poodle Standard',
  'Phốc Sóc (Pomeranian)',
  'Chihuahua',
  'Shih Tzu',
  'Maltese',
  'Yorkshire Terrier',
  'Corgi Pembroke',
  'Beagle',
  'Shiba Inu',
  'Bulldog Pháp (French Bulldog)',
  'Pug (Chó mặt xịu)',
  'Golden Retriever',
  'Labrador Retriever',
  'Husky Siberian',
  'Alaska Malamute',
  'Border Collie',
  'German Shepherd (Becgie)',
  'Chó Ta / Chó nội',
  'Khác (Nhập tên giống)',
];

// Danh sách giống mèo phổ biến
export const CAT_BREEDS = [
  'Mèo Anh Lông Ngắn (British Shorthair)',
  'Mèo Anh Lông Dài (British Longhair)',
  'Mèo Ba Tư (Persian)',
  'Mèo Ragdoll',
  'Mèo Maine Coon',
  'Mèo Munchkin Chân Ngắn',
  'Mèo Siamese (Xiêm)',
  'Mèo Bengal',
  'Mèo Scottish Fold (Tai Cụp)',
  'Mèo Abyssinian',
  'Mèo Norwegian Forest',
  'Mèo Ta / Mèo nội',
  'Khác (Nhập tên giống)',
];

// Nhãn tên phụ kiện
export const ACCESSORY_LABELS = {
  clothes: { label: 'Quần Áo', icon: '👗', color: '#8b5cf6' },
  collar:  { label: 'Vòng Cổ', icon: '🏷️', color: '#0ea5e9' },
  harness: { label: 'Yếm Đeo Ngực', icon: '🦺', color: '#f59e0b' },
  shoes:   { label: 'Giày Thú Cưng', icon: '👟', color: '#10b981' },
  leash:   { label: 'Dây Dắt',       icon: '🔗', color: '#ff6b35' },
};
