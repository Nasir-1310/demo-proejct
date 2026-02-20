import { useState } from "react";

const Input = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  error = false,
  className = "",
  disabled = false,
  icon = null,
}) => {
  const [touched, setTouched] = useState(false);
  const showError = required && touched && !value;

  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label className="text-xs font-medium text-gray-600 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-3 py-2 text-sm border rounded-md outline-none transition-colors
            ${
              showError || error
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-teal-500"
            }
            ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
          `}
        />
        {icon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
