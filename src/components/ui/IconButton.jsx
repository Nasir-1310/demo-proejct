const IconButton = ({
  onClick,
  variant = "primary",
  icon,
  className = "",
  size = "md",
}) => {
  const variants = {
    primary: "bg-teal-500 text-white hover:bg-teal-600",
    success: "bg-green-600 text-white hover:bg-green-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    purple: "bg-purple-600 text-white hover:bg-purple-700",
    gray: "bg-gray-500 text-white hover:bg-gray-600",
  };

  const sizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${variants[variant]} ${sizes[size]} rounded flex items-center justify-center transition-colors ${className}`}
    >
      {icon}
    </button>
  );
};

export default IconButton;
