// src/pages/Products/productSizeData.js
// Dữ liệu bảng size sản phẩm phụ kiện thú cưng và logic đối chiếu kích cỡ

export const ACCESSORY_PRODUCTS = [
  {
    id: 'prod_vong_co_thu_cung',
    name: 'Vòng cổ thú cưng',
    category: 'accessory',
    categoryName: 'Phụ kiện thời trang',
    accessoryType: 'collar',
    price: 95000,
    originalPrice: 120000,
    rating: 4.9,
    reviewsCount: 38,
    image: '/image/phu-kien/vong-co-thu-cung.jpg',
    description: 'Vòng cổ thú cưng chất liệu dây dù dệt đôi cao cấp, khóa bấm an toàn chống tuột và vòng kim loại gắn thẻ tên hoặc dây dắt. Dễ dàng điều chỉnh kích cỡ phù hợp cho chó nhỏ, chó vừa và mèo.',
    verificationStatus: 'estimated',
    verificationNote: 'Dữ liệu kích cỡ mẫu tham khảo chuẩn hóa (Cần xác minh từ nhà sản xuất)',
    isSample: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    sizeChart: [
      {
        size: 'XS',
        label: 'Size XS (Siêu nhỏ)',
        productLength: 28, // Chiều dài tối đa của dây (cm)
        minPetNeck: 18,
        maxPetNeck: 24,
        strapWidth: 1.0, // Chiều rộng bản dây (cm)
        weightEstimate: '1.0 - 3.0 kg',
        description: 'Phù hợp cho mèo con, Chihuahua, Teacup Poodle.',
      },
      {
        size: 'S',
        label: 'Size S (Nhỏ)',
        productLength: 36,
        minPetNeck: 24,
        maxPetNeck: 32,
        strapWidth: 1.5,
        weightEstimate: '3.0 - 6.0 kg',
        description: 'Phù hợp cho Poodle Toy, Phốc Sóc, Mèo Anh lông ngắn.',
      },
      {
        size: 'M',
        label: 'Size M (Vừa)',
        productLength: 46,
        minPetNeck: 30,
        maxPetNeck: 40,
        strapWidth: 2.0,
        weightEstimate: '6.0 - 12.0 kg',
        description: 'Phù hợp cho Corgi, Shiba Inu, Pug, Beagle.',
      },
      {
        size: 'L',
        label: 'Size L (Lớn)',
        productLength: 58,
        minPetNeck: 38,
        maxPetNeck: 52,
        strapWidth: 2.5,
        weightEstimate: '12.0 - 24.0 kg',
        description: 'Phù hợp cho Bulldog Pháp, Husky, Border Collie.',
      },
      {
        size: 'XL',
        label: 'Size XL (Rất lớn)',
        productLength: 70,
        minPetNeck: 50,
        maxPetNeck: 65,
        strapWidth: 3.0,
        weightEstimate: '24.0 - 45.0 kg',
        description: 'Phù hợp cho Golden Retriever, Alaska Malamute, Labrador.',
      },
    ],
  },
  {
    id: 'prod_vong_co_cho_meo',
    name: 'Vòng cổ cho mèo',
    category: 'accessory',
    categoryName: 'Phụ kiện cho mèo',
    accessoryType: 'collar',
    price: 65000,
    originalPrice: 85000,
    rating: 5.0,
    reviewsCount: 54,
    image: '/image/vong-co-cho-meo.jpg',
    description: 'Vòng cổ chuyên dụng cho mèo với chất liệu vải êm ái, khóa an toàn tự bung Breakaway khi bị mắc kẹt, kèm chuông đồng mini tạo điểm nhấn dễ thương và giúp sen dễ tìm bé.',
    verificationStatus: 'estimated',
    verificationNote: 'Dữ liệu kích cỡ mẫu tham khảo chuẩn hóa (Cần xác minh từ nhà sản xuất)',
    isSample: true,
    sizes: ['XS', 'S', 'M'],
    sizeChart: [
      {
        size: 'XS',
        label: 'Size XS (Mèo con 2-5 tháng)',
        productLength: 24,
        minPetNeck: 16,
        maxPetNeck: 22,
        strapWidth: 1.0,
        weightEstimate: '0.8 - 2.5 kg',
        description: 'Bản dây siêu mảnh, khóa nhẹ nhàng không gây nặng cổ cho mèo nhỏ.',
      },
      {
        size: 'S',
        label: 'Size S (Mèo tiêu chuẩn)',
        productLength: 30,
        minPetNeck: 20,
        maxPetNeck: 28,
        strapWidth: 1.0,
        weightEstimate: '2.5 - 5.0 kg',
        description: 'Size thông dụng nhất cho mèo ta, mèo ALN, mèo Ba Tư trưởng thành.',
      },
      {
        size: 'M',
        label: 'Size M (Mèo cỡ lớn / Mập)',
        productLength: 36,
        minPetNeck: 26,
        maxPetNeck: 34,
        strapWidth: 1.2,
        weightEstimate: '5.0 - 8.5 kg',
        description: 'Dành cho mèo giống lớn như Ragdoll, Maine Coon hoặc các bé mặt nọng đẫy đà.',
      },
    ],
  },
  {
    id: 'prod_day_dat_kem_yem',
    name: 'Dây dắt chó mèo kèm yếm',
    category: 'accessory',
    categoryName: 'Phụ kiện dạo phố',
    accessoryType: 'harness',
    price: 135000,
    originalPrice: 170000,
    rating: 4.9,
    reviewsCount: 82,
    image: '/image/phu-kien/day-dat-cho-meo-kem-yem.jfif',
    description: 'Bộ đai yếm trợ lực kèm dây dắt đồng màu chắc chắn. Thiết kế yếm chữ Y ôm sát ngực và vai, giảm áp lực lên cổ họng, chất liệu lưới thoáng khí chống hầm bí mồ hôi khi vận động ngoài trời.',
    verificationStatus: 'estimated',
    verificationNote: 'Dữ liệu kích cỡ mẫu tham khảo chuẩn hóa (Cần xác minh từ nhà sản xuất)',
    isSample: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    sizeChart: [
      {
        size: 'XS',
        label: 'Size XS (Siêu nhỏ)',
        productNeck: 24, // Vòng cổ yếm tối đa (cm)
        minPetChest: 28, // Phạm vi vòng ngực phù hợp (cm)
        maxPetChest: 38,
        adjustmentRange: '± 4 cm',
        leashLength: 120, // Chiều dài dây dắt (cm)
        weightEstimate: '1.5 - 3.5 kg',
        description: 'Thích hợp cho Phốc Sóc mini, Mèo con, Poodle Tiny.',
      },
      {
        size: 'S',
        label: 'Size S (Nhỏ)',
        productNeck: 32,
        minPetChest: 36,
        maxPetChest: 48,
        adjustmentRange: '± 5 cm',
        leashLength: 120,
        weightEstimate: '3.5 - 7.5 kg',
        description: 'Thích hợp cho Poodle Toy, Mèo ALN trưởng thành, Pug con.',
      },
      {
        size: 'M',
        label: 'Size M (Vừa)',
        productNeck: 42,
        minPetChest: 46,
        maxPetChest: 62,
        adjustmentRange: '± 6 cm',
        leashLength: 130,
        weightEstimate: '7.5 - 15.0 kg',
        description: 'Thích hợp cho Corgi, Shiba Inu, Pug, Bulldog Pháp.',
      },
      {
        size: 'L',
        label: 'Size L (Lớn)',
        productNeck: 54,
        minPetChest: 60,
        maxPetChest: 80,
        adjustmentRange: '± 8 cm',
        leashLength: 140,
        weightEstimate: '15.0 - 28.0 kg',
        description: 'Thích hợp cho Bulldog Anh, Husky, Border Collie.',
      },
      {
        size: 'XL',
        label: 'Size XL (Rất lớn)',
        productNeck: 66,
        minPetChest: 78,
        maxPetChest: 102,
        adjustmentRange: '± 10 cm',
        leashLength: 150,
        weightEstimate: '28.0 - 50.0 kg',
        description: 'Thích hợp cho Golden Retriever, Alaska Malamute, Labrador.',
      },
    ],
  },
  {
    id: 'prod_quan_ao_cho_meo',
    name: 'Quần áo cho chó mèo',
    category: 'accessory',
    categoryName: 'Thời trang thú cưng',
    accessoryType: 'clothing',
    price: 110000,
    originalPrice: 145000,
    rating: 4.9,
    reviewsCount: 76,
    image: '/image/phu-kien/quan-ao-cho-cho-meo.jfif',
    description: 'Trang phục thú cưng chất liệu thun cotton mềm mịn, co giãn nhẹ nhàng giữ ấm và chống rụng lông trong nhà. Thiết kế khoét nách và chừa bụng tiện lợi khi bé đi vệ sinh.',
    verificationStatus: 'estimated',
    verificationNote: 'Dữ liệu kích cỡ mẫu tham khảo chuẩn hóa (Cần xác minh từ nhà sản xuất)',
    isSample: true,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    sizeChart: [
      {
        size: 'XS',
        label: 'Size XS (1.0 - 2.0 kg)',
        productNeck: 20, // Chu vi cổ áo (cm)
        productChest: 30, // Chu vi ngực áo (cm)
        productBack: 20, // Chiều dài lưng áo (cm)
        minPetChest: 27, // Vòng ngực bé phù hợp (cm)
        maxPetChest: 32,
        minPetBack: 18, // Chiều dài lưng bé phù hợp (cm)
        maxPetBack: 22,
        weightEstimate: '1.0 - 2.0 kg',
        description: 'Dành cho mèo con, Chihuahua nhỏ, Poodle Teacup.',
      },
      {
        size: 'S',
        label: 'Size S (2.0 - 3.5 kg)',
        productNeck: 24,
        productChest: 36,
        productBack: 25,
        minPetChest: 33,
        maxPetChest: 38,
        minPetBack: 23,
        maxPetBack: 27,
        weightEstimate: '2.0 - 3.5 kg',
        description: 'Dành cho Poodle Toy, Phốc Sóc, Mèo ALN nhỡ.',
      },
      {
        size: 'M',
        label: 'Size M (3.5 - 5.5 kg)',
        productNeck: 28,
        productChest: 42,
        productBack: 30,
        minPetChest: 39,
        maxPetChest: 44,
        minPetBack: 28,
        maxPetBack: 33,
        weightEstimate: '3.5 - 5.5 kg',
        description: 'Dành cho hầu hết mèo trưởng thành, Poodle tiêu chuẩn.',
      },
      {
        size: 'L',
        label: 'Size L (5.5 - 8.0 kg)',
        productNeck: 33,
        productChest: 48,
        productBack: 36,
        minPetChest: 45,
        maxPetChest: 51,
        minPetBack: 34,
        maxPetBack: 39,
        weightEstimate: '5.5 - 8.0 kg',
        description: 'Dành cho Pug, Corgi nhỏ, Mèo Ragdoll to.',
      },
      {
        size: 'XL',
        label: 'Size XL (8.0 - 13.0 kg)',
        productNeck: 38,
        productChest: 56,
        productBack: 42,
        minPetChest: 52,
        maxPetChest: 59,
        minPetBack: 40,
        maxPetBack: 46,
        weightEstimate: '8.0 - 13.0 kg',
        description: 'Dành cho Corgi trưởng thành, Shiba Inu, Bulldog Pháp.',
      },
    ],
  },
  {
    id: 'prod_vong_co_retro',
    name: 'Vòng cổ chuông đồng thời trang phong cách Retro',
    category: 'accessory',
    categoryName: 'Phụ kiện thời trang',
    accessoryType: 'collar',
    price: 120000,
    originalPrice: 150000,
    rating: 4.9,
    reviewsCount: 78,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&auto=format&fit=crop&q=80',
    description: 'Vòng cổ vải dệt thủ công hoa văn vintage sang trọng, kèm chuông đồng leng keng giúp bạn dễ định vị bé cưng. Chốt kim loại bền bỉ có thể nới rộng vừa vặn cho cả chó và mèo.',
    verificationStatus: 'estimated',
    verificationNote: 'Dữ liệu kích cỡ mẫu tham khảo chuẩn hóa (Cần xác minh từ nhà sản xuất)',
    isSample: true,
    sizes: ['S', 'M'],
    sizeChart: [
      {
        size: 'S',
        label: 'Size S (Thú cưng nhỏ)',
        productLength: 32,
        minPetNeck: 19,
        maxPetNeck: 28,
        strapWidth: 1.5,
        weightEstimate: '2.0 - 5.0 kg',
        description: 'Phù hợp cho mèo nhà và chó vóc nhỏ.',
      },
      {
        size: 'M',
        label: 'Size M (Thú cưng vừa)',
        productLength: 42,
        minPetNeck: 27,
        maxPetNeck: 38,
        strapWidth: 2.0,
        weightEstimate: '5.0 - 10.0 kg',
        description: 'Phù hợp cho chó vóc trung bình và mèo cỡ đại.',
      },
    ],
  },
];

// Hàm tìm thông tin size của sản phẩm theo id hoặc theo tên
export function getProductSizeData(productIdOrName) {
  if (!productIdOrName) return null;
  const target = String(productIdOrName).toLowerCase();
  return (
    ACCESSORY_PRODUCTS.find(
      (p) => String(p.id).toLowerCase() === target || p.name.toLowerCase() === target
    ) || null
  );
}

// Hàm đối chiếu số đo người dùng nhập với bảng size của một sản phẩm cụ thể
export function matchSizeForProduct(product, { neck = 0, chest = 0, backLength = 0 }) {
  if (!product || !product.sizeChart || product.sizeChart.length === 0) {
    return {
      status: 'error',
      message: 'Sản phẩm này chưa có dữ liệu bảng size.',
    };
  }

  const numNeck = parseFloat(neck) || 0;
  const numChest = parseFloat(chest) || 0;
  const numBack = parseFloat(backLength) || 0;
  const table = product.sizeChart;

  if (product.accessoryType === 'collar') {
    if (!numNeck || numNeck <= 0) {
      return {
        status: 'waiting_input',
        missingField: 'neck',
        message: 'Vui lòng nhập số đo Vòng cổ (cm) để hệ thống chọn size vòng cổ chính xác cho sản phẩm này.',
      };
    }

    const effectiveNeck = Math.round((numNeck + 1.5) * 10) / 10;
    let matched = table.find((row) => effectiveNeck >= row.minPetNeck && effectiveNeck <= row.maxPetNeck);

    if (!matched) {
      if (effectiveNeck < table[0].minPetNeck) {
        return {
          status: 'out_of_range',
          suggestedSize: `Dưới ${table[0].size}`,
          reason: `Vòng cổ thú cưng (${numNeck}cm + 1.5cm thở = ${effectiveNeck}cm) nhỏ hơn size nhỏ nhất của sản phẩm (${table[0].minPetNeck}cm).`,
          isBorderline: false,
        };
      }
      const last = table[table.length - 1];
      return {
        status: 'out_of_range',
        suggestedSize: `Trên ${last.size}`,
        reason: `Vòng cổ thú cưng (${numNeck}cm + 1.5cm thở = ${effectiveNeck}cm) vượt ngưỡng size lớn nhất của sản phẩm (${last.maxPetNeck}cm).`,
        isBorderline: false,
      };
    }

    let isBorderline = false;
    let borderlineNote = '';
    const currentIndex = table.indexOf(matched);
    if (effectiveNeck >= matched.maxPetNeck - 1.5 && currentIndex < table.length - 1) {
      isBorderline = true;
      const next = table[currentIndex + 1];
      borderlineNote = `Số đo (${effectiveNeck}cm) tiệm cận ranh giới giữa ${matched.size} và ${next.size}. Nếu bé có lông xù dày, nên chọn ${next.size}.`;
    }

    return {
      status: 'success',
      suggestedSize: `Size ${matched.size}`,
      sizeItem: matched,
      isBorderline,
      borderlineNote,
      reason: `Vòng cổ thực tế ${numNeck}cm (dự phòng thở là ${effectiveNeck}cm) nằm hoàn toàn trong phạm vi an toàn (${matched.minPetNeck} - ${matched.maxPetNeck}cm) của ${product.name} [Size ${matched.size}].`,
    };
  }

  if (product.accessoryType === 'harness') {
    if (!numChest || numChest <= 0) {
      return {
        status: 'waiting_input',
        missingField: 'chest',
        message: 'Vui lòng nhập số đo Vòng ngực (cm) để chọn size đai yếm phù hợp cho sản phẩm này.',
      };
    }

    let matched = table.find((row) => numChest >= row.minPetChest && numChest <= row.maxPetChest);

    if (!matched) {
      if (numChest < table[0].minPetChest) {
        return {
          status: 'out_of_range',
          suggestedSize: `Dưới ${table[0].size}`,
          reason: `Vòng ngực (${numChest}cm) nhỏ hơn size nhỏ nhất của đai yếm (${table[0].minPetChest}cm).`,
          isBorderline: false,
        };
      }
      const last = table[table.length - 1];
      return {
        status: 'out_of_range',
        suggestedSize: `Trên ${last.size}`,
        reason: `Vòng ngực (${numChest}cm) vượt ngưỡng tối đa của sản phẩm (${last.maxPetChest}cm).`,
        isBorderline: false,
      };
    }

    let isBorderline = false;
    let borderlineNote = '';
    const currentIndex = table.indexOf(matched);
    if (numChest >= matched.maxPetChest - 2 && currentIndex < table.length - 1) {
      isBorderline = true;
      const next = table[currentIndex + 1];
      borderlineNote = `Vòng ngực (${numChest}cm) sát giới hạn trên của ${matched.size}. Khuyến khích chọn ${next.size} để tránh cọ xước nách.`;
    }

    return {
      status: 'success',
      suggestedSize: `Size ${matched.size}`,
      sizeItem: matched,
      isBorderline,
      borderlineNote,
      reason: `Vòng ngực ${numChest}cm nằm trong khoảng vừa vặn (${matched.minPetChest} - ${matched.maxPetChest}cm) của ${product.name} [Size ${matched.size}]. Phạm vi điều chỉnh dây đai: ${matched.adjustmentRange}.`,
    };
  }

  if (product.accessoryType === 'clothing') {
    if (!numChest || numChest <= 0) {
      return {
        status: 'waiting_input',
        missingField: 'chest',
        message: 'Vui lòng nhập số đo Vòng ngực (cm) - tiêu chí quan trọng nhất để cài cúc áo.',
      };
    }

    let matched = table.find((row) => numChest >= row.minPetChest && numChest <= row.maxPetChest);

    if (!matched) {
      if (numChest < table[0].minPetChest) {
        return {
          status: 'out_of_range',
          suggestedSize: `Dưới ${table[0].size}`,
          reason: `Vòng ngực (${numChest}cm) nhỏ hơn size nhỏ nhất (${table[0].minPetChest}cm).`,
          isBorderline: false,
        };
      }
      const last = table[table.length - 1];
      return {
        status: 'out_of_range',
        suggestedSize: `Trên ${last.size}`,
        reason: `Vòng ngực (${numChest}cm) lớn hơn cỡ lớn nhất (${last.maxPetChest}cm).`,
        isBorderline: false,
      };
    }

    let isBorderline = false;
    let borderlineNote = '';
    const currentIndex = table.indexOf(matched);
    if (numChest >= matched.maxPetChest - 1.5 && currentIndex < table.length - 1) {
      isBorderline = true;
      const next = table[currentIndex + 1];
      borderlineNote = `Vòng ngực (${numChest}cm) sát ngưỡng trên. Khuyên chọn ${next.size} nếu thú cưng có lông xù dày.`;
    }

    let backNote = '';
    if (numBack > 0 && matched.maxPetBack) {
      if (numBack > matched.maxPetBack + 3) {
        backNote = ` Chiều dài lưng của bé (${numBack}cm) dài hơn form áo (${matched.productBack}cm), áo sẽ hơi ngắn lưng.`;
      }
    }

    return {
      status: 'success',
      suggestedSize: `Size ${matched.size}`,
      sizeItem: matched,
      isBorderline,
      borderlineNote,
      reason: `Vòng ngực ${numChest}cm nằm chuẩn trong khoảng nới (${matched.minPetChest} - ${matched.maxPetChest}cm) của ${product.name} [Size ${matched.size}]. Chiều dài lưng áo thực tế: ${matched.productBack}cm.${backNote}`,
    };
  }

  return {
    status: 'error',
    message: 'Chưa hỗ trợ tính toán cho loại phụ kiện này.',
  };
}
