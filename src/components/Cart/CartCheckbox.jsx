// src/components/Cart/CartCheckbox.jsx
// Checkbox tùy chỉnh bo góc nhẹ với màu cam khi chọn và hiệu ứng chuyển cảnh mượt mà

/**
 * Rounded checkbox styled with Tailwind CSS that shows an orange fill,
 * crisp white checkmark, and smooth transition when checked.
 */
export default function CartCheckbox({
  checked = false,
  onChange,
  ariaLabel,
  title,
}) {
  return (
    <label
      className="cart-checkbox-label relative flex items-center justify-center shrink-0 cursor-pointer select-none"
      title={title}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange && onChange(e.target.checked)}
        aria-label={ariaLabel}
        className="sr-only peer"
      />
      <span
        className={`cart-checkbox-box w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-orange-300 ${
          checked
            ? 'cart-checkbox-checked bg-orange-500 border-orange-500 shadow-sm'
            : 'bg-white border-slate-300 hover:border-orange-400'
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={`cart-checkbox-icon w-3.5 h-3.5 text-white transition-all duration-200 ${
            checked ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
    </label>
  );
}
