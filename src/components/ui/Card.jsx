const Card = ({ title, children, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 mb-4 ${className}`}
    >
      {title && (
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
            {title}
          </h3>
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
};

export default Card;
