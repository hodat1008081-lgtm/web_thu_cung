// src/components/SizeAdvisor/sizeChartData.js
// Nâng cấp: Hệ thống bảng size đa tầng, nguồn dữ liệu, trạng thái xác minh và độ tin cậy

export const ACCESSORY_TYPES = [
  {
    id: 'collar',
    name: 'Vòng cổ (Collar)',
    icon: '🎗️',
    shortName: 'Vòng cổ',
    description: 'Ưu tiên đo sát vòng cổ + dự phòng 2 ngón tay (1.5 - 2cm) để không thắt nghẹt thở.',
    requiredFields: ['neck'],
    primaryFieldLabel: 'Vòng cổ (cm)',
  },
  {
    id: 'harness',
    name: 'Dây đeo ngực (Harness)',
    icon: '🦺',
    shortName: 'Dây dắt & Yếm',
    description: 'Ưu tiên số đo vòng ngực (phần to nhất sau 2 chân trước) để trợ lực êm ái, chống tuột.',
    requiredFields: ['chest'],
    primaryFieldLabel: 'Vòng ngực (cm)',
  },
  {
    id: 'clothing',
    name: 'Quần áo thú cưng (Pet Clothing)',
    icon: '👕',
    shortName: 'Quần áo',
    description: 'Ưu tiên vòng ngực (cài khuy/khóa) kết hợp chiều dài lưng (từ gáy đến gốc đuôi).',
    requiredFields: ['chest', 'backLength'],
    primaryFieldLabel: 'Vòng ngực & Chiều dài lưng',
  },
];

// DANH SÁCH THƯƠNG HIỆU & TRẠNG THÁI XÁC MINH DỮ LIỆU
export const BRAND_OPTIONS = [
  {
    id: 'general',
    name: 'Bảng Size Tham Khảo Chung (Quốc Tế)',
    isOfficial: false,
    verificationStatus: 'general_reference',
    verificationLabel: 'Bảng quy chuẩn tham khảo phổ biến',
    source: 'Quy chuẩn kích cỡ thú cưng quốc tế (ISO/TC 194 & Hiệp hội chăm sóc thú cưng)',
    hasVerifiedData: true,
  },
  {
    id: 'petcare_joy',
    name: 'PetCare Joy Original',
    isOfficial: true,
    verificationStatus: 'verified_official',
    verificationLabel: 'Đã xác minh chính thức từ nhà sản xuất',
    source: 'Hồ sơ tiêu chuẩn kỹ thuật & may đo xuất xưởng PetCare Joy 2026',
    hasVerifiedData: true,
  },
  {
    id: 'doglemi',
    name: 'Doglemi Pet',
    isOfficial: false,
    verificationStatus: 'unverified',
    verificationLabel: 'Chưa có bảng size chính thức (Tự động dùng bảng tham khảo chung)',
    source: 'Chưa đồng bộ dữ liệu kỹ thuật số hóa từ nhà phân phối',
    hasVerifiedData: false,
    fallbackNotice: 'Thương hiệu Doglemi chưa có bảng size chính thức được xác minh. Hệ thống tự động chuyển tiếp sang Bảng Size Tham Khảo Chung.',
  },
  {
    id: 'truelove',
    name: 'Truelove Outdoor',
    isOfficial: false,
    verificationStatus: 'unverified',
    verificationLabel: 'Chưa có bảng size chính thức (Tự động dùng bảng tham khảo chung)',
    source: 'Chưa đồng bộ dữ liệu kỹ thuật số hóa từ nhà phân phối',
    hasVerifiedData: false,
    fallbackNotice: 'Thương hiệu Truelove chưa công bố bảng size kỹ thuật chính thức. Hệ thống tự động chuyển tiếp sang Bảng Size Tham Khảo Chung.',
  },
];

// 1. BẢNG SIZE VÒNG CỔ - THAM KHẢO CHUNG
const GENERAL_COLLAR_SIZES = [
  {
    size: 'XS',
    label: 'Size XS (Siêu nhỏ)',
    minNeck: 18,
    maxNeck: 25,
    minWeight: 1.0,
    maxWeight: 3.0,
    width: '1.0 cm',
    exampleBreeds: 'Poodle Teacup, Chihuahua, Phốc hươu nhỏ, Mèo con, Mèo Miến Điện',
    description: 'Bản dây 1.0cm siêu nhẹ, chống trĩu cổ cho bé sơ sinh hoặc vóc dáng tí hon dưới 3kg.',
  },
  {
    size: 'S',
    label: 'Size S (Nhỏ)',
    minNeck: 24,
    maxNeck: 32,
    minWeight: 3.0,
    maxWeight: 6.0,
    width: '1.5 cm',
    exampleBreeds: 'Poodle Toy, Phốc Sóc (Pomeranian), Mèo Anh lông ngắn, Mèo Ba Tư, Bắc Kinh',
    description: 'Bản dây 1.5cm êm ái, khóa bấm an toàn chống bung, phù hợp cho đa số mèo và chó nhỏ.',
  },
  {
    size: 'M',
    label: 'Size M (Vừa)',
    minNeck: 30,
    maxNeck: 42,
    minWeight: 6.0,
    maxWeight: 12.0,
    width: '2.0 cm',
    exampleBreeds: 'Corgi Pembroke, Shiba Inu, Pug, Beagle, Mèo Maine Coon to',
    description: 'Bản dây 2.0cm dệt mật độ cao chịu lực kéo tốt, có đệm lót chống cọ sát đau lông cổ.',
  },
  {
    size: 'L',
    label: 'Size L (Lớn)',
    minNeck: 40,
    maxNeck: 54,
    minWeight: 12.0,
    maxWeight: 24.0,
    width: '2.5 cm',
    exampleBreeds: 'Bulldog Pháp/Anh, Husky, Samoyed, Border Collie, Golden con',
    description: 'Bản dây 2.5cm dày dặn, vòng kim loại đúc nguyên khối chống gãy giật khi ra ngoài dạo.',
  },
  {
    size: 'XL',
    label: 'Size XL (Rất lớn)',
    minNeck: 52,
    maxNeck: 68,
    minWeight: 24.0,
    maxWeight: 45.0,
    width: '3.0 cm',
    exampleBreeds: 'Golden Retriever, Labrador, Alaska Malamute, Becgie Đức, Doberman',
    description: 'Bản dây 3.0cm gia cố chỉ phản quang ban đêm, chịu lực giật mạnh từ các dòng chó lớn.',
  },
];

// 2. BẢNG SIZE DÂY ĐEO NGỰC (HARNESS) - THAM KHẢO CHUNG
const GENERAL_HARNESS_SIZES = [
  {
    size: 'XS',
    label: 'Size XS (Siêu nhỏ)',
    minChest: 28,
    maxChest: 38,
    minNeck: 20,
    maxNeck: 28,
    minWeight: 1.5,
    maxWeight: 3.5,
    exampleBreeds: 'Chihuahua, Phốc Sóc mini, Poodle Tiny, Mèo ta, Mèo ALN nhỏ',
    description: 'Yếm chữ Y siêu êm, giảm áp lực tối đa lên khí quản non nớt của thú cưng nhỏ.',
  },
  {
    size: 'S',
    label: 'Size S (Nhỏ)',
    minChest: 36,
    maxChest: 48,
    minNeck: 26,
    maxNeck: 36,
    minWeight: 3.5,
    maxWeight: 7.5,
    exampleBreeds: 'Poodle Toy/Mini, Mèo Anh lông ngắn/dài, Pug con, Phốc Sóc lớn',
    description: 'Dây đai có thể tùy chỉnh 4 điểm, đệm ức lưới thoáng khí chống hầm bí mồ hôi.',
  },
  {
    size: 'M',
    label: 'Size M (Vừa)',
    minChest: 46,
    maxChest: 62,
    minNeck: 34,
    maxNeck: 48,
    minWeight: 7.5,
    maxWeight: 15.0,
    exampleBreeds: 'Corgi, Shiba Inu, Pug trưởng thành, Bulldog Pháp, Schnauzer',
    description: 'Có quai tay cầm trên lưng để giữ bé khẩn cấp, khóa kép cường lực an toàn trên phố.',
  },
  {
    size: 'L',
    label: 'Size L (Lớn)',
    minChest: 60,
    maxChest: 80,
    minNeck: 46,
    maxNeck: 64,
    minWeight: 15.0,
    maxWeight: 28.0,
    exampleBreeds: 'Bulldog Anh, Border Collie, Husky, Samoyed, Golden tơ',
    description: 'Thiết kế trợ lực phân tán đều vào xương ức và lồng ngực, chống nghẹt thở tuyệt đối.',
  },
  {
    size: 'XL',
    label: 'Size XL (Rất lớn)',
    minChest: 78,
    maxChest: 102,
    minNeck: 56,
    maxNeck: 78,
    minWeight: 28.0,
    maxWeight: 50.0,
    exampleBreeds: 'Golden Retriever, Alaska, Labrador, Rottweiler, Becgie Đức',
    description: 'Áo yếm chiến thuật chịu tải nặng, móc khóa hợp kim kẽm siêu bền và quai trợ lực.',
  },
];

// 3. BẢNG SIZE QUẦN ÁO THÚ CƯNG (CLOTHING) - THAM KHẢO CHUNG
const GENERAL_CLOTHING_SIZES = [
  {
    size: 'XS',
    label: 'Size XS (1.0 - 2.0 kg)',
    minChest: 28,
    maxChest: 32,
    minBack: 18,
    maxBack: 22,
    minNeck: 19,
    maxNeck: 22,
    minWeight: 1.0,
    maxWeight: 2.0,
    exampleBreeds: 'Mèo con, Chihuahua nhỏ, Teacup Poodle',
    description: 'Thiết kế dáng mini cho thú cưng sơ sinh hoặc giống siêu nhỏ.',
  },
  {
    size: 'S',
    label: 'Size S (2.0 - 3.5 kg)',
    minChest: 33,
    maxChest: 38,
    minBack: 23,
    maxBack: 27,
    minNeck: 22,
    maxNeck: 26,
    minWeight: 2.0,
    maxWeight: 3.5,
    exampleBreeds: 'Poodle Toy, Phốc Sóc, Mèo ALN nhỡ, Mèo Xiêm',
    description: 'Size thông dụng cho chó vóc nhỏ và mèo thiếu niên.',
  },
  {
    size: 'M',
    label: 'Size M (3.5 - 5.5 kg)',
    minChest: 39,
    maxChest: 44,
    minBack: 28,
    maxBack: 33,
    minNeck: 26,
    maxNeck: 30,
    minWeight: 3.5,
    maxWeight: 5.5,
    exampleBreeds: 'Poodle tiêu chuẩn, Mèo Anh lông ngắn tròn trịa, Mèo Ragdoll',
    description: 'Vừa vặn cho hầu hết mèo trưởng thành hoặc chó nhỏ form đẫy đà.',
  },
  {
    size: 'L',
    label: 'Size L (5.5 - 8.0 kg)',
    minChest: 45,
    maxChest: 51,
    minBack: 34,
    maxBack: 39,
    minNeck: 30,
    maxNeck: 35,
    minWeight: 5.5,
    maxWeight: 8.0,
    exampleBreeds: 'Pug, Corgi nhỏ, Bắc Kinh, Schnauzer vóc vừa',
    description: 'Thân áo rộng rãi, đường may chừa khoảng trống cho phần bụng khi đi vệ sinh.',
  },
  {
    size: 'XL',
    label: 'Size XL (8.0 - 13.0 kg)',
    minChest: 52,
    maxChest: 59,
    minBack: 40,
    maxBack: 46,
    minNeck: 35,
    maxNeck: 40,
    minWeight: 8.0,
    maxWeight: 13.0,
    exampleBreeds: 'Corgi trưởng thành, Shiba Inu, Bulldog Pháp',
    description: 'Chất vải co giãn nhẹ nhàng, phù hợp cho các bé ngực nở nang, lưng dài.',
  },
  {
    size: '2XL',
    label: 'Size 2XL (13.0 - 20.0 kg)',
    minChest: 60,
    maxChest: 70,
    minBack: 47,
    maxBack: 54,
    minNeck: 40,
    maxNeck: 46,
    minWeight: 13.0,
    maxWeight: 20.0,
    exampleBreeds: 'Bulldog Anh, Border Collie, Samoyed nhỏ',
    description: 'Form áo lớn ôm nhẹ giữ ấm cơ thể, dễ cử động cho chó vóc trung bình.',
  },
  {
    size: '3XL',
    label: 'Size 3XL (> 20.0 kg)',
    minChest: 71,
    maxChest: 85,
    minBack: 55,
    maxBack: 65,
    minNeck: 46,
    maxNeck: 54,
    minWeight: 20.0,
    maxWeight: 35.0,
    exampleBreeds: 'Golden Retriever, Labrador, Husky, Alaska Malamute',
    description: 'Áo giữ ấm hoặc áo mưa chuyên dụng dành riêng cho các giống chó lớn.',
  },
];

// 4. BẢNG SIZE CHÍNH THỨC CỦA THƯƠNG HIỆU: PetCare Joy Original
// Được xác minh theo quy cách may đo thực tế của PetCare Joy
const PETCARE_JOY_COLLAR_SIZES = [
  {
    size: 'XS',
    label: 'PetCare Joy XS',
    minNeck: 19,
    maxNeck: 26,
    minWeight: 1.0,
    maxWeight: 3.2,
    width: '1.2 cm',
    exampleBreeds: 'Chihuahua, Poodle Teacup, Mèo con 3-6 tháng',
    description: 'Dây vải nhung cao cấp đệm mút mềm, khóa chốt inox siêu nhẹ độc quyền.',
  },
  {
    size: 'S',
    label: 'PetCare Joy S',
    minNeck: 25,
    maxNeck: 34,
    minWeight: 3.0,
    maxWeight: 6.5,
    width: '1.5 cm',
    exampleBreeds: 'Poodle Toy, Phốc Sóc, Mèo ALN',
    description: 'Khóa bấm nam châm an toàn Quick-Release chống giật bung.',
  },
  {
    size: 'M',
    label: 'PetCare Joy M',
    minNeck: 32,
    maxNeck: 44,
    minWeight: 6.5,
    maxWeight: 13.0,
    width: '2.0 cm',
    exampleBreeds: 'Corgi, Shiba Inu, Pug, Beagle',
    description: 'Vải dệt chống nước Nano lót đệm khí Air-Mesh thoáng mát cổ.',
  },
  {
    size: 'L',
    label: 'PetCare Joy L',
    minNeck: 42,
    maxNeck: 56,
    minWeight: 13.0,
    maxWeight: 26.0,
    width: '2.5 cm',
    exampleBreeds: 'Bulldog Pháp, Samoyed, Husky',
    description: 'Khóa hợp kim kẽm đúc chịu lực kéo 120kg, tích hợp vòng gắn thẻ tên AirTag.',
  },
  {
    size: 'XL',
    label: 'PetCare Joy XL',
    minNeck: 54,
    maxNeck: 70,
    minWeight: 26.0,
    maxWeight: 48.0,
    width: '3.2 cm',
    exampleBreeds: 'Golden Retriever, Alaska, Becgie',
    description: 'Bản to gia cố đinh tán đồng và chỉ phản quang 3M siêu sáng ban đêm.',
  },
];

const PETCARE_JOY_HARNESS_SIZES = [
  {
    size: 'XS',
    label: 'PetCare Joy Harness XS',
    minChest: 30,
    maxChest: 40,
    minNeck: 22,
    maxNeck: 30,
    minWeight: 1.5,
    maxWeight: 3.8,
    exampleBreeds: 'Chihuahua, Phốc Sóc, Mèo Anh',
    description: 'Thiết kế yếm trợ lực ôm ức 360 độ, phân tán 100% lực kéo khỏi cổ họng.',
  },
  {
    size: 'S',
    label: 'PetCare Joy Harness S',
    minChest: 38,
    maxChest: 50,
    minNeck: 28,
    maxNeck: 38,
    minWeight: 3.8,
    maxWeight: 8.0,
    exampleBreeds: 'Poodle Toy, Pug con, Mèo lông dài',
    description: 'Đệm ngực xốp định hình chống cọ sát nách, 4 điểm tăng giảm linh hoạt.',
  },
  {
    size: 'M',
    label: 'PetCare Joy Harness M',
    minChest: 48,
    maxChest: 65,
    minNeck: 36,
    maxNeck: 52,
    minWeight: 8.0,
    maxWeight: 16.0,
    exampleBreeds: 'Corgi, Shiba, Pug trưởng thành, Bulldog',
    description: 'Tích hợp quai cầm đệm cao su mềm trên lưng hỗ trợ nhấc qua chướng ngại vật.',
  },
  {
    size: 'L',
    label: 'PetCare Joy Harness L',
    minChest: 62,
    maxChest: 84,
    minNeck: 48,
    maxNeck: 68,
    minWeight: 16.0,
    maxWeight: 30.0,
    exampleBreeds: 'Border Collie, Husky, Samoyed, Golden tơ',
    description: 'Khóa chốt kép chống tuột đai kết hợp móc kéo trước ngực No-Pull.',
  },
  {
    size: 'XL',
    label: 'PetCare Joy Harness XL',
    minChest: 80,
    maxChest: 106,
    minNeck: 58,
    maxNeck: 80,
    minWeight: 30.0,
    maxWeight: 52.0,
    exampleBreeds: 'Golden Retriever, Alaska, Labrador, Rottweiler',
    description: 'Dòng đai chiến thuật cường lực Heavy-Duty chịu lực va đập dã ngoại.',
  },
];

const PETCARE_JOY_CLOTHING_SIZES = GENERAL_CLOTHING_SIZES; // Quần áo PetCare Joy dùng form chuẩn chung

// CẤU TRÚC HỆ THỐNG BẢNG SIZE TỔNG HỢP THEO THƯƠNG HIỆU & PHỤ KIỆN
export const SIZE_CHARTS = {
  general: {
    collar: {
      chartName: 'Bảng size Vòng cổ Tham Khảo Chung',
      brandId: 'general',
      brandName: 'Tham Khảo Chung (Quốc Tế)',
      source: 'Quy chuẩn kích cỡ thú cưng quốc tế (ISO/TC 194 & Hiệp hội chăm sóc thú cưng)',
      verificationStatus: 'general_reference',
      verificationBadge: 'Bảng tham khảo chung',
      isOfficial: false,
      sizes: GENERAL_COLLAR_SIZES,
    },
    harness: {
      chartName: 'Bảng size Dây đeo ngực Tham Khảo Chung',
      brandId: 'general',
      brandName: 'Tham Khảo Chung (Quốc Tế)',
      source: 'Quy chuẩn kích cỡ đai yếm thú cưng quốc tế',
      verificationStatus: 'general_reference',
      verificationBadge: 'Bảng tham khảo chung',
      isOfficial: false,
      sizes: GENERAL_HARNESS_SIZES,
    },
    clothing: {
      chartName: 'Bảng size Quần áo Tham Khảo Chung',
      brandId: 'general',
      brandName: 'Tham Khảo Chung (Quốc Tế)',
      source: 'Quy chuẩn may mặc thú cưng quốc tế',
      verificationStatus: 'general_reference',
      verificationBadge: 'Bảng tham khảo chung',
      isOfficial: false,
      sizes: GENERAL_CLOTHING_SIZES,
    },
  },
  petcare_joy: {
    collar: {
      chartName: 'Bảng size Vòng cổ PetCare Joy Original',
      brandId: 'petcare_joy',
      brandName: 'PetCare Joy Original',
      source: 'Hồ sơ tiêu chuẩn kỹ thuật & may đo xuất xưởng PetCare Joy 2026',
      verificationStatus: 'verified_official',
      verificationBadge: 'Đã xác minh chính thức',
      isOfficial: true,
      sizes: PETCARE_JOY_COLLAR_SIZES,
    },
    harness: {
      chartName: 'Bảng size Dây đeo ngực PetCare Joy Original',
      brandId: 'petcare_joy',
      brandName: 'PetCare Joy Original',
      source: 'Hồ sơ tiêu chuẩn kỹ thuật & may đo xuất xưởng PetCare Joy 2026',
      verificationStatus: 'verified_official',
      verificationBadge: 'Đã xác minh chính thức',
      isOfficial: true,
      sizes: PETCARE_JOY_HARNESS_SIZES,
    },
    clothing: {
      chartName: 'Bảng size Quần áo PetCare Joy Original',
      brandId: 'petcare_joy',
      brandName: 'PetCare Joy Original',
      source: 'Hồ sơ tiêu chuẩn may mặc thời trang thú cưng PetCare Joy 2026',
      verificationStatus: 'verified_official',
      verificationBadge: 'Đã xác minh chính thức',
      isOfficial: true,
      sizes: PETCARE_JOY_CLOTHING_SIZES,
    },
  },
};

// NÂNG CẤP DỮ LIỆU GIỐNG THÚ CƯNG (BREED_PRESETS)
// Bổ sung cờ isReferenceOnly, disclaimer, và ghi chú rõ ràng đây chỉ là ước lượng trung bình
export const BREED_PRESETS = {
  dog: [
    {
      id: 'poodle',
      name: 'Poodle (Toy / Mini)',
      defaultWeight: 4.5,
      defaultNeck: 26,
      defaultChest: 40,
      defaultBack: 30,
      isReferenceOnly: true,
      isAverageEstimate: true,
      note: 'Số đo trung bình tham khảo của giống Poodle Toy (dao động ±3cm tùy độ dày lông).',
    },
    {
      id: 'corgi',
      name: 'Corgi Pembroke',
      defaultWeight: 11.0,
      defaultNeck: 38,
      defaultChest: 54,
      defaultBack: 44,
      isReferenceOnly: true,
      isAverageEstimate: true,
      note: 'Lồng ngực sâu và lưng dài đặc trưng, thường cần chú ý chiều dài lưng khi chọn áo.',
    },
    {
      id: 'pomeranian',
      name: 'Phốc Sóc (Pomeranian)',
      defaultWeight: 3.0,
      defaultNeck: 22,
      defaultChest: 34,
      defaultBack: 24,
      isReferenceOnly: true,
      isAverageEstimate: true,
      note: 'Bộ lông xù bông dày; nếu đo không sát da có thể chênh lệch 2 - 4cm.',
    },
    {
      id: 'pug',
      name: 'Chó Pug / Bulldog Pháp',
      defaultWeight: 8.5,
      defaultNeck: 36,
      defaultChest: 50,
      defaultBack: 32,
      isReferenceOnly: true,
      isAverageEstimate: true,
      note: 'Khung xương to, vòng cổ và ngực nở, thân tương đối ngắn.',
    },
    {
      id: 'shiba',
      name: 'Shiba Inu',
      defaultWeight: 9.5,
      defaultNeck: 35,
      defaultChest: 49,
      defaultBack: 38,
      isReferenceOnly: true,
      isAverageEstimate: true,
      note: 'Cơ bắp thon gọn, lông kép 2 lớp dày vừa.',
    },
    {
      id: 'golden',
      name: 'Golden Retriever / Labrador',
      defaultWeight: 28.0,
      defaultNeck: 52,
      defaultChest: 78,
      defaultBack: 58,
      isReferenceOnly: true,
      isAverageEstimate: true,
      note: 'Dòng chó cỡ lớn, lực kéo mạnh, cần phụ kiện chịu lực cao.',
    },
    {
      id: 'husky',
      name: 'Husky / Alaska Malamute',
      defaultWeight: 26.0,
      defaultNeck: 50,
      defaultChest: 74,
      defaultBack: 56,
      isReferenceOnly: true,
      isAverageEstimate: true,
      note: 'Lông tuyết dày, cổ to khỏe và năng động chạy nhảy.',
    },
    {
      id: 'chihuahua',
      name: 'Chihuahua / Phốc Hươu',
      defaultWeight: 2.2,
      defaultNeck: 20,
      defaultChest: 30,
      defaultBack: 22,
      isReferenceOnly: true,
      isAverageEstimate: true,
      note: 'Vóc dáng mini, khí quản mỏng manh, tuyệt đối không dùng vòng cổ quá nặng.',
    },
  ],
  cat: [
    {
      id: 'aln',
      name: 'Mèo Anh Lông Ngắn (ALN)',
      defaultWeight: 4.8,
      defaultNeck: 25,
      defaultChest: 39,
      defaultBack: 30,
      isReferenceOnly: true,
      isAverageEstimate: true,
      note: 'Khung xương to, má phúng phính và ngực nở.',
    },
    {
      id: 'ald',
      name: 'Mèo Anh Lông Dài (ALD)',
      defaultWeight: 4.5,
      defaultNeck: 26,
      defaultChest: 41,
      defaultBack: 31,
      isReferenceOnly: true,
      isAverageEstimate: true,
      note: 'Lớp lông dài mượt; nên đo ôm sát da để tránh chọn nhầm size quá rộng.',
    },
    {
      id: 'ragdoll',
      name: 'Mèo Ragdoll',
      defaultWeight: 6.0,
      defaultNeck: 26,
      defaultChest: 43,
      defaultBack: 35,
      isReferenceOnly: true,
      isAverageEstimate: true,
      note: 'Vóc dáng dài và nặng cân hơn đa số mèo nhà.',
    },
    {
      id: 'munchkin',
      name: 'Mèo Munchkin Chân Ngắn',
      defaultWeight: 3.5,
      defaultNeck: 22,
      defaultChest: 35,
      defaultBack: 28,
      isReferenceOnly: true,
      isAverageEstimate: true,
      note: 'Chân ngắn đặc thù; khi mặc áo tránh các mẫu có ống tay dài làm vướng bước đi.',
    },
    {
      id: 'persian',
      name: 'Mèo Ba Tư (Persian)',
      defaultWeight: 4.2,
      defaultNeck: 25,
      defaultChest: 38,
      defaultBack: 30,
      isReferenceOnly: true,
      isAverageEstimate: true,
      note: 'Mặt tịt, cổ ngắn và lông xù dày.',
    },
    {
      id: 'ta',
      name: 'Mèo Mướp / Mèo Ta',
      defaultWeight: 3.2,
      defaultNeck: 21,
      defaultChest: 33,
      defaultBack: 26,
      isReferenceOnly: true,
      isAverageEstimate: true,
      note: 'Dáng người thon gọn, nhanh nhẹn, ưa thích loại đai êm nhẹ chống tuột.',
    },
  ],
};

// HÀM LẤY BẢNG SIZE THEO THỨ TỰ ƯU TIÊN VÀ XÁC THỰC
export function resolveSizeChart({ brandId = 'general', accessoryType = 'collar' }) {
  const brand = BRAND_OPTIONS.find((b) => b.id === brandId) || BRAND_OPTIONS[0];

  // 1. Kiểm tra nếu thương hiệu đã có bảng size chính thức
  if (brand.hasVerifiedData && SIZE_CHARTS[brand.id]?.[accessoryType]) {
    return {
      chart: SIZE_CHARTS[brand.id][accessoryType],
      brand,
      isFallback: false,
      fallbackReason: null,
    };
  }

  // 2. Fallback sang Bảng size tham khảo chung nếu thương hiệu chưa có bảng size
  const generalChart = SIZE_CHARTS.general[accessoryType];
  return {
    chart: generalChart,
    brand,
    isFallback: brand.id !== 'general',
    fallbackReason: brand.id !== 'general'
      ? `Thương hiệu "${brand.name}" chưa có bảng size chính thức được xác minh. Hệ thống tự động chuyển tiếp sang Bảng Size Tham Khảo Chung.`
      : null,
  };
}

// HÀM TÍNH TOÁN & TƯ VẤN KÍCH CỠ THEO THỨ TỰ ƯU TIÊN
export function evaluateAccessorySize({
  accessoryType = 'collar',
  brandId = 'general',
  petType = 'dog',
  breed = '',
  weight = 0,
  neck = 0,
  chest = 0,
  backLength = 0,
  isUsingPresetEstimate = false, // Cờ nhận biết người dùng đang dùng số đo mẫu của giống hay số đo thực tế
}) {
  const numWeight = parseFloat(weight) || 0;
  const numNeck = parseFloat(neck) || 0;
  const numChest = parseFloat(chest) || 0;
  const numBack = parseFloat(backLength) || 0;

  // 1. Kiểm tra tính hợp lệ cơ bản
  if (numWeight < 0 || numNeck < 0 || numChest < 0 || numBack < 0) {
    return {
      status: 'error',
      message: 'Số đo và cân nặng không được mang giá trị âm. Vui lòng kiểm tra lại.',
    };
  }

  if (numNeck > 120 || numChest > 160 || numBack > 150 || numWeight > 120) {
    return {
      status: 'error',
      message: 'Số đo vượt quá giới hạn thể trạng thông thường của thú cưng (vòng cổ > 120cm, ngực > 160cm, cân nặng > 120kg). Vui lòng kiểm tra lại.',
    };
  }

  // 2. Xác định bảng size áp dụng theo thương hiệu & phụ kiện
  const { chart, brand, isFallback, fallbackReason } = resolveSizeChart({ brandId, accessoryType });

  if (!chart || !chart.sizes || chart.sizes.length === 0) {
    return {
      status: 'error',
      message: `Không tìm thấy bảng size tương ứng cho phụ kiện "${accessoryType}" và thương hiệu "${brand.name}".`,
    };
  }

  // 3. Phân nhánh theo loại phụ kiện
  if (accessoryType === 'collar') {
    return evaluateCollar({
      chart,
      brand,
      isFallback,
      fallbackReason,
      neck: numNeck,
      weight: numWeight,
      petType,
      breed,
      isUsingPresetEstimate,
    });
  } else if (accessoryType === 'harness') {
    return evaluateHarness({
      chart,
      brand,
      isFallback,
      fallbackReason,
      chest: numChest,
      neck: numNeck,
      weight: numWeight,
      petType,
      breed,
      isUsingPresetEstimate,
    });
  } else if (accessoryType === 'clothing') {
    return evaluateClothing({
      chart,
      brand,
      isFallback,
      fallbackReason,
      chest: numChest,
      backLength: numBack,
      neck: numNeck,
      weight: numWeight,
      petType,
      breed,
      isUsingPresetEstimate,
    });
  }

  return {
    status: 'error',
    message: 'Loại phụ kiện không hợp lệ.',
  };
}

// LOGIC TƯ VẤN VÒNG CỔ (COLLAR)
function evaluateCollar({
  chart,
  brand,
  isFallback,
  fallbackReason,
  neck,
  weight,
  petType,
  breed,
  isUsingPresetEstimate,
}) {
  const table = chart.sizes;
  const missingMeasurements = [];

  if (!neck || neck <= 0) {
    missingMeasurements.push('Vòng cổ (cm) [Bắt buộc]');
    if (!weight || weight <= 0) missingMeasurements.push('Cân nặng (kg)');

    // Trường hợp chỉ nhập cân nặng hoặc chỉ chọn giống
    if (weight > 0 && (!neck || neck <= 0)) {
      return {
        status: 'only_weight',
        suggestedSize: 'Chưa thể xác định chính xác size vòng cổ',
        confidenceLevel: 'Thấp (Chỉ có cân nặng)',
        confidenceScore: 25,
        chartName: chart.chartName,
    brandName: brand.name,
        source: chart.source,
        verificationStatus: chart.verificationStatus,
        verificationBadge: chart.verificationBadge,
        isOfficialBrand: chart.isOfficial,
        isFallback,
        fallbackReason,
        missingMeasurements,
        reason: `Bạn mới chỉ cung cấp cân nặng (${weight}kg). Vòng cổ không thể chọn chuẩn xác chỉ qua cân nặng vì hai bé cùng cân nặng có thể có chu vi cổ chênh lệch rất nhiều do lông và cấu trúc cơ.`,
        advice: 'Vui lòng dùng thước dây đo quanh gốc cổ thú cưng để nhận đề xuất chuẩn xác 100%.',
        isReferenceOnly: true,
      };
    }

    return {
      status: 'waiting_input',
      missingField: 'neck',
      missingMeasurements,
      message: 'Vui lòng nhập số đo Vòng cổ (cm) để hệ thống đối chiếu bảng size.',
    };
  }

  // Quy tắc dự phòng ngón tay: +1.5cm
  const effectiveNeck = Math.round((neck + 1.5) * 10) / 10;
  let matchedIndex = -1;

  for (let i = 0; i < table.length; i++) {
    if (effectiveNeck >= table[i].minNeck && effectiveNeck <= table[i].maxNeck) {
      matchedIndex = i;
      break;
    }
  }

  // Trường hợp ngoại cỡ
  if (matchedIndex === -1) {
    if (effectiveNeck < table[0].minNeck) {
      return {
        status: 'out_of_range',
        suggestedSize: `Dưới Size ${table[0].size} (Cần dây mềm sơ sinh)`,
        confidenceLevel: 'Trung bình (Số đo thực tế ngoài khoảng bảng size)',
        confidenceScore: 60,
        chartName: chart.chartName,
    brandName: brand.name,
        source: chart.source,
        verificationStatus: chart.verificationStatus,
        verificationBadge: chart.verificationBadge,
        isOfficialBrand: chart.isOfficial,
        isFallback,
        fallbackReason,
        sizeItem: table[0],
        effectiveNeck,
        missingMeasurements,
        reason: `Vòng cổ thực tế ${neck}cm (cộng 1.5cm thở là ${effectiveNeck}cm) nhỏ hơn size nhỏ nhất (${table[0].minNeck}cm) của bảng size.`,
        advice: 'Nên chọn loại vòng cổ thắt nút mềm dạng ruy-băng dành riêng cho thú sơ sinh dưới 1.5kg.',
        isReferenceOnly: isUsingPresetEstimate,
      };
    } else {
      const last = table[table.length - 1];
      return {
        status: 'out_of_range',
        suggestedSize: `Trên Size ${last.size} (Cần dòng chuyên dụng đại khuyển)`,
        confidenceLevel: 'Trung bình (Số đo thực tế ngoài khoảng bảng size)',
        confidenceScore: 60,
        chartName: chart.chartName,
    brandName: brand.name,
        source: chart.source,
        verificationStatus: chart.verificationStatus,
        verificationBadge: chart.verificationBadge,
        isOfficialBrand: chart.isOfficial,
        isFallback,
        fallbackReason,
        sizeItem: last,
        effectiveNeck,
        missingMeasurements,
        reason: `Vòng cổ thực tế ${neck}cm (dự phòng là ${effectiveNeck}cm) vượt ngưỡng tối đa (${last.maxNeck}cm) của bảng size ${chart.brandName}.`,
        advice: 'Nên chọn dòng vòng cổ dù bện dày 3.5 - 4cm chuyên dụng cho đại khuyển.',
        isReferenceOnly: isUsingPresetEstimate,
      };
    }
  }

  const current = table[matchedIndex];
  let isBorderline = false;
  let borderlineNote = '';
  let alternativeSize = null;

  // Kiểm tra ranh giới giữa 2 size
  if (effectiveNeck >= current.maxNeck - 1.5 && matchedIndex < table.length - 1) {
    isBorderline = true;
    alternativeSize = table[matchedIndex + 1];
    borderlineNote = `Số đo (${effectiveNeck}cm) tiệm cận ranh giới giữa ${current.size} và ${alternativeSize.size}. Khuyến nghị: Chọn ${alternativeSize.size} nếu bé có lông dày hoặc đang phát triển; chọn ${current.size} nếu bé lông ngắn sát da và thích ôm gọn.`;
  } else if (effectiveNeck <= current.minNeck + 1.5 && matchedIndex > 0) {
    isBorderline = true;
    alternativeSize = table[matchedIndex - 1];
    borderlineNote = `Số đo (${effectiveNeck}cm) nằm ở ranh giới dưới của ${current.size} và trên của ${alternativeSize.size}.`;
  }

  // ĐÁNH GIÁ MỨC ĐỘ TIN CẬY (CONFIDENCE LEVEL)
  // Quy tắc: Không bao giờ hiển thị mức độ tin cậy cao nếu đang dùng dữ liệu mẫu (isUsingPresetEstimate)
  let confidenceLevel = 'Cao (Số đo thực tế)';
  let confidenceScore = 95;

  if (isUsingPresetEstimate) {
    confidenceLevel = 'Thấp (Ước lượng từ số đo trung bình của giống)';
    confidenceScore = 40;
  } else if (isBorderline) {
    confidenceLevel = 'Trung bình (Số đo nằm ở ranh giới giữa 2 size)';
    confidenceScore = 75;
  } else if (!chart.isOfficial) {
    confidenceLevel = 'Khá cao (Bảng size tham khảo chung)';
    confidenceScore = 88;
  }

  const weightInfo = weight > 0
    ? `Cân nặng ${weight}kg ${weight >= current.minWeight && weight <= current.maxWeight ? 'trùng khớp' : 'ở mức tham khảo'} với thể trạng phổ biến của size này.`
    : 'Chưa có thông tin cân nặng (size được xác định chuẩn xác qua số đo vòng cổ thực tế).';

  const petExtra = petType === 'cat' ? ' Đối với mèo, khuyến khích chọn vòng cổ có khóa an toàn tự bung (Breakaway buckle) khi leo trèo.' : '';

  return {
    status: 'success',
    suggestedSize: `Size ${current.size}`,
    sizeItem: current,
    effectiveNeck,
    isBorderline,
    borderlineNote,
    alternativeSize: alternativeSize ? alternativeSize.size : null,
    confidenceLevel,
    confidenceScore,
    chartName: chart.chartName,
    brandName: brand.name,
    source: chart.source,
    verificationStatus: chart.verificationStatus,
    verificationBadge: chart.verificationBadge,
    isOfficialBrand: chart.isOfficial,
    isFallback,
    fallbackReason,
    missingMeasurements,
    reason: `Vòng cổ thực tế ${neck}cm (cộng thêm 1.5cm thở là ${effectiveNeck}cm) nằm chuẩn trong khoảng nới chỉnh an toàn (${current.minNeck} - ${current.maxNeck}cm) của ${current.label}. ${weightInfo}`,
    advice: `Bản dây đề xuất: ${current.width}. ${current.description}${petExtra}`,
    tableData: table,
    isReferenceOnly: isUsingPresetEstimate,
    breedReferenced: breed,
  };
}

// LOGIC TƯ VẤN DÂY ĐEO NGỰC (HARNESS)
function evaluateHarness({
  chart,
  brand,
  isFallback,
  fallbackReason,
  chest,
  neck,
  weight,
  petType,
  breed,
  isUsingPresetEstimate,
}) {
  const table = chart.sizes;
  const missingMeasurements = [];

  if (!chest || chest <= 0) {
    missingMeasurements.push('Vòng ngực (cm) [Bắt buộc]');
    if (!neck || neck <= 0) missingMeasurements.push('Vòng cổ (cm)');
    if (!weight || weight <= 0) missingMeasurements.push('Cân nặng (kg)');

    if (weight > 0 && (!chest || chest <= 0)) {
      return {
        status: 'only_weight',
        suggestedSize: 'Chưa thể xác định chính xác size đai yếm',
        confidenceLevel: 'Thấp (Chỉ có cân nặng)',
        confidenceScore: 25,
        chartName: chart.chartName,
    brandName: brand.name,
        source: chart.source,
        verificationStatus: chart.verificationStatus,
        verificationBadge: chart.verificationBadge,
        isOfficialBrand: chart.isOfficial,
        isFallback,
        fallbackReason,
        missingMeasurements,
        reason: `Bạn mới chỉ cung cấp cân nặng (${weight}kg). Đai yếm tiếp xúc trực tiếp xương ức và lồng ngực; nếu chỉ chọn theo cân nặng sẽ rất dễ bị tuột chân hoặc cọ xước nách.`,
        advice: 'Vui lòng đo chu vi vòng ngực (phần to nhất sau 2 nách trước) để nhận tư vấn chính xác.',
        isReferenceOnly: true,
      };
    }

    return {
      status: 'waiting_input',
      missingField: 'chest',
      missingMeasurements,
      message: 'Vui lòng nhập số đo Vòng ngực (cm) để đối chiếu size đai yếm.',
    };
  }

  if (!neck || neck <= 0) {
    missingMeasurements.push('Vòng cổ (cm) [Khuyên nhập thêm]');
  }

  let matchedIndex = -1;
  for (let i = 0; i < table.length; i++) {
    if (chest >= table[i].minChest && chest <= table[i].maxChest) {
      matchedIndex = i;
      break;
    }
  }

  if (matchedIndex === -1) {
    if (chest < table[0].minChest) {
      return {
        status: 'out_of_range',
        suggestedSize: `Dưới Size ${table[0].size} (Cần yếm nhung mini chống tuột)`,
        confidenceLevel: 'Trung bình (Số đo thực tế ngoài khoảng bảng size)',
        confidenceScore: 60,
        chartName: chart.chartName,
    brandName: brand.name,
        source: chart.source,
        verificationStatus: chart.verificationStatus,
        verificationBadge: chart.verificationBadge,
        isOfficialBrand: chart.isOfficial,
        isFallback,
        fallbackReason,
        sizeItem: table[0],
        missingMeasurements,
        reason: `Vòng ngực ${chest}cm nhỏ hơn kích cỡ tiêu chuẩn nhỏ nhất (${table[0].minChest}cm) của bảng size ${chart.brandName}.`,
        advice: 'Bé nên dùng yếm vải nhung có khóa dán Velcro ôm sát ngực để chống tuột chân.',
        isReferenceOnly: isUsingPresetEstimate,
      };
    } else {
      const last = table[table.length - 1];
      return {
        status: 'out_of_range',
        suggestedSize: `Trên Size ${last.size} (Cần dòng đai dã ngoại chịu tải đại khuyển)`,
        confidenceLevel: 'Trung bình (Số đo thực tế ngoài khoảng bảng size)',
        confidenceScore: 60,
        chartName: chart.chartName,
    brandName: brand.name,
        source: chart.source,
        verificationStatus: chart.verificationStatus,
        verificationBadge: chart.verificationBadge,
        isOfficialBrand: chart.isOfficial,
        isFallback,
        fallbackReason,
        sizeItem: last,
        missingMeasurements,
        reason: `Vòng ngực ${chest}cm vượt qua mức tối đa (${last.maxChest}cm) của bảng size ${chart.brandName}.`,
        advice: 'Nên chọn đai yếm chiến thuật bản lớn có móc kéo phía trước ức No-Pull.',
        isReferenceOnly: isUsingPresetEstimate,
      };
    }
  }

  const current = table[matchedIndex];
  let isBorderline = false;
  let borderlineNote = '';
  let alternativeSize = null;

  if (chest >= current.maxChest - 2.5 && matchedIndex < table.length - 1) {
    isBorderline = true;
    alternativeSize = table[matchedIndex + 1];
    borderlineNote = `Vòng ngực (${chest}cm) tiệm cận giới hạn trên của ${current.size}. Khuyến nghị: Chọn ${alternativeSize.size} để tránh đai cọ xát nách khi bé chạy nhảy mạnh.`;
  } else if (chest <= current.minChest + 2.0 && matchedIndex > 0) {
    isBorderline = true;
    alternativeSize = table[matchedIndex - 1];
    borderlineNote = `Vòng ngực (${chest}cm) sát giới hạn dưới của ${current.size}.`;
  }

  // ĐÁNH GIÁ MỨC ĐỘ TIN CẬY
  let confidenceLevel = 'Cao (Số đo thực tế)';
  let confidenceScore = 95;

  if (isUsingPresetEstimate) {
    confidenceLevel = 'Thấp (Ước lượng từ số đo trung bình của giống)';
    confidenceScore = 40;
  } else if (isBorderline) {
    confidenceLevel = 'Trung bình (Số đo nằm ở ranh giới giữa 2 size)';
    confidenceScore = 75;
  } else if (!neck || neck <= 0) {
    confidenceLevel = 'Khá cao (Đã có vòng ngực, chưa có vòng cổ đối chiếu)';
    confidenceScore = 85;
  }

  let neckValidation = '';
  if (neck > 0) {
    if (neck > current.maxNeck) {
      neckValidation = ` Lưu ý: Vòng cổ bé (${neck}cm) hơi to so với form cổ chuẩn của size ${current.size}, nên chọn loại yếm có quai tăng giảm cổ riêng biệt.`;
    }
  }

  const catExtra = petType === 'cat' ? ' Yếm cho mèo cần chất liệu lưới mềm mại để chống phản xạ thụt lùi tuột đai.' : '';

  return {
    status: 'success',
    suggestedSize: `Size ${current.size}`,
    sizeItem: current,
    isBorderline,
    borderlineNote,
    alternativeSize: alternativeSize ? alternativeSize.size : null,
    confidenceLevel,
    confidenceScore,
    chartName: chart.chartName,
    brandName: brand.name,
    source: chart.source,
    verificationStatus: chart.verificationStatus,
    verificationBadge: chart.verificationBadge,
    isOfficialBrand: chart.isOfficial,
    isFallback,
    fallbackReason,
    missingMeasurements,
    reason: `Vòng ngực ${chest}cm nằm trong biên độ chịu lực tối ưu (${current.minChest} - ${current.maxChest}cm) của ${current.label}.${neckValidation}`,
    advice: `${current.description}${catExtra}`,
    tableData: table,
    isReferenceOnly: isUsingPresetEstimate,
    breedReferenced: breed,
  };
}

// LOGIC TƯ VẤN QUẦN ÁO THÚ CƯNG (CLOTHING)
function evaluateClothing({
  chart,
  brand,
  isFallback,
  fallbackReason,
  chest,
  backLength,
  neck,
  weight,
  petType,
  breed,
  isUsingPresetEstimate,
}) {
  const table = chart.sizes;
  const missingMeasurements = [];

  if (!chest || chest <= 0) {
    missingMeasurements.push('Vòng ngực (cm) [Bắt buộc]');
    if (!backLength || backLength <= 0) missingMeasurements.push('Chiều dài lưng (cm) [Quan trọng]');
    if (!neck || neck <= 0) missingMeasurements.push('Vòng cổ (cm)');
    if (!weight || weight <= 0) missingMeasurements.push('Cân nặng (kg)');

    if (weight > 0 && (!chest || chest <= 0)) {
      return {
        status: 'only_weight',
        suggestedSize: 'Chưa thể xác định chính xác size quần áo',
        confidenceLevel: 'Thấp (Chỉ có cân nặng)',
        confidenceScore: 25,
        chartName: chart.chartName,
    brandName: brand.name,
        source: chart.source,
        verificationStatus: chart.verificationStatus,
        verificationBadge: chart.verificationBadge,
        isOfficialBrand: chart.isOfficial,
        isFallback,
        fallbackReason,
        missingMeasurements,
        reason: `Bạn mới chỉ cung cấp cân nặng (${weight}kg). Quần áo thú cưng bắt buộc phải cài khuy hoặc kéo khóa quanh ngực; nếu chỉ dựa vào cân nặng áo sẽ rất dễ bị chật nghẹt thở hoặc quá rộng rớt vai.`,
        advice: 'Vui lòng đo vòng ngực và chiều dài lưng bé để chọn size áo chuẩn đẹp nhất.',
        isReferenceOnly: true,
      };
    }

    return {
      status: 'waiting_input',
      missingField: 'chest',
      missingMeasurements,
      message: 'Vui lòng nhập số đo Vòng ngực (cm) - đây là tiêu chí quan trọng nhất để cài cúc/kéo khóa áo.',
    };
  }

  if (!backLength || backLength <= 0) {
    missingMeasurements.push('Chiều dài lưng (cm) [Khuyên nhập thêm]');
  }

  let matchedIndex = -1;
  for (let i = 0; i < table.length; i++) {
    if (chest >= table[i].minChest && chest <= table[i].maxChest) {
      matchedIndex = i;
      break;
    }
  }

  if (matchedIndex === -1) {
    if (chest < table[0].minChest) {
      return {
        status: 'out_of_range',
        suggestedSize: `Dưới Size ${table[0].size} (Áo len co giãn mini)`,
        confidenceLevel: 'Trung bình (Số đo thực tế ngoài khoảng bảng size)',
        confidenceScore: 60,
        chartName: chart.chartName,
    brandName: brand.name,
        source: chart.source,
        verificationStatus: chart.verificationStatus,
        verificationBadge: chart.verificationBadge,
        isOfficialBrand: chart.isOfficial,
        isFallback,
        fallbackReason,
        sizeItem: table[0],
        missingMeasurements,
        reason: `Vòng ngực ${chest}cm nhỏ hơn size ${table[0].size} tiêu chuẩn (${table[0].minChest}cm).`,
        advice: 'Nên chọn áo thun gân 4 chiều hoặc áo len dệt kim có độ co giãn ôm khít.',
        isReferenceOnly: isUsingPresetEstimate,
      };
    } else {
      const last = table[table.length - 1];
      return {
        status: 'out_of_range',
        suggestedSize: `Trên Size ${last.size} (Áo choàng dán lưng thể thao)`,
        confidenceLevel: 'Trung bình (Số đo thực tế ngoài khoảng bảng size)',
        confidenceScore: 60,
        chartName: chart.chartName,
    brandName: brand.name,
        source: chart.source,
        verificationStatus: chart.verificationStatus,
        verificationBadge: chart.verificationBadge,
        isOfficialBrand: chart.isOfficial,
        isFallback,
        fallbackReason,
        sizeItem: last,
        missingMeasurements,
        reason: `Vòng ngực ${chest}cm vượt qua cỡ lớn nhất (${last.maxChest}cm) của bảng size.`,
        advice: 'Nên chọn áo kiểu áo choàng dán lưng (Cape coat) để điều chỉnh vòng bụng linh hoạt.',
        isReferenceOnly: isUsingPresetEstimate,
      };
    }
  }

  let current = table[matchedIndex];
  let isBorderline = false;
  let borderlineNote = '';
  let alternativeSize = null;

  if (chest >= current.maxChest - 1.5 && matchedIndex < table.length - 1) {
    isBorderline = true;
    alternativeSize = table[matchedIndex + 1];
    borderlineNote = `Vòng ngực (${chest}cm) nằm sát giới hạn trên của ${current.size}. Nếu chất vải không co giãn hoặc bé lông xù, NÊN CHỌN size ${alternativeSize.size}.`;
  }

  let backAnalysis = '';
  if (backLength > 0) {
    if (backLength > current.maxBack + 4 && matchedIndex < table.length - 1) {
      const nextSize = table[matchedIndex + 1];
      borderlineNote += ` ⚠️ Chiều dài lưng của bé (${backLength}cm) dài hơn form áo tiêu chuẩn (${current.minBack}-${current.maxBack}cm). Mặc ${current.size} sẽ hơi cộc lưng; có thể cân nhắc ${nextSize.size} nếu muốn che ấm hết mông.`;
      isBorderline = true;
      if (!alternativeSize) alternativeSize = nextSize;
    } else if (backLength < current.minBack - 3) {
      backAnalysis = ` Chiều dài lưng (${backLength}cm) hơi ngắn so với form áo, vạt áo có thể trùm qua hông một chút.`;
    } else {
      backAnalysis = ` Chiều dài lưng (${backLength}cm) hoàn toàn cân đối với form áo ${current.minBack} - ${current.maxBack}cm.`;
    }
  } else {
    backAnalysis = ' (Chưa có số đo chiều dài lưng thực tế - size hiện tại căn cứ tối ưu theo vòng ngực).';
  }

  // ĐÁNH GIÁ MỨC ĐỘ TIN CẬY
  let confidenceLevel = 'Cao (Đầy đủ số đo ngực & lưng thực tế)';
  let confidenceScore = 95;

  if (isUsingPresetEstimate) {
    confidenceLevel = 'Thấp (Ước lượng từ số đo trung bình của giống)';
    confidenceScore = 40;
  } else if (!backLength || backLength <= 0) {
    confidenceLevel = 'Trung bình (Đã có vòng ngực, thiếu chiều dài lưng)';
    confidenceScore = 70;
  } else if (isBorderline) {
    confidenceLevel = 'Trung bình (Số đo nằm ở ranh giới giữa 2 size)';
    confidenceScore = 75;
  }

  const catNote = petType === 'cat' ? ' Mèo thường nhạy cảm khi mặc áo; hãy ưu tiên áo thun mỏng sát nách thay vì áo có tay dài.' : '';

  return {
    status: 'success',
    suggestedSize: `Size ${current.size}`,
    sizeItem: current,
    isBorderline,
    borderlineNote,
    alternativeSize: alternativeSize ? alternativeSize.size : null,
    confidenceLevel,
    confidenceScore,
    chartName: chart.chartName,
    brandName: brand.name,
    source: chart.source,
    verificationStatus: chart.verificationStatus,
    verificationBadge: chart.verificationBadge,
    isOfficialBrand: chart.isOfficial,
    isFallback,
    fallbackReason,
    missingMeasurements,
    reason: `Vòng ngực ${chest}cm nằm chuẩn trong khoảng nới của ${current.label} (${current.minChest} - ${current.maxChest}cm).${backAnalysis}`,
    advice: `Chất liệu đề xuất: Nên chọn vải có độ co giãn nhẹ 5-10% nếu bé hiếu động. ${current.description}${catNote}`,
    tableData: table,
    isReferenceOnly: isUsingPresetEstimate,
    breedReferenced: breed,
  };
}
