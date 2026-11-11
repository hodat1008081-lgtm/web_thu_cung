// src/components/SizeAdvisor/utils/sizeCalculator.js
// ============================================================
// THUẬT TOÁN TƯ VẤN KÍCH THƯỚC – Rule-based, không dùng API AI
// ============================================================

import { SIZE_CHARTS } from '../data/sizeCharts';

/**
 * Tìm bảng size phù hợp theo loài và danh mục phụ kiện
 */
function getSizeChart(species, category) {
  const key = `${category}_${species}`;
  return SIZE_CHARTS[key] || null;
}

/**
 * Kiểm tra một số đo có nằm trong khoảng [min, max] không
 */
function inRange(value, min, max) {
  return value >= min && value <= max;
}

/**
 * Tính "độ lệch" khi số đo vượt ra ngoài range
 * Trả về: { fits: boolean, low: boolean, high: boolean, delta: number }
 */
function checkMeasurement(value, min, max) {
  if (inRange(value, min, max)) return { fits: true, low: false, high: false, delta: 0 };
  if (value < min) return { fits: false, low: true, high: false, delta: min - value };
  return { fits: false, low: false, high: true, delta: value - max };
}

/**
 * Hàm chính: tính toán và trả về kết quả tư vấn size
 *
 * @param {Object} params
 * @param {string} params.species         - 'dog' | 'cat'
 * @param {string} params.breed           - Giống thú cưng
 * @param {number} params.weight          - Cân nặng (kg)
 * @param {string} params.category        - 'clothes' | 'collar' | 'harness' | 'shoes' | 'leash'
 * @param {Object} params.measurements    - { neck, chest, back, pawLength, pawWidth } (cm)
 * @param {string} params.leashPurpose    - Mục đích dùng dây dắt (nếu category='leash')
 *
 * @returns {Object} result
 */
export function calculateSize({ species, breed, weight, category, measurements = {}, leashPurpose }) {
  // --- Trường hợp dây dắt: không cần số đo cơ thể ---
  if (category === 'leash') {
    return calculateLeashAdvice({ leashPurpose, species, weight });
  }

  const chart = getSizeChart(species, category);
  if (!chart) {
    return {
      status: 'error',
      message: 'Chưa có dữ liệu bảng size cho loại phụ kiện này. Vui lòng liên hệ hỗ trợ.',
    };
  }

  // Xác định các số đo cần kiểm tra dựa trên category
  const neededMeasurements = chart.measurements || [];

  // Kiểm tra dữ liệu thiếu
  const missingFields = [];
  for (const field of neededMeasurements) {
    const val = measurements[field];
    if (!val || isNaN(parseFloat(val)) || parseFloat(val) <= 0) {
      missingFields.push(field);
    }
  }

  if (missingFields.length > 0) {
    return {
      status: 'missing_data',
      missingFields,
      message: 'Vui lòng nhập đầy đủ các số đo cần thiết để hệ thống tư vấn chính xác.',
    };
  }

  // Chuyển measurements sang số
  const m = {};
  for (const key of Object.keys(measurements)) {
    m[key] = parseFloat(measurements[key]);
  }

  // --- Kiểm tra từng size ---
  const sizeResults = chart.sizes.map((sizeEntry) => {
    const checks = {};
    let totalFit = 0;
    let totalChecked = 0;

    if (neededMeasurements.includes('neck') && sizeEntry.neckMin !== undefined) {
      checks.neck = checkMeasurement(m.neck, sizeEntry.neckMin, sizeEntry.neckMax);
      totalChecked++;
      if (checks.neck.fits) totalFit++;
    }
    if (neededMeasurements.includes('chest') && sizeEntry.chestMin !== undefined) {
      checks.chest = checkMeasurement(m.chest, sizeEntry.chestMin, sizeEntry.chestMax);
      totalChecked++;
      if (checks.chest.fits) totalFit++;
    }
    if (neededMeasurements.includes('back') && sizeEntry.backMin !== undefined) {
      checks.back = checkMeasurement(m.back, sizeEntry.backMin, sizeEntry.backMax);
      totalChecked++;
      if (checks.back.fits) totalFit++;
    }
    if (neededMeasurements.includes('pawLength') && sizeEntry.pawLengthMin !== undefined) {
      checks.pawLength = checkMeasurement(m.pawLength, sizeEntry.pawLengthMin, sizeEntry.pawLengthMax);
      totalChecked++;
      if (checks.pawLength.fits) totalFit++;
    }
    if (neededMeasurements.includes('pawWidth') && sizeEntry.pawWidthMin !== undefined) {
      checks.pawWidth = checkMeasurement(m.pawWidth, sizeEntry.pawWidthMin, sizeEntry.pawWidthMax);
      totalChecked++;
      if (checks.pawWidth.fits) totalFit++;
    }

    const fitRatio = totalChecked > 0 ? totalFit / totalChecked : 0;

    return {
      size: sizeEntry.size,
      sizeEntry,
      checks,
      totalFit,
      totalChecked,
      fitRatio,
      perfectFit: totalFit === totalChecked && totalChecked > 0,
    };
  });

  // --- Tìm size phù hợp nhất ---
  const perfectMatches = sizeResults.filter((r) => r.perfectFit);

  if (perfectMatches.length === 1) {
    return buildSuccessResult({ match: perfectMatches[0], chart, measurements: m, weight, confidence: 'high' });
  }

  if (perfectMatches.length > 1) {
    // Nhiều size đều phù hợp – chọn size nhỏ hơn (vừa vặn hơn)
    return buildSuccessResult({ match: perfectMatches[0], chart, measurements: m, weight, confidence: 'high', note: 'Số đo của bé phù hợp với nhiều size. Chúng tôi đề xuất size nhỏ hơn để vừa vặn hơn.' });
  }

  // Không có size nào perfect – tìm size "gần nhất" (fitRatio cao nhất)
  const sortedByFit = [...sizeResults].sort((a, b) => {
    if (b.fitRatio !== a.fitRatio) return b.fitRatio - a.fitRatio;
    // Nếu cùng fitRatio, ưu tiên size nào số đo "vượt ra ngoài ít hơn"
    const totalDeltaA = Object.values(a.checks).reduce((acc, c) => acc + c.delta, 0);
    const totalDeltaB = Object.values(b.checks).reduce((acc, c) => acc + c.delta, 0);
    return totalDeltaA - totalDeltaB;
  });

  const bestMatch = sortedByFit[0];

  if (bestMatch.fitRatio >= 0.5) {
    return buildSuccessResult({
      match: bestMatch,
      chart,
      measurements: m,
      weight,
      confidence: 'medium',
      note: 'Một số số đo của bé nằm ngoài khoảng size tiêu chuẩn. Hãy kiểm tra chi tiết bên dưới và cân nhắc thêm.',
    });
  }

  // Không tìm được size phù hợp
  return {
    status: 'no_match',
    chart,
    sizeResults,
    measurements: m,
    message: 'Rất tiếc! Hiện tại chúng tôi chưa tìm thấy kích thước phù hợp với thú cưng của bạn. Bạn có thể tham khảo các sản phẩm khác hoặc liên hệ để được hỗ trợ.',
  };
}

/**
 * Tạo object kết quả thành công
 */
function buildSuccessResult({ match, chart, measurements, weight, confidence, note }) {
  // Tạo giải thích chi tiết từng số đo
  const measurementDetails = [];

  const fieldLabels = {
    neck: { label: 'Vòng cổ', min: 'neckMin', max: 'neckMax', unit: 'cm' },
    chest: { label: 'Vòng ngực', min: 'chestMin', max: 'chestMax', unit: 'cm' },
    back: { label: 'Chiều dài lưng', min: 'backMin', max: 'backMax', unit: 'cm' },
    pawLength: { label: 'Chiều dài bàn chân', min: 'pawLengthMin', max: 'pawLengthMax', unit: 'cm' },
    pawWidth: { label: 'Chiều rộng bàn chân', min: 'pawWidthMin', max: 'pawWidthMax', unit: 'cm' },
  };

  for (const [key, check] of Object.entries(match.checks)) {
    const info = fieldLabels[key];
    if (!info) continue;
    const rangeMin = match.sizeEntry[info.min];
    const rangeMax = match.sizeEntry[info.max];
    measurementDetails.push({
      key,
      label: info.label,
      value: measurements[key],
      rangeMin,
      rangeMax,
      fits: check.fits,
      low: check.low,
      high: check.high,
      delta: check.delta,
      unit: info.unit,
    });
  }

  // Tạo giải thích text
  let explanation = '';
  if (confidence === 'high') {
    explanation = `Chúng tôi đề xuất size ${match.size} dựa trên số đo thực tế của bé. Tất cả các chỉ số đều nằm trong khoảng phù hợp.`;
  } else {
    const problemFields = measurementDetails.filter((d) => !d.fits);
    if (problemFields.length > 0) {
      const problems = problemFields.map((d) => {
        if (d.high) return `${d.label} (${d.value}${d.unit}) hơi lớn so với khoảng size ${match.size} (${d.rangeMin}–${d.rangeMax}${d.unit})`;
        return `${d.label} (${d.value}${d.unit}) hơi nhỏ so với khoảng size ${match.size} (${d.rangeMin}–${d.rangeMax}${d.unit})`;
      });
      explanation = `Size ${match.size} gần nhất với số đo của bé, tuy nhiên: ${problems.join('; ')}.`;
    }
  }

  return {
    status: 'success',
    recommendedSize: match.size,
    confidence, // 'high' | 'medium'
    chart,
    measurementDetails,
    explanation,
    note: note || chart.note,
    isDemo: chart.isDemo,
  };
}

/**
 * Tư vấn dây dắt dựa trên mục đích sử dụng
 */
function calculateLeashAdvice({ leashPurpose, species, weight }) {
  const leashData = SIZE_CHARTS['leash_options'];
  const recommended = leashData.options.find((o) => o.purpose === leashPurpose) || leashData.options[1];

  let extraTip = '';
  if (weight > 20) {
    extraTip = 'Với bé lớn trên 20kg, nên chọn dây có vật liệu chắc chắn (da hoặc nylon dày) và tay cầm bọc đệm để tránh đau tay.';
  } else if (weight < 3) {
    extraTip = 'Với bé nhỏ dưới 3kg, có thể dùng dây dắt kết hợp yếm thay vì chỉ móc vào vòng cổ để bảo vệ cổ bé.';
  }

  return {
    status: 'leash',
    recommended,
    allOptions: leashData.options,
    extraTip,
    note: leashData.note,
    isDemo: leashData.isDemo,
    explanation: `Dựa trên mục đích sử dụng của bạn, chúng tôi đề xuất: ${recommended.label}. ${recommended.description}`,
  };
}

/**
 * Validate thông tin nhập vào bước 2 (thông tin thú cưng)
 */
export function validatePetInfo({ breed, weight }) {
  const errors = {};
  if (!breed || breed.trim() === '') {
    errors.breed = 'Vui lòng chọn hoặc nhập giống thú cưng.';
  }
  const w = parseFloat(weight);
  if (!weight || isNaN(w)) {
    errors.weight = 'Vui lòng nhập cân nặng.';
  } else if (w <= 0) {
    errors.weight = 'Cân nặng phải lớn hơn 0.';
  } else if (w > 100) {
    errors.weight = 'Cân nặng không hợp lệ (tối đa 100 kg).';
  }
  return errors;
}

/**
 * Validate số đo cơ thể
 */
export function validateMeasurements({ category, measurements, species }) {
  const errors = {};
  const chart = getSizeChart(species, category);
  if (!chart) return errors;

  const neededMeasurements = chart.measurements || [];

  const fieldLabels = {
    neck: 'Vòng cổ',
    chest: 'Vòng ngực',
    back: 'Chiều dài lưng',
    pawLength: 'Chiều dài bàn chân',
    pawWidth: 'Chiều rộng bàn chân',
  };

  for (const field of neededMeasurements) {
    const val = measurements[field];
    if (!val || val === '') {
      errors[field] = `Vui lòng nhập ${fieldLabels[field]}.`;
    } else {
      const num = parseFloat(val);
      if (isNaN(num) || num <= 0) {
        errors[field] = `${fieldLabels[field]} không hợp lệ. Vui lòng nhập số dương.`;
      } else if (num > 200) {
        errors[field] = `${fieldLabels[field]} quá lớn. Vui lòng kiểm tra lại.`;
      }
    }
  }

  return errors;
}
