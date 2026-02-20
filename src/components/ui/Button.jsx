const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  type = "button",
  icon = null,
}) => {
  const variants = {
    primary: "bg-teal-500 text-white hover:bg-teal-600",
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
    success: "bg-green-600 text-white hover:bg-green-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    warning: "bg-orange-500 text-white hover:bg-orange-600",
    purple: "bg-purple-600 text-white hover:bg-purple-700",
    outline: "border border-teal-500 text-teal-500 hover:bg-teal-50",
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        rounded-md font-medium transition-colors flex items-center justify-center gap-2
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
