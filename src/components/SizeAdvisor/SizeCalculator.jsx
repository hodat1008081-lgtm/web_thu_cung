// src/components/SizeAdvisor/SizeCalculator.jsx
// ============================================================
// Pet Size Advisor – Component chính (Trâm & San San)
// Thay thế toàn bộ file SizeCalculator.jsx cũ bằng wizard mới
// ============================================================

import React, { useState, useCallback } from 'react';
import './SizeAdvisor.css';

import Step1Species    from './steps/Step1Species';
import Step2PetInfo    from './steps/Step2PetInfo';
import Step3Accessory  from './steps/Step3Accessory';
import Step4Measurements from './steps/Step4Measurements';
import Step5Result     from './steps/Step5Result';

import { calculateSize, validatePetInfo, validateMeasurements } from './utils/sizeCalculator';

// Định nghĩa các bước trong wizard
const STEPS = [
  { id: 1, label: 'Loài thú cưng' },
  { id: 2, label: 'Thông tin' },
  { id: 3, label: 'Phụ kiện' },
  { id: 4, label: 'Số đo' },
  { id: 5, label: 'Kết quả' },
];

// State mặc định
const DEFAULT_PET_INFO = {
  name: '',
  breed: '',
  customBreed: '',
  weight: '',
  age: '',
};

const DEFAULT_MEASUREMENTS = {
  neck: '',
  chest: '',
  back: '',
  pawLength: '',
  pawWidth: '',
};

export default function SizeCalculator({ onSelectRecommendedCategory }) {
  // ---- State ----
  const [currentStep, setCurrentStep] = useState(1);
  const [petType, setPetType]         = useState(''); // 'dog' | 'cat'
  const [petInfo, setPetInfo]         = useState(DEFAULT_PET_INFO);
  const [accessoryType, setAccessory] = useState(''); // 'clothes'|'collar'|'harness'|'shoes'|'leash'
  const [measurements, setMeasurements] = useState(DEFAULT_MEASUREMENTS);
  const [leashPurpose, setLeashPurpose] = useState('daily');
  const [errors, setErrors]           = useState({});
  const [result, setResult]           = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // ---- Helpers ----
  const goTo = useCallback((step) => {
    setErrors({});
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handlePetInfoChange = useCallback((field, value) => {
    setPetInfo((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const handleMeasurementChange = useCallback((field, value) => {
    setMeasurements((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  // ---- Validation & Navigation ----
  const handleNext = () => {
    if (currentStep === 1) {
      if (!petType) {
        setErrors({ petType: 'Vui lòng chọn loài thú cưng.' });
        return;
      }
      goTo(2);
    } else if (currentStep === 2) {
      const errs = validatePetInfo({ breed: petInfo.breed === 'Khác (Nhập tên giống)' ? petInfo.customBreed : petInfo.breed, weight: petInfo.weight });
      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        return;
      }
      goTo(3);
    } else if (currentStep === 3) {
      if (!accessoryType) {
        setErrors({ accessoryType: 'Vui lòng chọn loại phụ kiện.' });
        return;
      }
      goTo(4);
    } else if (currentStep === 4) {
      handleCalculate();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) goTo(currentStep - 1);
  };

  // ---- Tính toán ----
  const handleCalculate = () => {
    // Validate số đo (nếu không phải dây dắt)
    if (accessoryType !== 'leash') {
      const errs = validateMeasurements({ category: accessoryType, measurements, species: petType });
      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        return;
      }
    }

    setIsCalculating(true);
    setErrors({});

    // Giả lập delay nhỏ để UX tốt hơn
    setTimeout(() => {
      const effectiveBreed =
        petInfo.breed === 'Khác (Nhập tên giống)' && petInfo.customBreed
          ? petInfo.customBreed
          : petInfo.breed;

      const res = calculateSize({
        species: petType,
        breed: effectiveBreed,
        weight: parseFloat(petInfo.weight) || 0,
        category: accessoryType,
        measurements,
        leashPurpose,
      });

      setResult(res);
      setIsCalculating(false);
      goTo(5);
    }, 800);
  };

  // ---- Reset hoàn toàn ----
  const handleRestart = () => {
    setPetType('');
    setPetInfo(DEFAULT_PET_INFO);
    setAccessory('');
    setMeasurements(DEFAULT_MEASUREMENTS);
    setLeashPurpose('daily');
    setErrors({});
    setResult(null);
    setIsCalculating(false);
    goTo(1);
  };

  // ---- Xem sản phẩm phụ kiện ----
  const handleViewProducts = () => {
    if (onSelectRecommendedCategory) {
      onSelectRecommendedCategory('accessory');
    }
  };

  // ---- Render ----
  const isStep4Valid =
    accessoryType === 'leash'
      ? !!leashPurpose
      : Object.entries(measurements).some(([k, v]) => v && v !== '');

  const nextDisabled =
    (currentStep === 1 && !petType) ||
    (currentStep === 3 && !accessoryType) ||
    (currentStep === 4 && accessoryType !== 'leash' && !isStep4Valid);

  return (
    <div className="sa-wrapper">
      {/* ---- Header ---- */}
      <div className="sa-header">
        <div className="sa-tagline">
          <span>📏</span> Tư Vấn Chính Xác
        </div>
        <h1 className="sa-title">
          Pet Size <span>Advisor</span>
        </h1>
        <p className="sa-subtitle">
          Tìm kích thước phụ kiện hoàn hảo cho thú cưng của bạn — dựa trên số đo thực tế, không chỉ cân nặng.
        </p>
      </div>

      {/* ---- Progress Steps ---- */}
      {currentStep < 5 && (
        <div className="sa-progress" role="progressbar" aria-valuenow={currentStep} aria-valuemax={5}>
          {STEPS.map((step, idx) => {
            const isActive    = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            return (
              <div
                key={step.id}
                className={`sa-step${isActive ? ' active' : ''}${isCompleted ? ' completed' : ''}`}
              >
                <div className="sa-step-circle">
                  {isCompleted ? '✓' : step.id}
                </div>
                <div className="sa-step-label">{step.label}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* ---- Main Card (Loading) ---- */}
      {isCalculating && (
        <div className="sa-card">
          <div className="sa-loading">
            <div className="sa-spinner" />
            <div className="sa-loading-text">🐾 Đang phân tích số đo và tìm size phù hợp...</div>
          </div>
        </div>
      )}

      {/* ---- Main Card (Steps) ---- */}
      {!isCalculating && (
        <div className="sa-card">
          {/* BƯỚC 1 */}
          {currentStep === 1 && (
            <>
              <Step1Species petType={petType} onSelect={(t) => { setPetType(t); setErrors({}); }} />
              {errors.petType && <div className="sa-error-msg" style={{ marginTop: '12px' }}><span>⚠️</span> {errors.petType}</div>}
            </>
          )}

          {/* BƯỚC 2 */}
          {currentStep === 2 && (
            <Step2PetInfo
              petType={petType}
              petInfo={petInfo}
              onChange={handlePetInfoChange}
              errors={errors}
            />
          )}

          {/* BƯỚC 3 */}
          {currentStep === 3 && (
            <>
              <Step3Accessory
                petType={petType}
                accessoryType={accessoryType}
                onSelect={(t) => { setAccessory(t); setErrors({}); }}
              />
              {errors.accessoryType && (
                <div className="sa-error-msg" style={{ marginTop: '12px' }}>
                  <span>⚠️</span> {errors.accessoryType}
                </div>
              )}
            </>
          )}

          {/* BƯỚC 4 */}
          {currentStep === 4 && (
            <Step4Measurements
              accessoryType={accessoryType}
              petType={petType}
              measurements={measurements}
              onChange={handleMeasurementChange}
              errors={errors}
              leashPurpose={leashPurpose}
              onLeashPurposeChange={(p) => setLeashPurpose(p)}
            />
          )}

          {/* BƯỚC 5: KẾT QUẢ */}
          {currentStep === 5 && (
            <Step5Result
              result={result}
              petInfo={petInfo}
              petType={petType}
              accessoryType={accessoryType}
              measurements={measurements}
              onRestart={handleRestart}
              onEdit={(targetStep) => goTo(targetStep || 2)}
              onViewProducts={onSelectRecommendedCategory ? handleViewProducts : null}
            />
          )}

          {/* ---- Navigation ---- */}
          {currentStep < 5 && (
            <div className="sa-nav-row">
              {currentStep > 1 ? (
                <button type="button" className="sa-btn-back" onClick={handleBack}>
                  <span>←</span> Quay lại
                </button>
              ) : (
                <div />
              )}

              {currentStep < 4 ? (
                <button
                  type="button"
                  className="sa-btn-next"
                  onClick={handleNext}
                  disabled={nextDisabled}
                >
                  Tiếp tục <span>→</span>
                </button>
              ) : (
                <button
                  type="button"
                  className="sa-btn-submit"
                  onClick={handleNext}
                  disabled={accessoryType !== 'leash' && !isStep4Valid}
                >
                  <span>🔍</span> Tư vấn kích thước ngay
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* ---- Nút bắt đầu lại ở kết quả ---- */}
      {currentStep === 5 && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button type="button" className="sa-btn-restart" onClick={handleRestart} style={{ margin: '0 auto' }}>
            <span>🔄</span> Bắt đầu tư vấn lại
          </button>
        </div>
      )}
    </div>
  );
}
